export type WizardStep = 
  | 'landing'
  | 'terms'
  | 'login'
  | 'login_verify'
  | 'step1_auth'
  | 'step2_identity'
  | 'step3_location'
  | 'step4_manifesto'
  | 'success';

export type Step2SubStep = 'username' | 'name' | 'age' | 'pronouns';

export interface FormData {
  isLoginFlow?: boolean;
  // Step 1: Auth & OTP
  authType: 'email' | 'phone';
  identifier: string; // email address or phone number
  otp: string;
  isVerified: boolean;

  // Step 2: Identity
  username: string;
  fullName: string;
  age: string; // numeric string
  pronouns: string; // he/him/his, she/her/hers, they/them/theirs, custom
  profilePicture?: string;

  // Step 3: Location & College
  state: string;
  city: string;
  college: string;
  customCollege: string;
  graduationYear: string;

  // Step 4: Manifesto & Vibe
  inviteCode: string;
  vibes: string[];
}

export interface FormErrors {
  [key: string]: string;
}

export interface ToastNotification {
  id: string;
  type: 'error' | 'success' | 'info';
  message: string;
}
