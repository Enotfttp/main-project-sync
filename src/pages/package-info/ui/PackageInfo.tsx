import { ServiceInfoSolid, SystemTuneSolid } from "@admiral-ds/icons";
import { Button } from "@admiral-ds/react-ui";
import { useGetPackage } from "@entities/package/api/hook";
import { PackageStatusTag } from "@entities/package/ui";
import { normalizedDate, resolveChildPath } from "@shared/lib";
import { InfoRow, SectionInfo } from "@shared/ui";
import { FC } from "react";
import { useLocation, useNavigate } from "react-router-dom";

interface IProps {
  id: UUID;
}
export const PackageInfo: FC<IProps> = ({ id }) => {
  const { data } = useGetPackage(id);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const documentPath = resolveChildPath(pathname, "document");

  const redirectToDocumentPage = () => {
    if (documentPath) navigate(documentPath);
  };

  if (!data) return;

  return (
    <>
      <SectionInfo title="Основная информация" icon={<ServiceInfoSolid />}>
        <InfoRow label="Номер пакета">{data?.packageSubscriptionId}</InfoRow>
        <InfoRow label="Наименование  пакета">{data.packageName}</InfoRow>
        <InfoRow label="Статус пакета">
          <PackageStatusTag status={data.packageStatus} />
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
        <InfoRow label="Номер счёта по которому оказана услуга">
          {data.accountNumber}
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
