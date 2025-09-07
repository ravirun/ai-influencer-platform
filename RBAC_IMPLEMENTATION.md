# Role-Based Access Control (RBAC) Implementation

This document outlines the comprehensive role-based access control system implemented in the Inspire AI platform.

## Overview

The RBAC system provides three main roles with distinct permissions and access levels:

- **Admin**: Full platform access and management capabilities
- **Brand**: Campaign management and creator collaboration features
- **Creator**: Content creation and collaboration features

## Architecture

### 1. Authentication & User Management (`src/lib/auth.tsx`)

- **Firebase Authentication**: Google OAuth integration
- **Firestore User Documents**: Store user roles and profile data
- **Real-time Role Updates**: Automatic role synchronization across the app

```typescript
interface UserDoc {
  role: Role;
  displayName: string;
  email: string;
  photoURL?: string;
  brandId?: string;
  onboardingCompleted?: boolean;
  // ... other fields
}
```

### 2. RBAC Configuration (`src/lib/rbac.ts`)

Centralized configuration for:
- **Role Permissions**: What each role can access, create, edit, delete
- **Navigation Items**: Role-specific menu items
- **Dashboard Widgets**: Role-specific dashboard components
- **Feature Flags**: Role-based feature access

```typescript
export const ROLE_PERMISSIONS: Record<Role, RolePermissions> = {
  admin: { canAccess: ['*'], canCreate: ['*'], ... },
  brand: { canAccess: ['/dashboard', '/campaigns', ...], ... },
  creator: { canAccess: ['/dashboard', '/workbench', ...], ... }
};
```

### 3. Route Protection (`src/components/auth/ProtectedRoute.tsx`)

- **Automatic Redirects**: Based on role and onboarding status
- **Access Denied Pages**: User-friendly error messages
- **Onboarding Flow**: Redirects incomplete users to onboarding

### 4. API Protection (`src/lib/api-auth.ts`)

Middleware functions for API route protection:
- `requireAuth()`: Basic authentication check
- `requireRole()`: Specific role requirement
- `requirePermission()`: Granular permission checking
- `requireAnyRole()`: Multiple role options

```typescript
// Example usage in API routes
export const POST = requirePermission('create', 'content', handleGenerateContent);
```

### 5. Firestore Security Rules (`firestore.rules`)

Database-level security rules:
- **User Data**: Users can only access their own data
- **Campaigns**: Brand owners and assigned creators
- **Assets**: Content creators and campaign participants
- **Admin Override**: Admins have full access

## Role Definitions

### Admin Role
- **Access**: All platform features and data
- **Permissions**: Full CRUD operations on all resources
- **Features**: System management, user management, platform analytics
- **Navigation**: All menu items including system settings

### Brand Role
- **Access**: Campaign management, creator collaboration, content generation
- **Permissions**: Create/edit campaigns, manage content, view analytics
- **Features**: Campaign management, creator management, billing
- **Navigation**: Dashboard, campaigns, workbench, creators, analytics

### Creator Role
- **Access**: Content creation, campaign participation, personal analytics
- **Permissions**: Create/edit content, view assigned campaigns
- **Features**: Content generation, personal analytics
- **Navigation**: Dashboard, campaigns, workbench, content, analytics

## Usage Examples

### 1. Component-Level Protection

```tsx
import { RoleGuard, AdminOnly, BrandOnly } from '@/components/auth/RoleGuard';

// Role-based rendering
<AdminOnly fallback={<div>Admin access required</div>}>
  <SystemSettings />
</AdminOnly>

// Feature-based rendering
<RoleGuard features={['campaignManagement']}>
  <CampaignManager />
</RoleGuard>
```

### 2. Hook-Based Permission Checking

```tsx
import { useRBAC } from '@/hooks/useRBAC';

function MyComponent() {
  const { canManageCampaigns, isAdmin, userRole } = useRBAC();
  
  if (canManageCampaigns()) {
    return <CampaignButton />;
  }
  
  return null;
}
```

