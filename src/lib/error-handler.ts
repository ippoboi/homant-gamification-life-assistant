import { toast } from "sonner";
import { AxiosError } from "axios";

// Error types for categorizing errors
export enum ErrorType {
  NETWORK = "NETWORK",
  AUTHENTICATION = "AUTHENTICATION",
  AUTHORIZATION = "AUTHORIZATION",
  VALIDATION = "VALIDATION",
  SERVER = "SERVER",
  NOT_FOUND = "NOT_FOUND",
  UNKNOWN = "UNKNOWN",
}

// Standard error object format
export interface AppError {
  type: ErrorType;
  message: string;
  technical?: string;
  status?: number;
  data?: Record<string, unknown>;
}

// Get error type based on HTTP status code or error instance
export const getErrorType = (error: unknown): ErrorType => {
  if (error instanceof AxiosError) {
    const status = error.response?.status;

    if (!status) return ErrorType.NETWORK;

    if (status === 401) return ErrorType.AUTHENTICATION;
    if (status === 403) return ErrorType.AUTHORIZATION;
    if (status === 404) return ErrorType.NOT_FOUND;
    if (status >= 400 && status < 500) return ErrorType.VALIDATION;
    if (status >= 500) return ErrorType.SERVER;
  }

  return ErrorType.UNKNOWN;
};

// User-friendly messages based on error type
const getUserFriendlyMessage = (
  type: ErrorType,
  originalMessage?: string
): string => {
  switch (type) {
    case ErrorType.NETWORK:
      return "Network error. Please check your internet connection.";
    case ErrorType.AUTHENTICATION:
      return originalMessage || "You need to log in to access this feature.";
    case ErrorType.AUTHORIZATION:
      return "You don't have permission to perform this action.";
    case ErrorType.VALIDATION:
      return originalMessage || "There was an issue with the submitted data.";
    case ErrorType.NOT_FOUND:
      return "The requested resource was not found.";
    case ErrorType.SERVER:
      return "We're experiencing server issues. Please try again later.";
    case ErrorType.UNKNOWN:
    default:
      return "Something went wrong. Please try again later.";
  }
};

// Extract message from various error objects
export const extractErrorMessage = (error: unknown): string => {
  if (error instanceof AxiosError) {
    // Try to get message from response data
    const message = error.response?.data?.message;
    if (message && typeof message === "string") return message;

    // Fall back to axios error message
    return error.message;
  }

  // Handle standard Error objects
  if (error instanceof Error) {
    return error.message;
  }

  // Convert anything else to string
  return String(error);
};

// Parse error object into standardized AppError
export const parseError = (error: unknown): AppError => {
  const type = getErrorType(error);
  const technicalMessage = extractErrorMessage(error);
  const userMessage = getUserFriendlyMessage(type, technicalMessage);

  let status: number | undefined;
  let data: Record<string, unknown> | undefined;

  if (error instanceof AxiosError) {
    status = error.response?.status;
    data = error.response?.data as Record<string, unknown>;
  }

  return {
    type,
    message: userMessage,
    technical: technicalMessage,
    status,
    data,
  };
};

// Log error to console or error tracking service
export const logError = (error: unknown, context?: string): void => {
  const appError = parseError(error);

  console.error(
    `[ERROR]${context ? ` [${context}]` : ""}: ${appError.message}`,
    {
      type: appError.type,
      technical: appError.technical,
      status: appError.status,
      data: appError.data,
    }
  );

  // Here you could send to error monitoring service like Sentry
  // if (typeof window !== 'undefined' && window.Sentry) {
  //   window.Sentry.captureException(error, {
  //     tags: { context },
  //     extra: appError
  //   });
  // }
};

// Handle error with standard pattern (log, toast, return formatted error)
export const handleError = (
  error: unknown,
  context?: string,
  showToast = true
): AppError => {
  const appError = parseError(error);

  // Log the error
  logError(error, context);

  // Show toast notification if requested
  if (showToast) {
    toast.error(appError.message);
  }

  return appError;
};

// Specific handler for API errors
export const handleApiError = async <T>(
  promise: Promise<T>,
  context?: string,
  showToast = true
): Promise<[T | null, AppError | null]> => {
  try {
    const data = await promise;
    return [data, null];
  } catch (error) {
    const appError = handleError(error, context, showToast);
    return [null, appError];
  }
};
