export interface LoginRequest {
  email: string;
  password: string;
}

export interface AuthUser {
  id: number;
  created_at: string;
  updated_at: string;
  is_active: boolean;
  name: string;
  email: string;
}

export interface LoginResponse {
  authData: {
    access_token: string;
    refresh_token: string;
  };
  userData: AuthUser;
}
