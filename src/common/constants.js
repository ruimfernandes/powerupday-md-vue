import mirrorCreator from 'mirror-creator';

export default mirrorCreator(['UNAUTHORIZED', 'invalid_token', 'NOT_FOUND']);

export const subtotalName = 'Subtotal';
export const taxName = 'Tax';
export const shippingFeeName = 'Shipping Fee';
export const discountName = 'Discount';

//merchant onboarding status
export const companyInfoSubmitted = 'company_info_submitted';
export const credentialsGenerated = 'credentials_generated';
export const emailConfirmed = 'email_confirmed';
export const kybSubmitted = 'kyb_submitted';
export const kybInProgress = 'kyb_in_progress';
export const onboardingCompleted = 'completed';
export const registered = `registered`;
export const businessDetailsEntered = 'business_details_entered';

export const onboardingStatuses = [
  businessDetailsEntered,
  companyInfoSubmitted,
  credentialsGenerated,
  emailConfirmed,
  kybSubmitted,
  kybInProgress,
  onboardingCompleted,
  registered,
];

// merchant status
export const active = 'active';
export const settlementsSuspended = 'settlements_suspended';
export const hardBlocked = 'hard_blocked';

export const supportUrl = 'https://support.utrust.com';
export const supportEmail = 'support@utrust.com';

export const failedToFetchChrome = 'Failed to fetch';
export const failedToFetchFirefox =
  'NetworkError when attempting to fetch resource.';
export const killSwitchStatusText = 'Service Temporarily Disabled';
export const killSwitchStatus = 555;
export const passwordAlreadyAdded = 'password_authentication_already_added';
