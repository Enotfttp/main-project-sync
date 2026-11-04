import { ModalButtonBlock } from "./RequestDetailds.styled";
import { RequestMessage } from "./RequestMessage";
import { Button, Link } from "@admiral-ds/react-ui";
import { routesPath } from "@app/routes";
import { useGetRequest } from "@entities/request/api/hook";
import { mapEventType, mapResultType } from "@entities/request/model";
import { RequestStatusTag } from "@entities/request/ui";
import { Modal } from "@features/modal";
import { normalizedDate } from "@shared/lib";
import { InfoRow, Rows, SectionTitle } from "@shared/ui";
import { FC, useEffect, useState } from "react";
import {
  generatePath,
  Link as RouterLink,
  useNavigate,
} from "react-router-dom";

interface IProps {
  id: string;
  onClose: () => void;
}

const RequestInfo: FC<{ id: string; onOpenMessage: () => void }> = ({
  id,
  onOpenMessage,
}) => {
  const { data } = useGetRequest(id as UUID);

  return (
    <Rows>
      <SectionTitle title="Основная информация" />
      <InfoRow label="Идентификатор запроса">{data.requestId}</InfoRow>
      <InfoRow label="Идентификатор графика оплат">
        <Link
          as={RouterLink}
          to={`${routesPath.schedule.root}/${data.scheduleSourceGuid}`}
          dimension="s"
          appearance="primary"
        >
          {data.scheduleSourceGuid}
        </Link>
      </InfoRow>
      <InfoRow label="Идентификатор пакета услуг">
        <Link
          as={RouterLink}
          to={`${routesPath.package.root}/${data.packageSubscriptionId}`}
          dimension="s"
          appearance="primary"
        >
          {data.packageSubscriptionId}
        </Link>
      </InfoRow>
      <InfoRow label="Дата поступления запроса">
        {normalizedDate(data.requestDate)}
      </InfoRow>
      <InfoRow label="Дата создания запроса в ТиПП">
        {normalizedDate(data.requestCreated)}
      </InfoRow>
      <InfoRow label="Тип события">{mapEventType(data.eventType)}</InfoRow>
      <InfoRow label="Статус запроса">
        <RequestStatusTag status={data.requestStatus} />
      </InfoRow>
      <InfoRow label="Результат обработки запроса">
        {data.resultType ? mapResultType(data.resultType) : null}
      </InfoRow>
      <InfoRow label="Номер счёта ССК">{data.accountCode}</InfoRow>
      <InfoRow label="Сообщение">
        <Button
          type="button"
          appearance="secondary"
          dimension="s"
          onClick={onOpenMessage}
        >
          Посмотреть
        </Button>
      </InfoRow>
      <SectionTitle title="Ошибки и логи" />
      <InfoRow label="Код ошибки">{data?.errorCode}</InfoRow>
      <InfoRow label="Текст ошибки">{data?.errorMessage}</InfoRow>
      <InfoRow label="Дата создания записи">
        {normalizedDate(data.createdAt)}
      </InfoRow>
      <InfoRow label="Дата обновления записи">
        {normalizedDate(data.updatedAt)}
      </InfoRow>
    </Rows>
  );
};

export const RequestDetails: FC<IProps> = ({ id, onClose }) => {
  const navigate = useNavigate();

  const [isMessageOpen, setMessageOpen] = useState(false);

  const handleRedirect = () => {
    navigate(generatePath(routesPath.request.detail.history.root, { id }));
  };

  useEffect(() => {
    setMessageOpen(false);
  }, [id]);

  return (
    <>
      <Modal
        isOpen
        onClose={onClose}
        dimension="xl"
        title={routesPath.request.detail.label}
        actions={
          <ModalButtonBlock>
            <Button
              type="button"
              appearance="primary"
              dimension="m"
              onClick={handleRedirect}
            >
              Получить историю запроса
            </Button>
            <Button
              type="button"
              appearance="secondary"
              dimension="m"
              onClick={onClose}
            >
              Закрыть
            </Button>
          </ModalButtonBlock>
        }
      >
        <RequestInfo id={id} onOpenMessage={() => setMessageOpen(true)} />
      </Modal>
      {isMessageOpen && (
        <RequestMessage id={id} onClose={() => setMessageOpen(false)} />
      )}
    </>
  );
};
