export interface LoginCredentials {
  username: string;
  password: string;
}

export interface UserSession {
  userId: string;
  username: string;
  createdAt: string;
  lastLogin: string;
}

export interface LoginResponse {
  success: boolean;
  message: string;
  user: UserSession;
}

export interface LoginError {
  message: string;
  statusCode: number;
}
