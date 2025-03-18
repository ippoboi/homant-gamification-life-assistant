"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { useRouter } from "next/navigation";
import authApi, {
  SignUpDto,
  VerifyOtpDto,
  SignInDto,
  AuthResponse,
} from "@/api/auth-api";
import { toast } from "sonner";
import { handleApiError } from "@/lib/error-handler";
import Cookies from "js-cookie";

// Define the shape of the auth context
interface AuthContextType {
  user: AuthResponse["user"] | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  register: (data: SignUpDto) => Promise<void>;
  verifyOtp: (data: VerifyOtpDto) => Promise<void>;
  login: (data: SignInDto) => Promise<void>;
  logout: () => void;
}

export const ACCESS_TOKEN_KEY = "access_token";
export const USER_KEY = "user";

// Create the auth context
const AuthContext = createContext<AuthContextType | null>(null);

// Create a hook to use the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

// Cookie options
const COOKIE_OPTIONS = {
  secure: process.env.NODE_ENV === "production",
  sameSite: "strict" as const,
  path: "/",
  expires: 7, // 7 days
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<AuthResponse["user"] | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  // Helper function to set the token in both localStorage and cookie
  const setToken = (token: string) => {
    localStorage.setItem(ACCESS_TOKEN_KEY, token);
    Cookies.set(ACCESS_TOKEN_KEY, token, COOKIE_OPTIONS);
  };

  // Helper function to remove the token from both localStorage and cookie
  const removeToken = () => {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    Cookies.remove(ACCESS_TOKEN_KEY);
  };

  // Check if user is already logged in on component mount
  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const token = localStorage.getItem(ACCESS_TOKEN_KEY);
        if (!token) {
          setIsLoading(false);
          return;
        }

        // Set token in cookie if it exists in localStorage (for existing users)
        Cookies.set(ACCESS_TOKEN_KEY, token, COOKIE_OPTIONS);

        // We don't need to manually refresh token here anymore
        // as the axios interceptor will handle it automatically on API calls
        // Just load the user data from localStorage if available
        const userData = localStorage.getItem(USER_KEY);
        if (userData) {
          try {
            const parsedUser = JSON.parse(userData);
            setUser(parsedUser);
            setIsAuthenticated(true);
          } catch {
            // If parsing fails, clear the storage
            localStorage.removeItem(USER_KEY);
          }
        }
      } catch (err) {
        console.error("Auth status check failed:", err);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  // Register function
  const register = async (data: SignUpDto) => {
    setIsLoading(true);
    setError(null);

    const [, apiError] = await handleApiError(
      authApi.initiateSignUp(data),
      "Register",
      false // We'll handle toast ourselves
    );

    if (apiError) {
      setError(apiError.message);
      toast.error(apiError.message);
    } else {
      toast.success("Registration initiated. Please check your email for OTP.");
    }

    setIsLoading(false);
  };

  // Verify OTP function
  const verifyOtp = async (data: VerifyOtpDto) => {
    setIsLoading(true);
    setError(null);

    const [result, apiError] = await handleApiError(
      authApi.verifyOtpAndCreateAccount(data),
      "VerifyOTP",
      false
    );

    if (apiError) {
      setError(apiError.message);
      toast.error(apiError.message);
    } else if (result && result.access_token) {
      setToken(result.access_token);

      if (result.user) {
        setUser(result.user);
        localStorage.setItem(USER_KEY, JSON.stringify(result.user));
        setIsAuthenticated(true);
      }

      toast.success("Account verified successfully!");
      router.push("/dashboard");
    }

    setIsLoading(false);
  };

  // Login function
  const login = async (data: SignInDto) => {
    setIsLoading(true);
    setError(null);

    const [result, apiError] = await handleApiError(
      authApi.signIn(data),
      "Login",
      false
    );

    if (apiError) {
      setError(apiError.message);
      toast.error(apiError.message);
    } else if (result && result.access_token) {
      setToken(result.access_token);

      if (result.user) {
        setUser(result.user);
        localStorage.setItem(USER_KEY, JSON.stringify(result.user));
        setIsAuthenticated(true);
      }

      toast.success("Logged in successfully!");
      router.push("/dashboard");
    }

    setIsLoading(false);
  };

  // Logout function
  const logout = () => {
    removeToken();
    localStorage.removeItem(USER_KEY);
    setUser(null);
    setIsAuthenticated(false);
    toast.success("Logged out successfully!");
    router.push("/");
  };

  const value = {
    user,
    isAuthenticated,
    isLoading,
    error,
    register,
    verifyOtp,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
