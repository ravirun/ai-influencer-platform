import { SimpleAIWorkbench } from '@/components/copilot/SimpleAIWorkbench';

export default function WorkbenchPage() {
  return (
    <div className="space-y-6">
      <SimpleAIWorkbench 
        campaignId=""
        personaId="default_persona"
      />
    </div>
  );
}
