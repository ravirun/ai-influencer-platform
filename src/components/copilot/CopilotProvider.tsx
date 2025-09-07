'use client';

import { CopilotKit } from '@copilotkit/react-core';
import { CopilotSidebar } from '@copilotkit/react-ui';
import { ReactNode } from 'react';

interface CopilotProviderProps {
  children: ReactNode;
}

export function CopilotProvider({ children }: CopilotProviderProps) {
  return (
    <CopilotKit runtimeUrl="/api/copilotkit">
      <CopilotSidebar
        instructions="You are an AI assistant for an influencer marketing platform. Help users create engaging social media content, manage campaigns, and optimize their influencer marketing strategies. You can generate captions, suggest hashtags, analyze content performance, and provide marketing insights."
        defaultOpen={false}
        labels={{
          title: "AI Marketing Assistant",
          initial: "Hi! I'm your AI marketing assistant. I can help you create content, manage campaigns, and optimize your influencer marketing strategy. What would you like to work on?",
        }}
      >
        {children}
      </CopilotSidebar>
    </CopilotKit>
  );
}
