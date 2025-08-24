export const OWNER_NAME = process.env.NEXT_PUBLIC_OWNER_NAME || 'Vojtěch Kostkan';

// Public (safe for client) contact details
export const CONTACT_EMAIL = process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'info@example.com';
export const CONTACT_PHONE_DISPLAY = process.env.NEXT_PUBLIC_CONTACT_PHONE_DISPLAY || '+420 123 456 789';
export const CONTACT_PHONE_E164 = process.env.NEXT_PUBLIC_CONTACT_PHONE_E164 || '+420123456789';

// Server-side email sender (domain-based mailbox). Do NOT expose privately scoped keys here.
export const CONTACT_FROM =
  process.env.APP_FROM_EMAIL ||
  process.env.CONTACT_FROM ||
  'info@vojtechkostkan.cz';
