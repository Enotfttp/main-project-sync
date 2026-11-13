import { ModalButtonBlock } from "./DocumentDetails.styled";
import {
  DocumentsAccountDetailOutline,
  FinancePercentSolid,
  ServiceInfoSolid,
  ServicePlusCircleSolid,
  SystemTuneSolid,
} from "@admiral-ds/icons";
import { Button, IconButton } from "@admiral-ds/react-ui";
import { routesPath } from "@app/routes";
import { useGetDocument } from "@entities/document/api/hook";
import { Modal } from "@features/modal";
import { normalizedDate, resolveChildPath } from "@shared/lib";
import { InfoRow, SectionInfo } from "@shared/ui";
import React, { FC } from "react";
import { useLocation, useNavigate } from "react-router-dom";

interface IProps {
  id: string;
  onClose: () => void;
}

const DocumentInfo: FC<{ id: UUID }> = ({ id }) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const { data } = useGetDocument(id);

  const documentUnionPath = resolveChildPath(pathname, "document", {
    idOption: id,
  });

  const handleRedirect = () => {
    if (documentUnionPath) navigate(documentUnionPath);
  };

  if (!data) return;

  const {
    payerInfo,
    payerBankInfo,
    beneficiaryInfo,
    beneficiaryBankInfo,
    currencyOperationInfo,
    utilityInfo,
    vatDocument,
    additionalCodeInfo,
    technicalInfo,
  } = data;

  return (
    <>
      <SectionInfo title="Основная информация" icon={<ServiceInfoSolid />}>
        <InfoRow label="Идентификатор документа">{data?.documentId}</InfoRow>
        <InfoRow label="Номер документа">{data.documentLabel}</InfoRow>
        <InfoRow label="Дата документа">
          {normalizedDate(data.documentDate)}
        </InfoRow>
        <InfoRow label="Вид документа">
          {data.documentType}
          {data.documentMerged && (
            <IconButton
              dimension="m"
              appearance="primary"
              onClick={handleRedirect}
            >
              <DocumentsAccountDetailOutline />
            </IconButton>
          )}
        </InfoRow>
        <InfoRow label="Управляющий признак">
          {data.documentProcessCode}
        </InfoRow>
        <InfoRow label="Вкус">{data.vkus}</InfoRow>
        <InfoRow label="Статус документа">{data.documentStatus}</InfoRow>
        <InfoRow label="Статус исполнения РОЮЛ">{data.orderStatus}</InfoRow>
        <InfoRow label="Код филиала обработки документа">
          {data.processingBranchCode}
        </InfoRow>
        <InfoRow label="Код подразделения счёта">
          {data.processingDepartmentCode}
        </InfoRow>
      </SectionInfo>

      <SectionInfo title="Данные плательщика" icon={<ServiceInfoSolid />}>
        <InfoRow label="Наименование клиента">{payerInfo?.name}</InfoRow>
        <InfoRow label="Идентификатор счёта">{payerInfo.accountId}</InfoRow>
        <InfoRow label="Номер счёта ССК">{payerInfo.accountId}</InfoRow>
        <InfoRow label="Валюта счёта ССК">{payerInfo?.currencyAccount}</InfoRow>
        <InfoRow label="Код филиала счёта">
          {payerInfo.accountBranchCode}
        </InfoRow>
        <InfoRow label="Подразделение счёта">
          {payerInfo?.accountDepartmentCode}
        </InfoRow>
        <InfoRow label="Код МДМ">{payerInfo.mdmCode}</InfoRow>
        <InfoRow label="ИНН">{payerInfo.inn}</InfoRow>
        <InfoRow label="КПП">{payerInfo.kpp}</InfoRow>
      </SectionInfo>

      <SectionInfo
        title="Реквизиты банка плательщика"
        icon={<ServiceInfoSolid />}
      >
        <InfoRow label="Наименование Банка">{payerBankInfo?.name}</InfoRow>
        <InfoRow label="Корреспондентский счет">
          {payerBankInfo.corrAccount}
        </InfoRow>
        <InfoRow label="БИК Банка">{payerBankInfo.bic}</InfoRow>
      </SectionInfo>

      {beneficiaryInfo && (
        <SectionInfo title="Данные получателя" icon={<ServiceInfoSolid />}>
          <InfoRow label="Наименование клиента">
            {beneficiaryInfo?.name}
          </InfoRow>
          <InfoRow label="Идентификатор счёта">
            {beneficiaryInfo.accountId}
          </InfoRow>
          <InfoRow label="Номер счёта ССК">
            {beneficiaryInfo.accountCode}
          </InfoRow>
          <InfoRow label="Валюта счёта ССК">
            {beneficiaryInfo.currencyAccount}
          </InfoRow>
          <InfoRow label="Код филиала счёта">
            {beneficiaryInfo?.accountBranchCode}
          </InfoRow>
          <InfoRow label="Подразделение счёта">
            {beneficiaryInfo?.accountDepartmentCode}
          </InfoRow>
          <InfoRow label="Код МДМ">{beneficiaryInfo?.mdmCode}</InfoRow>
          <InfoRow label="ИНН">{beneficiaryInfo.inn}</InfoRow>
          <InfoRow label="КПП">{beneficiaryInfo?.kpp}</InfoRow>
        </SectionInfo>
      )}

      {beneficiaryBankInfo && (
        <SectionInfo
          title="Реквизиты банка получателя"
          icon={<ServiceInfoSolid />}
        >
          <InfoRow label="Наименование Банка">
            {beneficiaryBankInfo?.name}
          </InfoRow>
          <InfoRow label="Корреспондентский счет">
            {beneficiaryBankInfo.corrAccount}
          </InfoRow>
          <InfoRow label="БИК Банка">{beneficiaryBankInfo.bic}</InfoRow>
        </SectionInfo>
      )}
      {currencyOperationInfo && (
        <SectionInfo
          title="Данные о валютной операции"
          icon={<ServiceInfoSolid />}
        >
          <InfoRow label="Сумма платежа, руб.">
            {currencyOperationInfo.amountFullCur}
          </InfoRow>
          <InfoRow label="Код валюты">{currencyOperationInfo.currency}</InfoRow>
          <InfoRow label="Тип курса">{currencyOperationInfo?.rateType}</InfoRow>
          <InfoRow label="Курс валюты">{currencyOperationInfo.rate}</InfoRow>
          <InfoRow label="Сумма комиссии в рублях">
            {currencyOperationInfo?.sumComRub}
          </InfoRow>
          <InfoRow label="Сумма НДС в рублях">
            {currencyOperationInfo?.sumNDSRub}
          </InfoRow>
          <InfoRow label="ТБИ">{currencyOperationInfo?.tbi}</InfoRow>
        </SectionInfo>
      )}

      <SectionInfo title="Данные об услуге" icon={<ServiceInfoSolid />}>
        <InfoRow label="Общая сумма услуги в валюте тарифа с НДС">
          {utilityInfo.amountFullCur}
        </InfoRow>
        <InfoRow label="Сумма в валюте тарифа без НДС">
          {utilityInfo?.amountCur}
        </InfoRow>
        <InfoRow label="Валюта тарифа">{utilityInfo?.currencyAccount}</InfoRow>
        <InfoRow label="Наименование услуги">{utilityInfo.nameTs}</InfoRow>
        <InfoRow label="Назначение платежа">{utilityInfo.purpose}</InfoRow>
        <InfoRow label="Код услуги">{utilityInfo.codeTs}</InfoRow>
        <InfoRow label="Шаблон">{utilityInfo.vkusPattern}</InfoRow>
      </SectionInfo>

      {vatDocument && (
        <SectionInfo title="Данные о НДС" icon={<FinancePercentSolid />}>
          <InfoRow label="Ставка НДС">{vatDocument?.vatRate}</InfoRow>
          <InfoRow label="Сумма НДС в валюте тарифа">
            {vatDocument.amountNdsCur}
          </InfoRow>
          <InfoRow label="Назначение платежа для документа НДС">
            {vatDocument.purposeNds}
          </InfoRow>
        </SectionInfo>
      )}

      {additionalCodeInfo && (
        <SectionInfo
          title="Доплнительные параметры"
          icon={<ServicePlusCircleSolid />}
        >
          <InfoRow label="Идентификатор счёта 47423 ">
            {additionalCodeInfo?.accrueAccountId}
          </InfoRow>
          <InfoRow label="Номер счёта 47423">
            {additionalCodeInfo?.accrueAccountCode}
          </InfoRow>
          <InfoRow label="Идентификатор договора">
            {additionalCodeInfo?.productInstanceId}
          </InfoRow>
          <InfoRow label="Идентификатор родительского документа">
            {additionalCodeInfo?.parentDocId}
          </InfoRow>
          <InfoRow label="Срок исполнения распоряжения в очереди">
            {additionalCodeInfo?.pkgQueueCompleteDate}
          </InfoRow>
        </SectionInfo>
      )}

      <SectionInfo title="Технические поля" icon={<SystemTuneSolid />}>
        <InfoRow label="Дата создания записи">
          {normalizedDate(technicalInfo.createdAt)}
        </InfoRow>
        <InfoRow label="Дата обновления записи">
          {normalizedDate(technicalInfo.updatedAt)}
        </InfoRow>
      </SectionInfo>
    </>
  );
};

export const DocumentDetails: FC<IProps> = ({ id, onClose }) => {
  return (
    <Modal
      isOpen
      onClose={onClose}
      dimension="xl"
      title={routesPath.package.detail.option.detail.document.detail.label}
      actions={
        <ModalButtonBlock>
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
      <DocumentInfo id={id} />
    </Modal>
  );
};
