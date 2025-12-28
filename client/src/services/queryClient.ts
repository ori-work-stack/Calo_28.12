import { QueryClient, QueryCache, MutationCache } from "@tanstack/react-query";

// Error handler for queries
const queryErrorHandler = (error: unknown, query: any) => {
  console.warn("Query error:", {
    queryKey: query.queryKey,
    error: error instanceof Error ? error.message : "Unknown error",
  });
};

// Error handler for mutations
const mutationErrorHandler = (
  error: unknown,
  variables: any,
  context: any,
  mutation: any
) => {
  console.warn("Mutation error:", {
    mutationKey: mutation.options.mutationKey,
    error: error instanceof Error ? error.message : "Unknown error",
  });
};

// Create query cache with error handling
const queryCache = new QueryCache({
  onError: queryErrorHandler,
});

// Create mutation cache with error handling
const mutationCache = new MutationCache({
  onError: mutationErrorHandler,
});

// Create QueryClient instance
const queryClient = new QueryClient({
  queryCache,
  mutationCache,
  defaultOptions: {
    queries: {
      retry: (failureCount, error: any) => {
        if (error?.response?.status >= 400 && error?.response?.status < 500) {
          return false;
        }
        return failureCount < 1;
      },
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),

      staleTime: 5 * 60 * 1000,
      gcTime: 10 * 60 * 1000,

      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: true,
      refetchInterval: false,

      structuralSharing: true,
      networkMode: "online",
    },
    mutations: {
      retry: 1,
      networkMode: "online",
    },
  },
});

// Function to clear all queries - needed for auth signout
export const clearAllQueries = () => {
  console.log("🗑️ Clearing all TanStack Query cache...");
  queryClient.clear();
  console.log("✅ TanStack Query cache cleared");
};

// Additional utility functions for cache management
export const invalidateAllQueries = () => {
  console.log("♻️ Invalidating all queries...");
  return queryClient.invalidateQueries();
};

export const removeAllQueries = () => {
  console.log("🗑️ Removing all queries...");
  queryClient.removeQueries();
};

export const resetQueryClient = () => {
  console.log("🔄 Resetting query client...");
  queryClient.clear();
  queryClient.resetQueries();
};

export { queryClient };
export default queryClient;
