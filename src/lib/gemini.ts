import { GoogleGenerativeAI } from '@google/generative-ai';
import { PromptTemplate } from './types';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export class GeminiService {
  private model = genAI.getGenerativeModel({ model: 'gemini-1.5-pro' });

  async generateCaption(
    brief: string,
    target: string,
    persona?: PromptTemplate,
    options?: {
      tone?: number;
      emoji?: number;
      cta?: number;
      language?: string;
    }
  ): Promise<{
    text: string;
    hashtags: string[];
    metadata: {
      readGrade: number;
      sentiment: string;
      cost: { input: number; output: number };
    };
  }> {
    const systemPrompt = this.buildSystemPrompt(persona, options);
    const userPrompt = this.buildUserPrompt(brief, target);

    const prompt = `${systemPrompt}\n\n${userPrompt}`;

    try {
      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      const text = response.text().trim();

      // Parse the response to extract caption and hashtags
      const { caption, hashtags } = this.parseCaptionResponse(text);

      return {
        text: caption,
        hashtags,
        metadata: {
          readGrade: this.calculateReadability(caption),
          sentiment: this.analyzeSentiment(caption),
          cost: {
            input: prompt.length,
            output: text.length,
          },
        },
      };
    } catch (error) {
      console.error('Gemini generation error:', error);
      throw new Error('Failed to generate caption');
    }
  }

  async generateVariants(
    brief: string,
    target: string,
    count: number = 3,
    persona?: PromptTemplate,
    options?: any
  ): Promise<Array<{
    id: string;
    text: string;
    score: number;
    reasons: string[];
    safety: { ok: boolean; reasons: string[] };
    cost: { input: number; output: number };
  }>> {
    const variants = await Promise.all(
      Array.from({ length: count }, async (_, i) => {
        const result = await this.generateCaption(brief, target, persona, {
          ...options,
          variant: i + 1,
        });

        return {
          id: `variant_${Date.now()}_${i}`,
          text: result.text,
          score: this.scoreVariant(result.text, brief, target),
          reasons: this.getScoreReasons(result.text, brief, target),
          safety: this.checkSafety(result.text),
          cost: result.metadata.cost,
        };
      })
    );

    return variants;
  }

  private buildSystemPrompt(persona?: PromptTemplate, options?: any): string {
    let system = "You are a brand-safe social media copywriter for D2C brands.\n";
    
    if (persona) {
      system += `\nPersona: ${persona.name}\n`;
      system += `Voice traits: ${persona.voiceTraits?.join(', ')}\n`;
    }

    if (options?.tone !== undefined) {
      const toneLevel = options.tone < 0.3 ? 'formal' : options.tone < 0.7 ? 'conversational' : 'playful';
      system += `\nTone: ${toneLevel}\n`;
    }

    if (options?.emoji !== undefined) {
      const emojiLevel = options.emoji < 1 ? 'no emojis' : options.emoji < 2 ? 'minimal emojis' : 'moderate emojis';
      system += `\nEmoji usage: ${emojiLevel}\n`;
    }

    system += "\nGuidelines:\n";
    system += "- Write engaging, authentic content\n";
    system += "- Avoid spammy hashtags and prohibited claims\n";
    system += "- Keep captions under 180 characters\n";
    system += "- Include 3-5 relevant hashtags\n";
    system += "- Make content brand-safe and compliant\n";

    return system;
  }

  private buildUserPrompt(brief: string, target: string): string {
    return `Brand brief: "${brief}"\nTarget audience: "${target}"\n\nWrite an Instagram caption with 3-5 hashtags. Return only the caption text.`;
  }

  private parseCaptionResponse(text: string): { caption: string; hashtags: string[] } {
    // Extract hashtags from the text
    const hashtagRegex = /#\w+/g;
    const hashtags = text.match(hashtagRegex) || [];
    
    // Remove hashtags from the main caption
    const caption = text.replace(hashtagRegex, '').trim();
    
    return { caption, hashtags };
  }

  private calculateReadability(text: string): number {
    // Simple readability score (0-100, higher is easier to read)
    const words = text.split(' ').length;
    const sentences = text.split(/[.!?]+/).length;
    const avgWordsPerSentence = words / sentences;
    
    // Simple formula: lower average words per sentence = higher readability
    return Math.max(0, Math.min(100, 100 - (avgWordsPerSentence - 10) * 5));
  }

  private analyzeSentiment(text: string): string {
    // Simple sentiment analysis
    const positiveWords = ['amazing', 'love', 'great', 'awesome', 'fantastic', 'wonderful'];
    const negativeWords = ['hate', 'terrible', 'awful', 'bad', 'horrible', 'disappointing'];
    
    const lowerText = text.toLowerCase();
    const positiveCount = positiveWords.filter(word => lowerText.includes(word)).length;
    const negativeCount = negativeWords.filter(word => lowerText.includes(word)).length;
    
    if (positiveCount > negativeCount) return 'positive';
    if (negativeCount > positiveCount) return 'negative';
    return 'neutral';
  }

  private scoreVariant(text: string, brief: string, target: string): number {
    let score = 50; // Base score
    
    // Length scoring (prefer 120-180 chars)
    if (text.length >= 120 && text.length <= 180) score += 20;
    else if (text.length < 120) score -= 10;
    else score -= 15;
    
    // Hashtag scoring (prefer 3-5 hashtags)
    const hashtagCount = (text.match(/#\w+/g) || []).length;
    if (hashtagCount >= 3 && hashtagCount <= 5) score += 15;
    else if (hashtagCount < 3) score -= 10;
    else score -= 5;
    
    // Brand relevance (simple keyword matching)
    const briefWords = brief.toLowerCase().split(' ');
    const textWords = text.toLowerCase().split(' ');
    const matchingWords = briefWords.filter(word => textWords.includes(word)).length;
    score += matchingWords * 5;
    
    return Math.max(0, Math.min(100, score));
  }

  private getScoreReasons(text: string, brief: string, target: string): string[] {
    const reasons = [];
    
    if (text.length >= 120 && text.length <= 180) {
      reasons.push('Optimal length');
    }
    
    const hashtagCount = (text.match(/#\w+/g) || []).length;
    if (hashtagCount >= 3 && hashtagCount <= 5) {
      reasons.push('Good hashtag count');
    }
    
    const briefWords = brief.toLowerCase().split(' ');
    const textWords = text.toLowerCase().split(' ');
    const matchingWords = briefWords.filter(word => textWords.includes(word)).length;
    if (matchingWords > 0) {
      reasons.push('Brand relevant');
    }
    
    return reasons;
  }

  private checkSafety(text: string): { ok: boolean; reasons: string[] } {
    const reasons = [];
    const lowerText = text.toLowerCase();
    
    // Simple safety checks
    const bannedWords = ['spam', 'scam', 'fake', 'clickbait'];
    const hasBannedWords = bannedWords.some(word => lowerText.includes(word));
    
    if (hasBannedWords) {
      reasons.push('Contains potentially problematic words');
    }
    
    // Check for excessive caps
    const capsRatio = (text.match(/[A-Z]/g) || []).length / text.length;
    if (capsRatio > 0.3) {
      reasons.push('Excessive capitalization');
    }
    
    return {
      ok: reasons.length === 0,
      reasons,
    };
  }
}

export const geminiService = new GeminiService();
