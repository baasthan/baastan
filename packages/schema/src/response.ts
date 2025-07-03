export interface ErrorResponse {
  success: false;
  message: string;
}

export interface SuccessResponse<T> {
  success: true;
  data: T;
}

export type ApiResponse<T> = ErrorResponse | SuccessResponse<T>;
