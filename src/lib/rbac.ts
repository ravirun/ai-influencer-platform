import { Role } from './types';

// Role-based access control configuration
export interface RolePermissions {
  canAccess: string[];
  canCreate: string[];
  canEdit: string[];
  canDelete: string[];
  canView: string[];
  canManage: string[];
}

export const ROLE_PERMISSIONS: Record<Role, RolePermissions> = {
  admin: {
    canAccess: ['*'], // Access to everything
    canCreate: ['*'],
    canEdit: ['*'],
    canDelete: ['*'],
    canView: ['*'],
    canManage: ['*'],
  },
  brand: {
    canAccess: [
      '/dashboard',
      '/campaigns',
      '/workbench',
      '/creators',
      '/content',
      '/calendar',
      '/analytics',
      '/billing',
      '/settings',
      '/personas',
      '/audit'
    ],
    canCreate: [
      'campaigns',
      'content',
      'schedules',
      'personas'
    ],
    canEdit: [
      'campaigns',
      'content',
      'schedules',
      'personas',
      'profile'
    ],
    canDelete: [
      'campaigns',
      'content',
      'schedules',
      'personas'
    ],
    canView: [
      'campaigns',
      'content',
      'analytics',
      'creators',
      'audit'
    ],
    canManage: [
      'campaigns',
      'content',
      'schedules',
      'personas'
    ],
  },
  creator: {
    canAccess: [
      '/dashboard',
      '/campaigns',
      '/workbench',
      '/content',
      '/calendar',
      '/analytics',
      '/settings',
      '/personas'
    ],
    canCreate: [
      'content',
      'schedules'
    ],
    canEdit: [
      'content',
      'schedules',
      'profile'
    ],
    canDelete: [
      'content',
      'schedules'
    ],
    canView: [
      'campaigns',
      'content',
      'analytics'
    ],
    canManage: [
      'content',
      'schedules'
    ],
  },
};

// Navigation items based on role
export const ROLE_NAVIGATION: Record<Role, Array<{
  name: string;
  href: string;
  icon: string;
  description?: string;
}>> = {
  admin: [
    { name: 'Dashboard', href: '/dashboard', icon: 'LayoutDashboard' },
    { name: 'Campaigns', href: '/campaigns', icon: 'Users' },
    { name: 'Workbench', href: '/workbench', icon: 'Bot' },
    { name: 'Creators', href: '/creators', icon: 'Users' },
    { name: 'Content', href: '/content', icon: 'Workflow' },
    { name: 'Calendar', href: '/calendar', icon: 'Calendar' },
    { name: 'Analytics', href: '/analytics', icon: 'BarChart3' },
    { name: 'Audit Trail', href: '/audit', icon: 'History' },
    { name: 'Billing', href: '/billing', icon: 'Settings' },
    { name: 'Settings', href: '/settings', icon: 'Settings' },
    { name: 'Personas', href: '/personas', icon: 'Sparkles' },
  ],
  brand: [
    { name: 'Dashboard', href: '/dashboard', icon: 'LayoutDashboard' },
    { name: 'Campaigns', href: '/campaigns', icon: 'Users' },
    { name: 'Workbench', href: '/workbench', icon: 'Bot' },
    { name: 'Creators', href: '/creators', icon: 'Users' },
    { name: 'Content', href: '/content', icon: 'Workflow' },
    { name: 'Calendar', href: '/calendar', icon: 'Calendar' },
    { name: 'Analytics', href: '/analytics', icon: 'BarChart3' },
    { name: 'Audit Trail', href: '/audit', icon: 'History' },
    { name: 'Billing', href: '/billing', icon: 'Settings' },
    { name: 'Settings', href: '/settings', icon: 'Settings' },
    { name: 'Personas', href: '/personas', icon: 'Sparkles' },
  ],
  creator: [
    { name: 'Dashboard', href: '/dashboard', icon: 'LayoutDashboard' },
    { name: 'Campaigns', href: '/campaigns', icon: 'Users' },
    { name: 'Workbench', href: '/workbench', icon: 'Bot' },
    { name: 'Content', href: '/content', icon: 'Workflow' },
    { name: 'Calendar', href: '/calendar', icon: 'Calendar' },
    { name: 'Analytics', href: '/analytics', icon: 'BarChart3' },
    { name: 'Settings', href: '/settings', icon: 'Settings' },
    { name: 'Personas', href: '/personas', icon: 'Sparkles' },
  ],
};

// Dashboard widgets based on role
export const ROLE_DASHBOARD_WIDGETS: Record<Role, string[]> = {
  admin: [
    'overview',
    'campaigns',
    'creators',
    'content',
    'analytics',
    'revenue',
    'system'
  ],
  brand: [
    'overview',
    'campaigns',
    'creators',
    'content',
    'analytics',
    'revenue'
  ],
  creator: [
    'overview',
    'campaigns',
    'content',
    'analytics',
    'earnings'
  ],
};

// Permission checking functions
export function hasPermission(
  role: Role,
  action: 'access' | 'create' | 'edit' | 'delete' | 'view' | 'manage',
  resource: string
): boolean {
  const permissions = ROLE_PERMISSIONS[role];
  const actionKey = `can${action.charAt(0).toUpperCase() + action.slice(1)}` as keyof RolePermissions;
  const allowedResources = permissions[actionKey];
  
  return allowedResources.includes('*') || allowedResources.includes(resource);
}

export function canAccessRoute(role: Role, route: string): boolean {
  return hasPermission(role, 'access', route);
}

export function getRoleNavigation(role: Role) {
  return ROLE_NAVIGATION[role] || [];
}

export function getRoleDashboardWidgets(role: Role) {
  return ROLE_DASHBOARD_WIDGETS[role] || [];
}

// Role-based redirect logic
export function getDefaultRoute(role: Role): string {
  switch (role) {
    case 'admin':
      return '/dashboard';
    case 'brand':
      return '/dashboard';
    case 'creator':
      return '/dashboard';
    default:
      return '/dashboard';
  }
}

// Role-based feature flags
export const ROLE_FEATURES: Record<Role, Record<string, boolean>> = {
  admin: {
    campaignManagement: true,
    creatorManagement: true,
    contentGeneration: true,
    analytics: true,
    billing: true,
    auditTrail: true,
    systemSettings: true,
    userManagement: true,
    personaManagement: true,
  },
  brand: {
    campaignManagement: true,
    creatorManagement: true,
    contentGeneration: true,
    analytics: true,
    billing: true,
    auditTrail: true,
    systemSettings: false,
    userManagement: false,
    personaManagement: true,
  },
  creator: {
    campaignManagement: false,
    creatorManagement: false,
    contentGeneration: true,
    analytics: true,
    billing: false,
    auditTrail: false,
    systemSettings: false,
    userManagement: false,
    personaManagement: true,
  },
};

export function hasFeature(role: Role, feature: string): boolean {
  return ROLE_FEATURES[role]?.[feature] || false;
}
