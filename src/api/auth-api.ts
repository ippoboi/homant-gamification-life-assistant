import { backendApi } from "./api-provider";

// Types based on API schema
export interface SignUpDto {
  email: string;
  username: string;
  firstName: string;
  lastName: string;
  password: string;
}

export interface VerifyOtpDto {
  email: string;
  otp: string;
}

export interface SignInDto {
  email: string;
  password: string;
}

export interface ResetPasswordDto {
  token: string;
  newPassword: string;
}

export interface AuthResponse {
  access_token: string;
  user?: {
    id: string;
    email: string;
    username: string;
    firstName: string;
    lastName: string;
    avatar: string | null;
    isActive: boolean;
    isEmailVerified: boolean;
    lastLogin: string;
    createdAt: string;
    updatedAt: string;
  };
}

// Auth API functions
const authApi = {
  /**
   * Initiate user registration
   * @param data SignUpDto containing email, username, and password
   * @returns Promise with the response data
   */
  initiateSignUp: async (data: SignUpDto) => {
    const response = await backendApi.post("/auth/signup/initiate", data);
    return response.data;
  },

  /**
   * Verify OTP and complete registration
   * @param data VerifyOtpDto containing email and OTP
   * @returns Promise with the response data
   */
  verifyOtpAndCreateAccount: async (data: VerifyOtpDto) => {
    const response = await backendApi.post("/auth/signup/verify", data);
    return response.data;
  },

  /**
   * Sign in with email and password
   * @param data SignInDto containing email and password
   * @returns Promise with the AuthResponse containing access_token and user data
   */
  signIn: async (data: SignInDto): Promise<AuthResponse> => {
    const response = await backendApi.post("/auth/signin", data);
    return response.data;
  },

  /**
   * Refresh access token using refresh token
   * @returns Promise with the AuthResponse containing new access_token
   */
  refreshToken: async (): Promise<{ access_token: string }> => {
    const response = await backendApi.post("/auth/refresh");
    return response.data;
  },

  /**
   * Request password reset
   * @param email User's email address
   * @returns Promise with the response data
   */
  requestPasswordReset: async (email: string) => {
    const response = await backendApi.post("/auth/reset-password/request", {
      email,
    });
    return response.data;
  },

  /**
   * Reset password with token
   * @param data ResetPasswordDto containing token and new password
   * @returns Promise with the response data
   */
  resetPassword: async (data: ResetPasswordDto) => {
    const response = await backendApi.post(
      "/auth/reset-password/confirm",
      data
    );
    return response.data;
  },
};

export default authApi;
