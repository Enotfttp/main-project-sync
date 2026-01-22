import { useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";

interface OpenModalOptions {
  params?: Record<string, string>;
  title?: string;
  preserveExistingParams?: boolean;
}

export const useModalManager = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const openModal = useCallback(
    (modalName: string, options: OpenModalOptions = {}) => {
      const { params = {}, preserveExistingParams = true } = options;

      const searchParams = new URLSearchParams(
        preserveExistingParams ? location.search : "",
      );

      // Устанавливаем параметр модалки
      searchParams.set("modal", modalName);

      // Добавляем дополнительные параметры
      Object.entries(params).forEach(([key, value]) => {
        searchParams.set(key, value);
      });

      navigate({
        pathname: location.pathname,
        search: searchParams.toString(),
      });
    },
    [navigate, location],
  );

  const closeModal = useCallback(
    (options: { preserveParams?: string[] } = {}) => {
      const { preserveParams = ["page", "sort", "filter"] } = options;

      const searchParams = new URLSearchParams(location.search);

      // Удаляем параметр модалки
      searchParams.delete("modal");

      // Сохраняем только указанные параметры
      const preserved: Record<string, string> = {};
      preserveParams.forEach((param) => {
        const value = searchParams.get(param);
        if (value) preserved[param] = value;
      });

      const cleanSearchParams = new URLSearchParams();
      Object.entries(preserved).forEach(([key, value]) => {
        cleanSearchParams.set(key, value);
      });

      navigate(
        {
          pathname: location.pathname,
          search: cleanSearchParams.toString(),
        },
        { replace: true },
      );
    },
    [navigate, location],
  );

  const getModalParam = useCallback(
    (paramName: string): string | null => {
      const searchParams = new URLSearchParams(location.search);
      return searchParams.get(paramName);
    },
    [location],
  );

  const isModalOpen = useCallback(
    (modalName?: string): boolean => {
      const searchParams = new URLSearchParams(location.search);
      const currentModal = searchParams.get("modal");

      if (!modalName) return !!currentModal;
      return currentModal === modalName;
    },
    [location],
  );

  return {
    openModal,
    closeModal,
    getModalParam,
    isModalOpen,
    currentModal: getModalParam("modal"),
  };
};
