'use client';

import { useState } from 'react';
import { CampaignManager } from '@/components/campaigns/CampaignManager';
import { CampaignCreateModal } from '@/components/campaigns/CampaignCreateModal';

export default function CampaignsPage() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const handleCreateCampaign = (campaign: unknown) => {
    console.log('Creating campaign:', campaign);
    // TODO: Implement campaign creation logic
  };

  return (
    <div className="space-y-6">
      <CampaignManager 
        onCreateCampaign={() => setIsCreateModalOpen(true)}
      />
      
      <CampaignCreateModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmit={handleCreateCampaign}
      />
    </div>
  );
}
