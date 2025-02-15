export interface SignupRequest {
  username: string;
  password: string;
}

export interface SignupResponse {
  success: boolean;
  message: string;
  error?: string;
}

export interface ValidationErrors {
  username?: string[];
  password?: string[];
}
