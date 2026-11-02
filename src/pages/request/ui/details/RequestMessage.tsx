import { Modal } from "./Modal";
import { SystemArrowLeftOutline } from "@admiral-ds/icons";
import { Button, TextButton } from "@admiral-ds/react-ui";
import { useGetRequestContent } from "@entities/request/api/hook";
import { MessageText } from "@shared/ui";
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
  <Modal
    isOpen
    onClose={onClose}
    dimension="xl"
    title="Сообщение"
    header={
      <TextButton
        type="button"
        dimension="s"
        text="Назад"
        iconStart={<SystemArrowLeftOutline />}
        onClick={onClose}
      />
    }
    actions={<MessageActions id={id} onClose={onClose} />}
  >
    <MessageContent id={id} />
  </Modal>
);
