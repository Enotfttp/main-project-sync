import { ModalButtonBlock } from "./PackageDetails.styled";
import { ServiceInfoSolid, SystemTuneSolid } from "@admiral-ds/icons";
import { Button } from "@admiral-ds/react-ui";
import { routesPath } from "@app/routes";
import { useGetPackage } from "@entities/package/api/hook";
import { PackageStatusTag } from "@entities/package/ui";
import { Modal } from "@features/modal";
import { normalizedDate, resolveChildPath } from "@shared/lib";
import { InfoRow, SectionInfo } from "@shared/ui";
import { FC } from "react";
import { generatePath, useLocation, useNavigate } from "react-router-dom";

interface IProps {
  id: string;
  onClose: () => void;
}

const PackageInfo: FC<{ id: UUID }> = ({ id }) => {
  const navigate = useNavigate();
  const { data } = useGetPackage(id);

  const redirectToDocumentPage = () => {
    navigate(generatePath(routesPath.package.detail.document.root));
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

export const PackageDetails: FC<IProps> = ({ id, onClose }) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const optionPath = resolveChildPath(pathname, "option", { id });

  const handleRedirect = () => {
    if (optionPath) navigate(optionPath);
  };

  return (
    <Modal
      isOpen
      onClose={onClose}
      dimension="xl"
      title={routesPath.package.detail.label}
      actions={
        <ModalButtonBlock>
          <Button
            type="button"
            appearance="primary"
            dimension="m"
            onClick={handleRedirect}
          >
            Получить информацию по опциям
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
      <PackageInfo id={id} />
    </Modal>
  );
};
