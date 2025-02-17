export function formatResponse<T>(
  message: string,
  data: T,
  success: boolean = true,
) {
  return {
    success,
    message,
    data,
    timestamp: new Date().toISOString(),
  };
} 