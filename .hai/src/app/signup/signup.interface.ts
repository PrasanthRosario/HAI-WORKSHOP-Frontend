/**
 * Interface representing the request payload for user signup
 */
export interface SignupRequest {
  /** The desired username for the new account */
  username: string;
  /** The password for the new account */
  password: string;
}

/**
 * Interface representing the response from the signup operation
 */
export interface SignupResponse {
  /** Indicates whether the signup was successful */
  success: boolean;
  /** A message describing the result of the signup operation */
  message: string;
  /** Optional error message if the signup failed */
  error?: string;
}

/**
 * Interface representing validation errors for signup form fields
 */
export interface ValidationErrors {
  /** Array of validation error messages for the username field */
  username?: string[];
  /** Array of validation error messages for the password field */
  password?: string[];
}