import {
  CategoryWorkSolid,
  ServiceHelpSolid,
  ServiceInfoSolid,
  SystemTuneSolid,
} from "@admiral-ds/icons";
import { Link } from "@admiral-ds/react-ui";
import { useGetSchedule } from "@entities/schedule/api/hook";
import { mapEventType, mapProcessCode } from "@entities/schedule/model";
import { ScheduleStatusTag } from "@entities/schedule/ui";
import { normalizedDate, resolveChildPath } from "@shared/lib";
import { InfoRow, SectionInfo } from "@shared/ui";
import { FC } from "react";
import { Link as RouterLink, useLocation } from "react-router-dom";

interface IProps {
  id: UUID;
}

export const ScheduleInfo: FC<IProps> = ({ id }) => {
  const { pathname } = useLocation();
  const { data } = useGetSchedule(id as UUID);

  if (!data) return;

  const optionPath = resolveChildPath(pathname, "option", {
    idOption: String(data.packageInfo.packageSubscriptionId),
  });
  const packagePath = resolveChildPath(pathname, "package", {
    idPackage: String(data.packageInfo.packageSubscriptionId),
  });

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
        {packagePath && (
          <InfoRow label="Идентификатор">
            <Link
              as={RouterLink}
              to={packagePath}
              dimension="s"
              appearance="primary"
            >
              {data.packageInfo.packageSubscriptionId}
            </Link>
          </InfoRow>
        )}

        <InfoRow label="Наименование">{data.packageInfo.name}</InfoRow>
        <InfoRow label="Номер">{data.packageInfo.trfNumber}</InfoRow>
      </SectionInfo>
      <SectionInfo
        title="Информация по дополнительной опции"
        icon={<ServiceHelpSolid />}
      >
        {optionPath && (
          <InfoRow label="Идентификатор">
            <Link
              as={RouterLink}
              to={optionPath}
              dimension="s"
              appearance="primary"
            >
              {data.optionInfo?.optionSubscriptionId}
            </Link>
          </InfoRow>
        )}
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
          {data?.requiresPriorityChange ? "Да" : "Нет"}
        </InfoRow>
      </SectionInfo>
    </>
  );
};