### 3. API Route Protection

```tsx
import { requireRole, requirePermission } from '@/lib/api-auth';

// Require specific role
export const POST = requireRole('admin', handleAdminAction);

// Require specific permission
export const POST = requirePermission('create', 'campaigns', handleCreateCampaign);
```

### 4. Navigation Protection

```tsx
import { getRoleNavigation } from '@/lib/rbac';

const navigation = getRoleNavigation(userRole);
// Returns only menu items the user can access
```

## Security Features

### 1. Multi-Layer Protection
- **Frontend**: Component-level guards and hooks
- **API**: Route-level middleware protection
- **Database**: Firestore security rules
- **Authentication**: Firebase Auth integration

### 2. Automatic Redirects
- **Unauthenticated**: Redirect to login
- **Incomplete Onboarding**: Redirect to onboarding flow
- **Insufficient Permissions**: Redirect to appropriate dashboard
- **Access Denied**: Show user-friendly error page

### 3. Real-time Updates
- **Role Changes**: Immediate UI updates
- **Permission Updates**: Automatic re-evaluation
- **Session Management**: Secure logout and cleanup

## Configuration

### Adding New Roles

1. Update `Role` type in `src/lib/types.ts`
2. Add role configuration in `src/lib/rbac.ts`
3. Update Firestore security rules
4. Add role-specific components and navigation

### Adding New Permissions

1. Update `RolePermissions` interface
2. Add permission checks in `ROLE_PERMISSIONS`
3. Update API route protection
4. Add Firestore security rules

### Adding New Features

1. Add feature flag in `ROLE_FEATURES`
2. Update navigation and dashboard widgets
3. Add component guards
4. Update API permissions

## Testing

### Manual Testing
1. **Login as different roles**: Test role-specific access
2. **Navigation**: Verify correct menu items appear
3. **API calls**: Test permission-based access
4. **Database access**: Verify Firestore security rules

### Automated Testing
```typescript
// Example test for role-based access
describe('RBAC', () => {
  it('should allow brand users to access campaigns', () => {
    const { canAccess } = useRBAC();
    expect(canAccess('/campaigns')).toBe(true);
  });
});
```

## Deployment

### 1. Environment Setup
- Configure Firebase project
- Set up Firestore security rules
- Deploy authentication configuration

### 2. Security Rules Deployment
```bash
firebase deploy --only firestore:rules
```

### 3. Application Deployment
- Deploy Next.js application
- Configure environment variables
- Test role-based functionality

## Monitoring & Maintenance

### 1. Access Logs
- Monitor authentication events
- Track permission denials
- Analyze user behavior patterns

### 2. Security Audits
- Regular permission reviews
- Role assignment audits
- API access monitoring

### 3. Updates
- Role permission updates
- New feature rollouts
- Security rule modifications

## Best Practices

1. **Principle of Least Privilege**: Users get minimum required access
2. **Defense in Depth**: Multiple security layers
3. **Regular Audits**: Periodic permission reviews
4. **Clear Documentation**: Well-documented permission structure
5. **User-Friendly Errors**: Clear access denied messages
6. **Graceful Degradation**: Fallback UI for restricted features

## Troubleshooting

### Common Issues

1. **Access Denied Errors**
   - Check user role assignment
   - Verify Firestore security rules
   - Confirm API route protection

2. **Navigation Issues**
   - Verify role configuration
   - Check navigation permissions
   - Confirm component guards

3. **API Permission Errors**
   - Check authentication headers
   - Verify role-based middleware
   - Confirm permission requirements

### Debug Tools

```typescript
// Debug user permissions
const { userRole, canPerform } = useRBAC();
console.log('User role:', userRole);
console.log('Can create campaigns:', canPerform('create', 'campaigns'));
```

This RBAC implementation provides a robust, scalable, and secure access control system for the Inspire AI platform.
