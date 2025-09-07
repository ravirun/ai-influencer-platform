/**
 * Authentication Error Handling Utilities
 * Provides consistent error handling and user-friendly messages for auth operations
 */

export interface AuthError {
  code: string;
  message: string;
  userFriendlyMessage: string;
  shouldRetry: boolean;
  category: 'network' | 'permission' | 'validation' | 'system' | 'user';
}

export const AUTH_ERROR_CODES = {
  // Firebase Auth Error Codes
  POPUP_CLOSED_BY_USER: 'auth/popup-closed-by-user',
  POPUP_BLOCKED: 'auth/popup-blocked',
  NETWORK_REQUEST_FAILED: 'auth/network-request-failed',
  TOO_MANY_REQUESTS: 'auth/too-many-requests',
  USER_DISABLED: 'auth/user-disabled',
  ACCOUNT_EXISTS_WITH_DIFFERENT_CREDENTIAL: 'auth/account-exists-with-different-credential',
  OPERATION_NOT_ALLOWED: 'auth/operation-not-allowed',
  UNAUTHORIZED_DOMAIN: 'auth/unauthorized-domain',
  INVALID_EMAIL: 'auth/invalid-email',
  USER_NOT_FOUND: 'auth/user-not-found',
  WRONG_PASSWORD: 'auth/wrong-password',
  EMAIL_ALREADY_IN_USE: 'auth/email-already-in-use',
  WEAK_PASSWORD: 'auth/weak-password',
  INVALID_CREDENTIAL: 'auth/invalid-credential',
  USER_TOKEN_EXPIRED: 'auth/user-token-expired',
  USER_NOT_FOUND: 'auth/user-not-found',
  INVALID_USER_TOKEN: 'auth/invalid-user-token',
  NETWORK_REQUEST_FAILED: 'auth/network-request-failed',
  REQUIRES_RECENT_LOGIN: 'auth/requires-recent-login',
} as const;

export const getAuthErrorMessage = (error: any): AuthError => {
  const code = error?.code || 'unknown';
  const message = error?.message || 'An unexpected error occurred';

  switch (code) {
    case AUTH_ERROR_CODES.POPUP_CLOSED_BY_USER:
      return {
        code,
        message,
        userFriendlyMessage: 'Sign-in was cancelled. Please try again.',
        shouldRetry: true,
        category: 'user'
      };

    case AUTH_ERROR_CODES.POPUP_BLOCKED:
      return {
        code,
        message,
        userFriendlyMessage: 'Popup was blocked by your browser. Please allow popups and try again.',
        shouldRetry: true,
        category: 'permission'
      };

    case AUTH_ERROR_CODES.NETWORK_REQUEST_FAILED:
      return {
        code,
        message,
        userFriendlyMessage: 'Network error. Please check your internet connection and try again.',
        shouldRetry: true,
        category: 'network'
      };

    case AUTH_ERROR_CODES.TOO_MANY_REQUESTS:
      return {
        code,
        message,
        userFriendlyMessage: 'Too many failed attempts. Please try again later.',
        shouldRetry: false,
        category: 'system'
      };

    case AUTH_ERROR_CODES.USER_DISABLED:
      return {
        code,
        message,
        userFriendlyMessage: 'This account has been disabled. Please contact support.',
        shouldRetry: false,
        category: 'permission'
      };

    case AUTH_ERROR_CODES.ACCOUNT_EXISTS_WITH_DIFFERENT_CREDENTIAL:
      return {
        code,
        message,
        userFriendlyMessage: 'An account already exists with this email using a different sign-in method.',
        shouldRetry: false,
        category: 'validation'
      };

    case AUTH_ERROR_CODES.OPERATION_NOT_ALLOWED:
      return {
        code,
        message,
        userFriendlyMessage: 'Google sign-in is not enabled. Please contact support.',
        shouldRetry: false,
        category: 'system'
      };

    case AUTH_ERROR_CODES.UNAUTHORIZED_DOMAIN:
      return {
        code,
        message,
        userFriendlyMessage: 'This domain is not authorized for Google sign-in.',
        shouldRetry: false,
        category: 'permission'
      };

    case AUTH_ERROR_CODES.INVALID_EMAIL:
      return {
        code,
        message,
        userFriendlyMessage: 'Please enter a valid email address.',
        shouldRetry: true,
        category: 'validation'
      };

    case AUTH_ERROR_CODES.USER_NOT_FOUND:
      return {
        code,
        message,
        userFriendlyMessage: 'No account found with this email address.',
        shouldRetry: true,
        category: 'validation'
      };

    case AUTH_ERROR_CODES.WRONG_PASSWORD:
      return {
        code,
        message,
        userFriendlyMessage: 'Incorrect password. Please try again.',
        shouldRetry: true,
        category: 'validation'
      };

    case AUTH_ERROR_CODES.EMAIL_ALREADY_IN_USE:
      return {
        code,
        message,
        userFriendlyMessage: 'An account already exists with this email address.',
        shouldRetry: false,
        category: 'validation'
      };

    case AUTH_ERROR_CODES.WEAK_PASSWORD:
      return {
        code,
        message,
        userFriendlyMessage: 'Password is too weak. Please choose a stronger password.',
        shouldRetry: true,
        category: 'validation'
      };

    case AUTH_ERROR_CODES.INVALID_CREDENTIAL:
      return {
        code,
        message,
        userFriendlyMessage: 'Invalid credentials. Please check your email and password.',
        shouldRetry: true,
        category: 'validation'
      };

    case AUTH_ERROR_CODES.USER_TOKEN_EXPIRED:
      return {
        code,
        message,
        userFriendlyMessage: 'Your session has expired. Please sign in again.',
        shouldRetry: true,
        category: 'system'
      };

    case AUTH_ERROR_CODES.INVALID_USER_TOKEN:
      return {
        code,
        message,
        userFriendlyMessage: 'Invalid session. Please sign in again.',
        shouldRetry: true,
        category: 'system'
      };

    case AUTH_ERROR_CODES.REQUIRES_RECENT_LOGIN:
      return {
        code,
        message,
        userFriendlyMessage: 'This action requires recent authentication. Please sign in again.',
        shouldRetry: true,
        category: 'permission'
      };

    default:
      return {
        code,
        message,
        userFriendlyMessage: 'An unexpected error occurred. Please try again.',
        shouldRetry: true,
        category: 'system'
      };
  }
};

export const logAuthError = (error: any, context: string = 'Auth operation') => {
  const authError = getAuthErrorMessage(error);
  
  console.group(`🔐 ${context} Error`);
  console.error('Error Code:', authError.code);
  console.error('Error Message:', authError.message);
  console.error('User-Friendly Message:', authError.userFriendlyMessage);
  console.error('Category:', authError.category);
  console.error('Should Retry:', authError.shouldRetry);
  console.error('Original Error:', error);
  console.groupEnd();
  
  return authError;
};

export const isRetryableError = (error: any): boolean => {
  const authError = getAuthErrorMessage(error);
  return authError.shouldRetry;
};

export const getErrorCategory = (error: any): AuthError['category'] => {
  const authError = getAuthErrorMessage(error);
  return authError.category;
};
