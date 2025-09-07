'use client';

import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  History, 
  DollarSign, 
  Clock, 
  User, 
  Bot, 
  CheckCircle, 
  XCircle, 
  AlertCircle,
  Download,
  Filter,
  Search
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface AuditEvent {
  id: string;
  type: 'generation' | 'approval' | 'rejection' | 'scheduling' | 'payment' | 'login';
  actor: string;
  actorType: 'user' | 'system' | 'ai';
  action: string;
  details: string;
  timestamp: number;
  cost?: number;
  assetId?: string;
  campaignId?: string;
  metadata?: Record<string, any>;
}

interface AuditTrailProps {
  className?: string;
}

export function AuditTrail({ className }: AuditTrailProps) {
  const [events, setEvents] = useState<AuditEvent[]>([]);
  const [filter, setFilter] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Mock audit events
  useEffect(() => {
    const mockEvents: AuditEvent[] = [
      {
        id: '1',
        type: 'generation',
        actor: 'AI Assistant',
        actorType: 'ai',
        action: 'Generated content variants',
        details: 'Generated 3 caption variants for Summer Collection Launch campaign',
        timestamp: Date.now() - 1000 * 60 * 30, // 30 minutes ago
        cost: 0.045,
        assetId: 'asset_123',
        campaignId: 'campaign_1'
      },
      {
        id: '2',
        type: 'approval',
        actor: 'John Doe',
        actorType: 'user',
        action: 'Approved content variant',
        details: 'Approved variant "Exciting news! 🎉 Our latest innovation..."',
        timestamp: Date.now() - 1000 * 60 * 25, // 25 minutes ago
        assetId: 'asset_123',
        campaignId: 'campaign_1'
      },
      {
        id: '3',
        type: 'scheduling',
        actor: 'System',
        actorType: 'system',
        action: 'Scheduled content for publishing',
        details: 'Scheduled approved content for Instagram and TikTok at 6:00 PM IST',
        timestamp: Date.now() - 1000 * 60 * 20, // 20 minutes ago
        assetId: 'asset_123',
        campaignId: 'campaign_1'
      },
      {
        id: '4',
        type: 'payment',
        actor: 'John Doe',
        actorType: 'user',
        action: 'Processed payment',
        details: 'Payment of ₹50,000 processed for Summer Collection Launch campaign',
        timestamp: Date.now() - 1000 * 60 * 15, // 15 minutes ago
        cost: 50000,
        campaignId: 'campaign_1'
      },
      {
        id: '5',
        type: 'generation',
        actor: 'AI Assistant',
        actorType: 'ai',
        action: 'Generated content variants',
        details: 'Generated 5 caption variants for Tech Product Launch campaign',
        timestamp: Date.now() - 1000 * 60 * 10, // 10 minutes ago
        cost: 0.075,
        assetId: 'asset_124',
        campaignId: 'campaign_2'
      },
      {
        id: '6',
        type: 'rejection',
        actor: 'Jane Smith',
        actorType: 'user',
        action: 'Rejected content variant',
        details: 'Rejected variant due to brand compliance issues',
        timestamp: Date.now() - 1000 * 60 * 5, // 5 minutes ago
        assetId: 'asset_124',
        campaignId: 'campaign_2'
      }
    ];
    setEvents(mockEvents);
  }, []);

  const filteredEvents = events.filter(event => {
    const matchesFilter = filter === 'all' || event.type === filter;
    const matchesSearch = event.details.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.action.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const getEventIcon = (type: string) => {
    switch (type) {
      case 'generation': return Bot;
      case 'approval': return CheckCircle;
      case 'rejection': return XCircle;
      case 'scheduling': return Clock;
      case 'payment': return DollarSign;
      case 'login': return User;
      default: return AlertCircle;
    }
  };

  const getEventColor = (type: string) => {
    switch (type) {
      case 'generation': return 'text-blue-600 bg-blue-100';
      case 'approval': return 'text-green-600 bg-green-100';
      case 'rejection': return 'text-red-600 bg-red-100';
      case 'scheduling': return 'text-purple-600 bg-purple-100';
      case 'payment': return 'text-orange-600 bg-orange-100';
      case 'login': return 'text-gray-600 bg-gray-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getActorIcon = (actorType: string) => {
    switch (actorType) {
      case 'user': return User;
      case 'ai': return Bot;
      case 'system': return Clock;
      default: return User;
    }
  };

  const totalCost = events.reduce((sum, event) => sum + (event.cost || 0), 0);

  const handleExport = () => {
    const csvContent = [
      ['Timestamp', 'Type', 'Actor', 'Action', 'Details', 'Cost', 'Asset ID', 'Campaign ID'],
      ...filteredEvents.map(event => [
        new Date(event.timestamp).toISOString(),
        event.type,
        event.actor,
        event.action,
        event.details,
        event.cost || 0,
        event.assetId || '',
        event.campaignId || ''
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `audit-trail-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className={cn('space-y-6', className)}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Audit Trail</h1>
          <p className="text-gray-600">Track all platform activities and costs</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <DollarSign className="h-4 w-4" />
            <span>Total Cost: ₹{totalCost.toFixed(3)}</span>
          </div>
          <Button variant="outline" onClick={handleExport}>
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card className="p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <input
                placeholder="Search audit events..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md text-sm"
              />
            </div>
          </div>
          <div className="flex gap-2">
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md text-sm"
            >
              <option value="all">All Events</option>
              <option value="generation">Content Generation</option>
              <option value="approval">Approvals</option>
              <option value="rejection">Rejections</option>
              <option value="scheduling">Scheduling</option>
              <option value="payment">Payments</option>
              <option value="login">User Activity</option>
            </select>
          </div>
        </div>
      </Card>

      {/* Audit Events */}
      <div className="space-y-4">
        {filteredEvents.map((event) => {
          const EventIcon = getEventIcon(event.type);
          const ActorIcon = getActorIcon(event.actorType);
          
          return (
            <Card key={event.id} className="p-4">
              <div className="flex items-start gap-4">
                <div className={cn('p-2 rounded-lg', getEventColor(event.type))}>
                  <EventIcon className="h-4 w-4" />
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-sm font-medium text-gray-900">{event.action}</h3>
                    <Badge variant="outline" className="text-xs">
                      {event.type}
                    </Badge>
                    {event.cost && (
                      <Badge variant="secondary" className="text-xs">
                        ₹{event.cost.toFixed(3)}
                      </Badge>
                    )}
                  </div>
                  
                  <p className="text-sm text-gray-600 mb-2">{event.details}</p>
                  
                  <div className="flex items-center gap-4 text-xs text-gray-500">
                    <div className="flex items-center gap-1">
                      <ActorIcon className="h-3 w-3" />
                      <span>{event.actor}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      <span>{new Date(event.timestamp).toLocaleString()}</span>
                    </div>
                    {event.assetId && (
                      <span>Asset: {event.assetId}</span>
                    )}
                    {event.campaignId && (
                      <span>Campaign: {event.campaignId}</span>
                    )}
                  </div>
                </div>
              </div>
            </Card>
          );
        })}
        
        {filteredEvents.length === 0 && (
          <Card className="p-8 text-center">
            <History className="h-12 w-12 mx-auto mb-4 text-gray-400" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No audit events found
            </h3>
            <p className="text-gray-600">
              {searchTerm || filter !== 'all' 
                ? 'Try adjusting your search or filters'
                : 'Audit events will appear here as you use the platform'
              }
            </p>
          </Card>
        )}
      </div>
    </div>
  );
}
