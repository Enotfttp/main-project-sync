import { ServiceInfoSolid, SystemTuneSolid } from "@admiral-ds/icons";
import { Button } from "@admiral-ds/react-ui";
import { useGetOption } from "@entities/option/api/hook";
import { OptionStatusTag } from "@entities/option/ui";
import { normalizedDate, resolveChildPath } from "@shared/lib";
import { InfoRow, SectionInfo } from "@shared/ui";
import { FC } from "react";
import { useLocation, useNavigate } from "react-router-dom";

interface IProps {
  id: UUID;
}
export const OptionInfo: FC<IProps> = ({ id }) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const { data } = useGetOption(id);

  const documentPath = resolveChildPath(pathname, "document");

  const redirectToDocumentPage = () => {
    if (documentPath) navigate(documentPath);
  };

  if (!data) return;

  return (
    <>
      <SectionInfo title="Основная информация" icon={<ServiceInfoSolid />}>
        <InfoRow label="Номер опции">{data?.optionSubscriptionId}</InfoRow>
        <InfoRow label="Наименование  опции">{data.optionName}</InfoRow>
        <InfoRow label="Статус опции">
          <OptionStatusTag status={data.optionStatus} />
        </InfoRow>
        <InfoRow label="Дата поступления">
          {normalizedDate(data.activationDate)}
        </InfoRow>
        <InfoRow label="Дата отключения">
          {normalizedDate(data.deactivationDate)}
        </InfoRow>
        <InfoRow label="Сумма оплаты">{data.amountFullCur}</InfoRow>
        <InfoRow label="Период оплаты">
          {normalizedDate(data.paymentPeriodFrom)} -{" "}
          {normalizedDate(data.paymentPeriodTo)}
        </InfoRow>

        <InfoRow label="Номер счёта ССК">{data.accountCode}</InfoRow>
        <InfoRow label="Документы">
          <Button
            type="button"
            appearance="secondary"
            dimension="s"
            onClick={redirectToDocumentPage}
          >
            Посмотреть
          </Button>
        </InfoRow>
      </SectionInfo>

      <SectionInfo title="Технические поля" icon={<SystemTuneSolid />}>
        <InfoRow label="Дата создания записи">
          {normalizedDate(data.createdAt)}
        </InfoRow>
        <InfoRow label="Дата обновления записи">
          {normalizedDate(data.updatedAt)}
        </InfoRow>
      </SectionInfo>
    </>
  );
};
