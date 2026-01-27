import { useModalContext } from "./ModalContext";
import { IModalHistoryConfig, ModalHistoryChange } from "@widgets/Modals";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

interface ModalConfig {
  historyRequestType: IModalHistoryConfig;
}

const modalConfig: ModalConfig = {
  historyRequestType: {
    component: ({ params }) => <ModalHistoryChange {...params} />,
    title: "История изменений",
    customWidth: "70%",
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

      openModal(
        <config.component params={params} />,
        config.title,
        config.customWidth,
      );
    } else {
      closeModal();
    }
  }, [modalName, location.search]);

  return null;
};
