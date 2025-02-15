/**
 * Interface representing user login credentials
 */
export interface LoginCredentials {
  /** Username for authentication */
  username: string;
  /** Password for authentication */
  password: string;
}

/**
 * Interface representing a user's active session information
 */
export interface UserSession {
  /** Unique identifier for the user */
  userId: string;
  /** Username of the logged-in user */
  username: string;
  /** User's role in the system - either 'user' or 'admin' */
  role: 'user' | 'admin';
  /** Timestamp when the user account was created */
  createdAt: string;
  /** Timestamp of the user's most recent login */
  lastLogin: string;
}

/**
 * Interface representing the response from a login attempt
 */
export interface LoginResponse {
  /** Indicates whether the login attempt was successful */
  success: boolean;
  /** Message describing the result of the login attempt */
  message: string;
  /** User session information if login was successful */
  user: UserSession;
}

/**
 * Interface representing an error that occurred during login
 */
export interface LoginError {
  /** Error message describing what went wrong */
  message: string;
  /** HTTP status code associated with the error */
  statusCode: number;
}