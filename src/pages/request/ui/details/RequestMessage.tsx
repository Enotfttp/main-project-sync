import { SystemArrowLeftOutline } from "@admiral-ds/icons";
import { Button, Spinner, T, TextButton } from "@admiral-ds/react-ui";
import { useGetRequestContent } from "@entities/request/api/hook";
import { MessageText, Modal, State } from "@shared/ui";
import { FC } from "react";

interface IProps {
  id: string;
  onClose: () => void;
}

export const RequestMessage: FC<IProps> = ({ id, onClose }) => {
  const { data, isLoading, isError } = useGetRequestContent(id as UUID);

  const handleCopy = () => {
    if (!data?.content) return;

    void navigator.clipboard.writeText(data.content);
  };

  return (
    <Modal
      isOpen
      onClose={onClose}
      dimension="xl"
      header={
        <TextButton
          type="button"
          dimension="s"
          text="Назад"
          iconStart={<SystemArrowLeftOutline />}
          onClick={onClose}
        />
      }
      title="Сообщение"
      actions={
        <>
          <Button
            type="button"
            appearance="primary"
            dimension="m"
            disabled={!data?.content}
            onClick={handleCopy}
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
      }
    >
      {isError ? (
        <T font="Body/Body 2 Long" color="Error/Error 60 Main">
          Не удалось получить сообщение
        </T>
      ) : isLoading || !data ? (
        <State>
          <Spinner dimension="m" />
        </State>
      ) : (
        <MessageText>{data.content}</MessageText>
      )}
    </Modal>
  );
};
