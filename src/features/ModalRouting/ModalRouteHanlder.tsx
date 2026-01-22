import { useModalContext } from "./ModalContext";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

interface ModalConfig {
  [key: string]: {
    component: React.ComponentType<{ params: Record<string, string> }>;
    title: string;
  };
}

const modalConfig: ModalConfig = {
  historyRequestType: {
    component: ({ params }) => <div>Пользователь ID: {params.id}</div>,
    title: "История изменений",
  },
};

export const ModalRouteHandler = () => {
  const location = useLocation();
  const { openModal, closeModal } = useModalContext();
  const searchParams = new URLSearchParams(location.search);
  const modalName = searchParams.get("modal");

  useEffect(() => {
    if (modalName && modalConfig[modalName]) {
      const config = modalConfig[modalName];
      const params = Object.fromEntries(searchParams.entries());

      openModal(<config.component params={params} />, config.title);
    } else {
      closeModal();
    }
  }, [modalName, location.search]);

  return null; // Этот компонент ничего не рендерит
};
