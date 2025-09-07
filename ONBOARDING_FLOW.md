# Onboarding Flow with Demo Campaign

## Overview

The onboarding flow has been enhanced to include a demo campaign creation step that helps new users understand the platform's capabilities. The flow now consists of 5 steps:

1. **Role Selection** - Choose between Brand, Creator, or Admin
2. **Profile Setup** - Complete profile information and preferences
3. **Preferences Setup** - Configure notifications, privacy, and content preferences
4. **Demo Campaign Setup** - Create a sample campaign/opportunity to explore
5. **Onboarding Complete** - Welcome message and next steps

## Components

### New Components Added

- `DemoCampaignSetup.tsx` - Handles demo campaign creation
- `demo-campaign/page.tsx` - Displays the created demo campaign
- `create-demo-campaign/route.ts` - API endpoint for creating demo campaigns

### Updated Components

- `onboarding/page.tsx` - Added demo step to the flow
- `OnboardingComplete.tsx` - Updated to mention demo campaign
- `RoleBasedDashboard.tsx` - Added demo campaign quick action
- `rbac.ts` - Added demo campaign widget to role permissions

## Demo Campaign Features

### For Brands
- Creates a sample campaign with realistic data
- Includes campaign brief, target audience, and content requirements
- Generates sample AI personas and content
- Shows campaign KPIs and analytics goals

### For Creators
- Creates a sample collaboration opportunity
- Includes compensation and deliverable details
- Generates sample content for the opportunity
- Shows engagement metrics and performance data

## API Endpoints

### POST /api/create-demo-campaign

Creates a demo campaign based on the user's role.

**Request Body:**
```json
{
  "role": "brand" | "creator"
}
```

**Response:**
```json
{
  "success": true,
  "campaignId": "campaign-id",
  "message": "Demo campaign created successfully"
}
```

## Database Schema

The demo campaign creates the following data:

- **Campaign Document** - Main campaign information
- **Persona Document** - AI persona for content generation
- **Asset Documents** - Sample generated content
- **User Preferences** - Updated with demo campaign reference

## User Experience Flow

1. User completes role selection, profile setup, and preferences
2. User reaches the demo campaign step
3. System creates a personalized demo campaign based on their role
4. User sees a preview of the demo campaign with sample content
5. User is redirected to the demo campaign page to explore
6. Dashboard shows a "Demo Campaign" quick action for easy access

## Testing

Run the test script to validate the onboarding flow:

```bash
node scripts/test-onboarding.js
```

This will check:
- All components exist
- API endpoints are properly configured
- Dashboard integration is working
- RBAC permissions are set up correctly

## Future Enhancements

- Add more interactive elements to the demo campaign
- Include guided tours within the demo campaign
- Add analytics tracking for onboarding completion rates
- Create role-specific demo content variations
- Add A/B testing for different onboarding flows

## Troubleshooting

### Common Issues

1. **Demo campaign not created** - Check Firebase authentication and database permissions
2. **Demo campaign page not loading** - Verify the campaign was created successfully
3. **Dashboard quick action missing** - Check RBAC configuration and user role

### Debug Steps

1. Check browser console for errors
2. Verify Firebase connection
3. Check database rules and permissions
4. Validate user authentication state
5. Test API endpoint directly

## Configuration

The demo campaign can be customized by modifying:

- `src/app/api/create-demo-campaign/route.ts` - Campaign data and structure
- `src/components/onboarding/DemoCampaignSetup.tsx` - UI and user experience
- `src/app/(dashboard)/demo-campaign/page.tsx` - Demo campaign display

## Security Considerations

- Demo campaigns are marked with `demo` tags for easy identification
- Demo data is clearly labeled to avoid confusion with real campaigns
- Demo campaigns have limited functionality compared to real campaigns
- User permissions are properly validated before creating demo content
