import { ModalButtonBlock } from "./ScheduleDetails.styled";
import {
  CategoryWorkSolid,
  ServiceHelpSolid,
  ServiceInfoSolid,
  SystemTuneSolid,
} from "@admiral-ds/icons";
import { Button, Link } from "@admiral-ds/react-ui";
import { routesPath } from "@app/routes";
import { useGetSchedule } from "@entities/schedule/api/hook";
import { mapEventType, mapProcessCode } from "@entities/schedule/model";
import { ScheduleStatusTag } from "@entities/schedule/ui";
import { Modal } from "@features/modal";
import { normalizedDate } from "@shared/lib";
import { InfoRow, SectionInfo } from "@shared/ui";
import { FC } from "react";
import {
  generatePath,
  Link as RouterLink,
  useNavigate,
} from "react-router-dom";

interface IProps {
  id: string;
  onClose: () => void;
}

const ScheduleInfo: FC<{ id: string }> = ({ id }) => {
  const { data } = useGetSchedule(id as UUID);

  if (!data) return;

  return (
    <>
      <SectionInfo title="Основная информация" icon={<ServiceInfoSolid />}>
        <InfoRow label="Идентификатор графика">
          {data?.scheduleSourceGuid}
        </InfoRow>
        <InfoRow label="Дата создания графика в ТиПП">
          {data.scheduleCreatedAt}
        </InfoRow>
        <InfoRow label="Статус графика">
          <ScheduleStatusTag status={data.scheduleStatus} />
        </InfoRow>
        <InfoRow label="Приоритет">{data.priority}</InfoRow>
        <InfoRow label="Тип события">{mapEventType(data.eventType)}</InfoRow>
        <InfoRow label="Счёт списания комиссий (ССК)">
          {data.accountCode}
        </InfoRow>
        <InfoRow label="Валюта счёта списания ССК">
          {data.currencyAccount}
        </InfoRow>
        {!!data?.processCode && (
          <InfoRow label="Код управлющего признака">
            {mapProcessCode(data.processCode)}
          </InfoRow>
        )}
        <InfoRow label="ТБИ">{data.tbi}</InfoRow>
      </SectionInfo>

      <SectionInfo
        title="Информация по пакету услуг"
        icon={<ServiceHelpSolid />}
      >
        <InfoRow label="Идентификатор">
          <Link
            as={RouterLink}
            to={`${routesPath.schedule.root}/${data.scheduleSourceGuid}`}
            dimension="s"
            appearance="primary"
          >
            {data.scheduleSourceGuid}
          </Link>
        </InfoRow>

        <InfoRow label="Наименование">{data.packageInfo.name}</InfoRow>
        <InfoRow label="Номер">{data.packageInfo.trfNumber}</InfoRow>
      </SectionInfo>
      <SectionInfo
        title="Информация по дополнительной опции"
        icon={<ServiceHelpSolid />}
      >
        <InfoRow label="Идентификатор">
          <Link
            as={RouterLink}
            to={`${routesPath.schedule.root}/${data.scheduleSourceGuid}`}
            dimension="s"
            appearance="primary"
          >
            {data.scheduleSourceGuid}
          </Link>
        </InfoRow>
        <InfoRow label="Наименование">{data.optionInfo?.name}</InfoRow>
        <InfoRow label="Номер">{data.optionInfo?.trfNumber}</InfoRow>
      </SectionInfo>

      <SectionInfo title="Комиссии и суммы, RUB" icon={<CategoryWorkSolid />}>
        <InfoRow label="Общая сумма комиссии, с НДС">
          {data.paymentInfo.amountFullNdsCur}
        </InfoRow>
        <InfoRow label="Общая сумма комиссии, без НДС">
          {data.paymentInfo.amountFullCur}
        </InfoRow>
        <InfoRow label="Сумма НДС, в валюте тарифа">
          {data.paymentInfo.amountNdsCur}
        </InfoRow>
        <InfoRow label="Ставка НДС">{data.paymentInfo.vatRate}</InfoRow>
        <InfoRow label="Дата начала списания комиссии">
          {normalizedDate(data.paymentInfo?.startDate)}
        </InfoRow>
        <InfoRow label="Дата окончания списания комиссии">
          {normalizedDate(data.paymentInfo?.endDate)}
        </InfoRow>
      </SectionInfo>

      <SectionInfo title="Технические поля" icon={<SystemTuneSolid />}>
        <InfoRow label="Дата создания записи">
          {normalizedDate(data.createdAt)}
        </InfoRow>
        <InfoRow label="Дата обновления записи">
          {normalizedDate(data.updatedAt)}
        </InfoRow>
        <InfoRow label="Флаг необходимости обновления приоритета">
          {data.requiresPriorityChange}
        </InfoRow>
      </SectionInfo>
    </>
  );
};

export const ScheduleDetails: FC<IProps> = ({ id, onClose }) => {
  const navigate = useNavigate();

  const handleRedirect = () => {
    navigate(
      generatePath(routesPath.schedule.detail.period.root, { idPeriod: id }),
    );
  };

  return (
    <>
      <Modal
        isOpen
        onClose={onClose}
        dimension="xl"
        title={routesPath.schedule.detail.label}
        actions={
          <ModalButtonBlock>
            <Button
              type="button"
              appearance="primary"
              dimension="m"
              onClick={handleRedirect}
            >
              Получить информацию по периодам
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
        <ScheduleInfo id={id} />
      </Modal>
    </>
  );
};
