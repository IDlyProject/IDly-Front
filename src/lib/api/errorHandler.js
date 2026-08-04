export function getErrorMessage(error, fallback = "요청 처리 중 오류가 발생했습니다.") {
  if (error?.response?.data?.message) return error.response.data.message;
  if (error?.message) return error.message;
  return fallback;
}
