// import {endpoint} from "../../../index";

/**
 * Создает полный URL для MSW handlers
 */
export const createMockUrl = (path) => {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${import.meta.env.VITE_API_BASE_URL}${normalizedPath}`;
};

/**
 * Создает URL для API endpoints
 */
export const createApiUrl = (endpoint) => {
  return createMockUrl(endpoint);
};
