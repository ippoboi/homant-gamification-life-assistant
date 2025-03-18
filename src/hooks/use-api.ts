import { useState, useCallback } from "react";
import { handleApiError, AppError } from "@/lib/error-handler";

interface UseApiOptions<T> {
  /**
   * Context string to identify where the error occurred
   */
  context?: string;

  /**
   * Whether to show toast notifications for errors
   */
  showErrorToast?: boolean;

  /**
   * Callback to run on success
   */
  onSuccess?: (data: T) => void;

  /**
   * Callback to run on error
   */
  onError?: (error: AppError) => void;
}

/**
 * A hook for handling API calls with loading state and error handling
 */
export function useApi<T>(options: UseApiOptions<T> = {}) {
  const {
    context = "API",
    showErrorToast = true,
    onSuccess,
    onError,
  } = options;

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<AppError | null>(null);
  const [data, setData] = useState<T | null>(null);

  // Function to execute an API call with error handling
  const execute = useCallback(
    async <R>(
      apiCall: () => Promise<R>,
      customOptions?: Partial<UseApiOptions<T>>
    ): Promise<R | null> => {
      // Merge default options with custom options
      const mergedOptions = {
        context,
        showErrorToast,
        onSuccess,
        onError,
        ...customOptions,
      };

      setIsLoading(true);
      setError(null);

      const [result, apiError] = await handleApiError(
        apiCall(),
        mergedOptions.context,
        mergedOptions.showErrorToast
      );

      if (apiError) {
        setError(apiError);
        if (mergedOptions.onError) {
          mergedOptions.onError(apiError);
        }
        setIsLoading(false);
        return null;
      }

      if (result) {
        setData(result as unknown as T);
        if (mergedOptions.onSuccess) {
          mergedOptions.onSuccess(result as unknown as T);
        }
      }

      setIsLoading(false);
      return result;
    },
    [context, showErrorToast, onSuccess, onError]
  );

  // Reset state
  const reset = useCallback(() => {
    setData(null);
    setError(null);
    setIsLoading(false);
  }, []);

  return {
    execute,
    reset,
    isLoading,
    error,
    data,
  };
}

/**
 * Usage example:
 *
 * const {
 *   execute,
 *   isLoading,
 *   error,
 *   data
 * } = useApi<UserProfile>({
 *   context: "FetchUserProfile",
 *   onSuccess: (data) => {
 *     console.log("Profile loaded!", data);
 *   }
 * });
 *
 * // Then in your component:
 * useEffect(() => {
 *   execute(() => userApi.getProfile(userId));
 * }, [userId, execute]);
 */
