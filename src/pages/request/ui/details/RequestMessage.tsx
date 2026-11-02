import { MessageText } from "./RequestDetails.styled";
import { Button } from "@admiral-ds/react-ui";
import { ErrorBoundary } from "@app/errorBoundary/ErrorBoundary";
import { useGetRequestContent } from "@entities/request/api/hook";
import { Modal } from "@shared/ui";
import { FC } from "react";

interface IProps {
  id: string;
  onClose: () => void;
}

const MessageContent: FC<{ id: string }> = ({ id }) => {
  const { data } = useGetRequestContent(id as UUID);

  return <MessageText>{data.content}</MessageText>;
};

const MessageActions: FC<IProps> = ({ id, onClose }) => {
  const { data } = useGetRequestContent(id as UUID);

  return (
    <>
      <Button
        type="button"
        appearance="primary"
        dimension="m"
        disabled={!data.content}
        onClick={() => {
          if (data.content) void navigator.clipboard.writeText(data.content);
        }}
      >
        Скопировать
      </Button>
      <Button
        type="button"
        appearance="secondary"
        dimension="m"
        onClick={onClose}
      >
        Закрыть
      </Button>
    </>
  );
};

export const RequestMessage: FC<IProps> = ({ id, onClose }) => (
  <ErrorBoundary onClose={onClose}>
    <Modal isOpen setClose={onClose} dimension="xl" title="Сообщение">
      {{
        contentChildren: <MessageContent id={id} />,
        btnChildren: <MessageActions id={id} onClose={onClose} />,
      }}
    </Modal>
  </ErrorBoundary>
);
