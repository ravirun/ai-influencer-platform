'use client';

import { ReactNode } from 'react';
import { useRBAC } from '@/hooks/useRBAC';
import { Role } from '@/lib/types';

interface RoleGuardProps {
  children: ReactNode;
  roles?: Role[];
  permissions?: {
    action: 'access' | 'create' | 'edit' | 'delete' | 'view' | 'manage';
    resource: string;
  }[];
  features?: string[];
  fallback?: ReactNode;
  requireAll?: boolean; // If true, user must have ALL permissions/features
}

export function RoleGuard({
  children,
  roles = [],
  permissions = [],
  features = [],
  fallback = null,
  requireAll = false
}: RoleGuardProps) {
  const { 
    userRole, 
    canPerform, 
    hasFeatureAccess 
  } = useRBAC();

  // If no restrictions, show content
  if (roles.length === 0 && permissions.length === 0 && features.length === 0) {
    return <>{children}</>;
  }

  // Check role restrictions
  if (roles.length > 0) {
    if (!userRole || !roles.includes(userRole)) {
      return <>{fallback}</>;
    }
  }

  // Check permission restrictions
  if (permissions.length > 0) {
    const hasPermissions = permissions.map(({ action, resource }) => 
      canPerform(action, resource)
    );
    
    const hasRequiredPermissions = requireAll 
      ? hasPermissions.every(Boolean)
      : hasPermissions.some(Boolean);
    
    if (!hasRequiredPermissions) {
      return <>{fallback}</>;
    }
  }

  // Check feature restrictions
  if (features.length > 0) {
    const hasFeatures = features.map(feature => hasFeatureAccess(feature));
    
    const hasRequiredFeatures = requireAll 
      ? hasFeatures.every(Boolean)
      : hasFeatures.some(Boolean);
    
    if (!hasRequiredFeatures) {
      return <>{fallback}</>;
    }
  }

  return <>{children}</>;
}

// Convenience components for common use cases
export function AdminOnly({ children, fallback }: { children: ReactNode; fallback?: ReactNode }) {
  return (
    <RoleGuard roles={['admin']} fallback={fallback}>
      {children}
    </RoleGuard>
  );
}

export function BrandOnly({ children, fallback }: { children: ReactNode; fallback?: ReactNode }) {
  return (
    <RoleGuard roles={['brand']} fallback={fallback}>
      {children}
    </RoleGuard>
  );
}

export function CreatorOnly({ children, fallback }: { children: ReactNode; fallback?: ReactNode }) {
  return (
    <RoleGuard roles={['creator']} fallback={fallback}>
      {children}
    </RoleGuard>
  );
}

export function BrandAndAdmin({ children, fallback }: { children: ReactNode; fallback?: ReactNode }) {
  return (
    <RoleGuard roles={['brand', 'admin']} fallback={fallback}>
      {children}
    </RoleGuard>
  );
}

export function CreatorAndAdmin({ children, fallback }: { children: ReactNode; fallback?: ReactNode }) {
  return (
    <RoleGuard roles={['creator', 'admin']} fallback={fallback}>
      {children}
    </RoleGuard>
  );
}

export function CampaignManagement({ children, fallback }: { children: ReactNode; fallback?: ReactNode }) {
  return (
    <RoleGuard features={['campaignManagement']} fallback={fallback}>
      {children}
    </RoleGuard>
  );
}

export function ContentGeneration({ children, fallback }: { children: ReactNode; fallback?: ReactNode }) {
  return (
    <RoleGuard features={['contentGeneration']} fallback={fallback}>
      {children}
    </RoleGuard>
  );
}

export function AnalyticsAccess({ children, fallback }: { children: ReactNode; fallback?: ReactNode }) {
  return (
    <RoleGuard features={['analytics']} fallback={fallback}>
      {children}
    </RoleGuard>
  );
}

export function SystemManagement({ children, fallback }: { children: ReactNode; fallback?: ReactNode }) {
  return (
    <RoleGuard features={['systemSettings']} fallback={fallback}>
      {children}
    </RoleGuard>
  );
}
