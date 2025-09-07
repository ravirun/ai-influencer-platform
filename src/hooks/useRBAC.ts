'use client';

import { useAuth } from '@/lib/auth';
import { 
  hasPermission, 
  hasFeature, 
  canAccessRoute,
  getRoleNavigation,
  getRoleDashboardWidgets,
  getDefaultRoute 
} from '@/lib/rbac';
import { Role } from '@/lib/types';

export function useRBAC() {
  const { userRole, userDoc } = useAuth();

  const canAccess = (route: string) => {
    if (!userRole) return false;
    return canAccessRoute(userRole, route);
  };

  const canPerform = (
    action: 'access' | 'create' | 'edit' | 'delete' | 'view' | 'manage',
    resource: string
  ) => {
    if (!userRole) return false;
    return hasPermission(userRole, action, resource);
  };

  const hasFeatureAccess = (feature: string) => {
    if (!userRole) return false;
    return hasFeature(userRole, feature);
  };

  const getNavigation = () => {
    if (!userRole) return [];
    return getRoleNavigation(userRole);
  };

  const getDashboardWidgets = () => {
    if (!userRole) return [];
    return getRoleDashboardWidgets(userRole);
  };

  const getDefaultRouteForRole = () => {
    if (!userRole) return '/login';
    return getDefaultRoute(userRole);
  };

  const isAdmin = () => userRole === 'admin';
  const isBrand = () => userRole === 'brand';
  const isCreator = () => userRole === 'creator';

  const canManageCampaigns = () => hasFeatureAccess('campaignManagement');
  const canManageCreators = () => hasFeatureAccess('creatorManagement');
  const canGenerateContent = () => hasFeatureAccess('contentGeneration');
  const canViewAnalytics = () => hasFeatureAccess('analytics');
  const canManageBilling = () => hasFeatureAccess('billing');
  const canViewAuditTrail = () => hasFeatureAccess('auditTrail');
  const canManageSystem = () => hasFeatureAccess('systemSettings');
  const canManageUsers = () => hasFeatureAccess('userManagement');
  const canManagePersonas = () => hasFeatureAccess('personaManagement');

  return {
    // Role checks
    userRole,
    userDoc,
    isAdmin,
    isBrand,
    isCreator,
    
    // Permission checks
    canAccess,
    canPerform,
    hasFeatureAccess,
    
    // Navigation and routing
    getNavigation,
    getDashboardWidgets,
    getDefaultRouteForRole,
    
    // Feature-specific checks
    canManageCampaigns,
    canManageCreators,
    canGenerateContent,
    canViewAnalytics,
    canManageBilling,
    canViewAuditTrail,
    canManageSystem,
    canManageUsers,
    canManagePersonas,
  };
}
