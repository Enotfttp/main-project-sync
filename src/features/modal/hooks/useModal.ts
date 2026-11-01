import { useCallback } from "react";
import { useSearchParams } from "react-router-dom";

const RECORD_PARAM = "id";

export const useModal = (param = RECORD_PARAM) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const id = searchParams.get(param) ?? undefined;

  const open = useCallback(
    (recordId: string) => {
      setSearchParams((prev) => {
        const next = new URLSearchParams(prev);
        next.set(param, recordId);
        return next;
      });
    },
    [param, setSearchParams],
  );

  const close = useCallback(() => {
    setSearchParams(
      (prev) => {
        const next = new URLSearchParams(prev);
        next.delete(param);
        return next;
      },
      { replace: true },
    );
  }, [param, setSearchParams]);

  return {
    id,
    isOpen: Boolean(id),
    open,
    close,
  };
};
