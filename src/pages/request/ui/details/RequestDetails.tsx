import { RequestMessage } from "./RequestMessage";
import { Button, Link } from "@admiral-ds/react-ui";
import { ErrorBoundary } from "@app/errorBoundary/ErrorBoundary";
import { routesPath } from "@app/providers";
import { useGetRequest } from "@entities/request/api/hook";
import { mapEventType, mapResultType } from "@entities/request/model";
import { RequestStatusTag } from "@entities/request/ui";
import { normalizedDate } from "@shared/lib";
import { InfoRow, Modal, Rows, SectionTitle } from "@shared/ui";
import { FC, useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";

interface IProps {
  id: string;
  onClose: () => void;
}

const RequestInfo: FC<{ id: string; onOpenMessage: () => void }> = ({
  id,
  onOpenMessage,
}) => {
  const { data } = useGetRequest(id as UUID);
  const info = data.requestInfo;

  return (
    <Rows>
      <SectionTitle title="Основная информация" />
      <InfoRow label="Идентификатор запроса">{info.requestId}</InfoRow>
      <InfoRow label="Идентификатор графика оплат">
        <Link
          as={RouterLink}
          to={`${routesPath.schedule.root}/${info.scheduleSourceGuid}`}
          dimension="s"
          appearance="primary"
        >
          {info.scheduleSourceGuid}
        </Link>
      </InfoRow>
      <InfoRow label="Идентификатор пакета услуг">
        <Link
          as={RouterLink}
          to={`${routesPath.package.root}/${info.packageSubscriptionId}`}
          dimension="s"
          appearance="primary"
        >
          {info.packageSubscriptionId}
        </Link>
      </InfoRow>
      <InfoRow label="Дата поступления запроса">
        {normalizedDate(info.requestDate)}
      </InfoRow>
      <InfoRow label="Дата создания запроса в ТиПП">
        {normalizedDate(info.requestCreated)}
      </InfoRow>
      <InfoRow label="Тип события">{mapEventType(info.eventType)}</InfoRow>
      <InfoRow label="Статус запроса">
        <RequestStatusTag status={info.requestStatus} />
      </InfoRow>
      <InfoRow label="Результат обработки запроса">
        {info.resultType ? mapResultType(info.resultType) : null}
      </InfoRow>
      <InfoRow label="Номер счёта ССК">{info.accountCode}</InfoRow>
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
      <InfoRow label="Код ошибки">{data.errorInfo?.errorCode}</InfoRow>
      <InfoRow label="Текст ошибки">{data.errorInfo?.errorMessage}</InfoRow>
      <InfoRow label="Дата создания записи">
        {normalizedDate(info.createdAt)}
      </InfoRow>
      <InfoRow label="Дата обновления записи">
        {normalizedDate(info.updatedAt)}
      </InfoRow>
    </Rows>
  );
};

export const RequestDetails: FC<IProps> = ({ id, onClose }) => {
  const [isMessageOpen, setMessageOpen] = useState(false);

  useEffect(() => {
    setMessageOpen(false);
  }, [id]);

  return (
    <ErrorBoundary onClose={onClose}>
      <Modal
        isOpen
        onClose={onClose}
        dimension="xl"
        title={routesPath.request.detail.label}
        actions={
          <Button
            type="button"
            appearance="secondary"
            dimension="m"
            onClick={onClose}
          >
            Закрыть
          </Button>
        }
      >
        <RequestInfo id={id} onOpenMessage={() => setMessageOpen(true)} />
      </Modal>
      {isMessageOpen && (
        <RequestMessage id={id} onClose={() => setMessageOpen(false)} />
      )}
    </ErrorBoundary>
  );
};
