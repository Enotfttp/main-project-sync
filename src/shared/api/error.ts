export interface ApiError {
  response?: {
    data?: {
      error?: string;
      message?: string;
      code?: number;
    };
    status?: number;
    statusText?: string;
  };
  message?: string;
  code?: string;
  name?: string;
}

export interface ValidationError {
  field: string;
  message: string;
}

export interface ApiResponseError {
  errors?: ValidationError[];
  error?: string;
  message?: string;
}

const DEFAULT_ERROR_MESSAGE = "Не удалось выполнить запрос. Попробуйте ещё раз";

/**
 * Текст ошибки для пользователя. Берём сообщение бэкенда, иначе показываем
 * общий текст — сообщения axios на английском выводить не нужно.
 */
export const getErrorMessage = (error: unknown): string => {
  const { response } = (error ?? {}) as ApiError;

  return (
    response?.data?.message ?? response?.data?.error ?? DEFAULT_ERROR_MESSAGE
  );
};

export const getErrorStatus = (error: unknown): number => {
  const status = (error as ApiError | undefined)?.response?.status;

  return typeof status === "number" ? status : 500;
};
