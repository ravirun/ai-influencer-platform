'use client';

import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Plus, 
  Bot, 
  Settings, 
  Brain, 
  MessageSquare, 
  Target,
  Edit,
  Trash2,
  Copy,
  Play,
  Pause,
  CheckCircle,
  AlertCircle,
  Sparkles,
  Users,
  TrendingUp
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { PersonaDoc } from '@/lib/types';
import { Timestamp } from 'firebase/firestore';

interface PersonaStudioProps {
  className?: string;
}

export function PersonaStudio({ className }: PersonaStudioProps) {
  const [personas, setPersonas] = useState<PersonaDoc[]>([]);
  const [selectedPersona, setSelectedPersona] = useState<PersonaDoc | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  // Mock data for demonstration
  useEffect(() => {
    const mockPersonas: PersonaDoc[] = [
      {
        name: 'Tech Enthusiast Alex',
        ownerType: 'system',
        voiceTraits: ['tech-savvy', 'enthusiastic', 'informative', 'trendy'],
        examplePosts: [
          'Just got my hands on the latest gadget! 🚀 This thing is absolutely mind-blowing...',
          'Tech tip of the day: Did you know you can boost your productivity by 40% with this simple trick?',
          'The future is here, and it\'s more exciting than we imagined! #TechInnovation'
        ],
        embeddingRef: 'embedding_1',
        createdBy: 'system',
        createdAt: Timestamp.fromDate(new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)),
        sliders: {
          tone: 0.7, // playful
          emoji: 2.2, // moderate-heavy
          cta: 2.5, // strong
          length: 0.6, // medium
          creativity: 0.8 // high
        }
      },
      {
        name: 'Fashion Forward Emma',
        ownerType: 'brand',
        voiceTraits: ['stylish', 'trendy', 'confident', 'aspirational'],
        examplePosts: [
          'OOTD featuring our latest collection! ✨ This look is giving me all the confidence I need today.',
          'Style tip: Mix and match patterns like a pro! Here\'s how to nail the trend...',
          'Sustainable fashion is the future, and I\'m here for it! 🌱 #SustainableStyle'
        ],
        embeddingRef: 'embedding_2',
        createdBy: 'user_1',
        createdAt: Timestamp.fromDate(new Date(Date.now() - 15 * 24 * 60 * 60 * 1000)),
        sliders: {
          tone: 0.8, // very playful
          emoji: 2.8, // heavy
          cta: 2.0, // clear
          length: 0.7, // medium-long
          creativity: 0.9 // very high
        }
      },
      {
        name: 'Wellness Guru Sam',
        ownerType: 'creator',
        voiceTraits: ['calm', 'motivational', 'authentic', 'supportive'],
        examplePosts: [
          'Morning meditation complete! 🧘‍♀️ Starting the day with intention and gratitude.',
          'Remember: self-care isn\'t selfish, it\'s essential. Take time for yourself today.',
          'Small steps lead to big changes. What\'s one thing you\'ll do for your wellness today?'
        ],
        embeddingRef: 'embedding_3',
        createdBy: 'creator_1',
        createdAt: Timestamp.fromDate(new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)),
        sliders: {
          tone: 0.4, // more formal
          emoji: 1.5, // moderate
          cta: 1.8, // subtle-strong
          length: 0.5, // medium
          creativity: 0.6 // moderate
        }
      }
    ];
    setPersonas(mockPersonas);
  }, []);

  const handleCreatePersona = () => {
    setIsCreating(true);
    // TODO: Open persona creation modal
  };

  const handleEditPersona = (persona: PersonaDoc) => {
    setSelectedPersona(persona);
    setActiveTab('edit');
  };

  const handleDeletePersona = (personaName: string) => {
    setPersonas(prev => prev.filter(p => p.name !== personaName));
    // TODO: Implement actual deletion
  };

  const handleDuplicatePersona = (persona: PersonaDoc) => {
    const duplicatedPersona = {
      ...persona,
      name: `${persona.name} (Copy)`,
      createdAt: Timestamp.fromDate(new Date())
    };
    setPersonas(prev => [...prev, duplicatedPersona]);
  };

  const getOwnerTypeColor = (ownerType: string) => {
    switch (ownerType) {
      case 'system': return 'bg-blue-100 text-blue-800';
      case 'brand': return 'bg-green-100 text-green-800';
      case 'creator': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className={cn('space-y-6', className)}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Persona Studio</h1>
          <p className="text-gray-600">Create and manage AI influencer personas</p>
        </div>
        <Button onClick={handleCreatePersona} className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          New Persona
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Bot className="h-4 w-4 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Personas</p>
              <p className="text-2xl font-bold text-gray-900">{personas.length}</p>
            </div>
          </div>
        </Card>
        
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-100 rounded-lg">
              <Users className="h-4 w-4 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Brand Personas</p>
              <p className="text-2xl font-bold text-gray-900">
                {personas.filter(p => p.ownerType === 'brand').length}
              </p>
            </div>
          </div>
        </Card>
        
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Brain className="h-4 w-4 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Active Personas</p>
              <p className="text-2xl font-bold text-gray-900">{personas.length}</p>
            </div>
          </div>
        </Card>
        
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-orange-100 rounded-lg">
              <TrendingUp className="h-4 w-4 text-orange-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Avg. Performance</p>
              <p className="text-2xl font-bold text-gray-900">+18%</p>
            </div>
          </div>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="create">Create</TabsTrigger>
          <TabsTrigger value="edit">Edit</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          {/* Personas Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {personas.map((persona) => (
              <Card key={persona.name} className="p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <Bot className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{persona.name}</h3>
                      <Badge className={cn('text-xs', getOwnerTypeColor(persona.ownerType))}>
                        {persona.ownerType}
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleEditPersona(persona)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDuplicatePersona(persona)}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDeletePersona(persona.name)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Voice Traits */}
                <div className="mb-4">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Voice Traits</h4>
                  <div className="flex flex-wrap gap-1">
                    {persona.voiceTraits.map((trait) => (
                      <Badge key={trait} variant="outline" className="text-xs">
                        {trait}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Tone Sliders */}
                {persona.sliders && (
                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Tone Settings</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs">
                        <span>Formal</span>
                        <span>Playful</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full" 
                          style={{ width: `${persona.sliders.tone * 100}%` }}
                        />
                      </div>
                      
                      <div className="flex justify-between text-xs">
                        <span>No Emojis</span>
                        <span>Heavy Emojis</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-green-600 h-2 rounded-full" 
                          style={{ width: `${(persona.sliders.emoji / 3) * 100}%` }}
                        />
                      </div>
                      
                      <div className="flex justify-between text-xs">
                        <span>Subtle CTA</span>
                        <span>Strong CTA</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-purple-600 h-2 rounded-full" 
                          style={{ width: `${(persona.sliders.cta / 3) * 100}%` }}
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Example Post */}
                {persona.examplePosts && persona.examplePosts.length > 0 && (
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Example Post</h4>
                    <p className="text-sm text-gray-600 italic">
                      &quot;{persona.examplePosts[0].substring(0, 100)}...&quot;
                    </p>
                  </div>
                )}

                {/* Actions */}
                <div className="flex gap-2 mt-4">
                  <Button size="sm" className="flex-1">
                    <Play className="h-3 w-3 mr-1" />
                    Use
                  </Button>
                  <Button size="sm" variant="outline" className="flex-1">
                    <Settings className="h-3 w-3 mr-1" />
                    Configure
                  </Button>
                </div>
              </Card>
            ))}
          </div>

          {personas.length === 0 && (
            <Card className="p-8 text-center">
              <Bot className="h-12 w-12 mx-auto mb-4 text-gray-400" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No personas created yet
              </h3>
              <p className="text-gray-600 mb-4">
                Create your first AI persona to get started with automated content generation
              </p>
              <Button onClick={handleCreatePersona}>
                <Plus className="h-4 w-4 mr-2" />
                Create Persona
              </Button>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="create" className="space-y-4">
          <Card className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="h-5 w-5 text-blue-600" />
              <h3 className="text-lg font-medium text-gray-900">Create New Persona</h3>
            </div>
            <p className="text-gray-600 mb-6">
              Build an AI persona that matches your brand voice and target audience
            </p>
            
            <div className="space-y-6">
              <div>
                <Label htmlFor="personaName">Persona Name</Label>
                <Input
                  id="personaName"
                  placeholder="e.g., Tech Enthusiast Alex"
                  className="mt-1"
                />
              </div>
              
              <div>
                <Label htmlFor="personaDescription">Description</Label>
                <Textarea
                  id="personaDescription"
                  placeholder="Describe the persona's personality, interests, and communication style..."
                  rows={4}
                  className="mt-1"
                />
              </div>
              
              <div>
                <Label htmlFor="voiceTraits">Voice Traits</Label>
                <Input
                  id="voiceTraits"
                  placeholder="e.g., enthusiastic, informative, trendy (comma-separated)"
                  className="mt-1"
                />
              </div>
              
              <div>
                <Label htmlFor="examplePosts">Example Posts</Label>
                <Textarea
                  id="examplePosts"
                  placeholder="Provide 2-3 example posts that represent this persona's voice..."
                  rows={6}
                  className="mt-1"
                />
              </div>
              
              <div className="flex gap-3">
                <Button>Create Persona</Button>
                <Button variant="outline">Save as Draft</Button>
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="edit" className="space-y-4">
          {selectedPersona ? (
            <Card className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <Edit className="h-5 w-5 text-blue-600" />
                <h3 className="text-lg font-medium text-gray-900">Edit Persona</h3>
              </div>
              <p className="text-gray-600 mb-6">
                Modify the settings and voice traits for &quot;{selectedPersona.name}&quot;
              </p>
              
              <div className="space-y-6">
                <div>
                  <Label htmlFor="editName">Persona Name</Label>
                  <Input
                    id="editName"
                    defaultValue={selectedPersona.name}
                    className="mt-1"
                  />
                </div>
                
                <div>
                  <Label htmlFor="editTraits">Voice Traits</Label>
                  <Input
                    id="editTraits"
                    defaultValue={selectedPersona.voiceTraits.join(', ')}
                    className="mt-1"
                  />
                </div>
                
                <div>
                  <Label htmlFor="editPosts">Example Posts</Label>
                  <Textarea
                    id="editPosts"
                    defaultValue={selectedPersona.examplePosts?.join('\n\n') || ''}
                    rows={6}
                    className="mt-1"
                  />
                </div>
                
                <div className="flex gap-3">
                  <Button>Save Changes</Button>
                  <Button variant="outline">Cancel</Button>
                </div>
              </div>
            </Card>
          ) : (
            <Card className="p-8 text-center">
              <AlertCircle className="h-12 w-12 mx-auto mb-4 text-gray-400" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No persona selected
              </h3>
              <p className="text-gray-600">
                Select a persona from the overview to edit its settings
              </p>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
