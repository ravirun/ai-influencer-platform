import { AIWorkbench } from '@/components/llm/AIWorkbench';

export default function WorkbenchPage() {
  return (
    <div className="space-y-6">
      <AIWorkbench 
        campaignId="demo_campaign_1"
        personaId="default_persona"
      />
    </div>
  );
}
