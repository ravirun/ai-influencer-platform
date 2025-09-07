'use client';

import { SessionManager } from '@/components/session/SessionManager';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';

export default function SessionsPage() {
  return (
    <ProtectedRoute>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Session Management</h1>
          <p className="text-gray-600 mt-2">
            Monitor and manage your active sessions across all devices
          </p>
        </div>
        
        <SessionManager />
      </div>
    </ProtectedRoute>
  );
}
