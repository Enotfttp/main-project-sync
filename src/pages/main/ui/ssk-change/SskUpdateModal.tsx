import { FieldControl } from "./SskChange.styled";
import { SskFormModal } from "./SskFormModal";
import {
  ACCOUNT_CODE_LENGTH,
  digitsOnly,
  TSskUpdateForm,
  validateSskUpdate,
} from "./validate";
import {
  DocumentsAccountDetailSolid,
  ServiceInfoSolid,
} from "@admiral-ds/icons";
import { useUpdateCorrectionalScenario } from "@entities/correctional-scenario/api/hook";
import { ICorrectionalScenario } from "@entities/correctional-scenario/model/types";
import { normalizedDate } from "@shared/lib";
import { InfoRow, InputFieldUI, SectionInfo } from "@shared/ui";
import { ComponentProps, FC } from "react";

const INITIAL_VALUES: TSskUpdateForm = {
  iterimAccountId: "",
  iterimAccountCode: "",
  accrueAccountId: "",
  accrueAccountCode: "",
};

const ACCOUNTS = [
  {
    title: "Счёт 47422",
    idName: "iterimAccountId",
    codeName: "iterimAccountCode",
  },
  {
    title: "Счёт 47423",
    idName: "accrueAccountId",
    codeName: "accrueAccountCode",
  },
] as const;

const AccountInput = (props: ComponentProps<typeof InputFieldUI>) => (
  <FieldControl>
    <InputFieldUI
      {...props}
      dimension="m"
      displayCharacterCounter={false}
      autoComplete="off"
    />
  </FieldControl>
);

interface ISskUpdateModalProps {
  scenario: ICorrectionalScenario;
  onClose: () => void;
}

export const SskUpdateModal: FC<ISskUpdateModalProps> = ({
  scenario,
  onClose,
}) => {
  const { mutateAsync } = useUpdateCorrectionalScenario();
  const { accountInfo } = scenario;

  return (
    <SskFormModal
      title="Обновление счёта"
      dimension="xl"
      submitText="Обновить"
      initialValues={INITIAL_VALUES}
      validate={validateSskUpdate}
      onClose={onClose}
      onSubmit={async (values) => {
        await mutateAsync({
          id: scenario.id,
          fields: { ...accountInfo, ...values },
        });
        onClose();
      }}
    >
      <SectionInfo title="Основная информация" icon={<ServiceInfoSolid />}>
        <InfoRow label="Номер счёта ССК">{scenario.accountCode}</InfoRow>
        <InfoRow label="Последняя дата обновления записи">
          {normalizedDate(scenario.updatedAt)}
        </InfoRow>
      </SectionInfo>

      {ACCOUNTS.map(({ title, idName, codeName }) => (
        <SectionInfo
          key={title}
          title={title}
          icon={<DocumentsAccountDetailSolid />}
        >
          <InfoRow label="Старый идентификатор">
            {accountInfo[`${idName}Old`]}
          </InfoRow>
          <InfoRow label="Новый идентификатор">
            <AccountInput
              name={idName}
              placeholder="Введите новый идентификатор"
              type="uuid"
            />
          </InfoRow>
          <InfoRow label="Старый номер">
            {accountInfo[`${codeName}Old`]}
          </InfoRow>
          <InfoRow label="Новый номер">
            <AccountInput
              name={codeName}
              placeholder="Введите новый номер"
              maxLength={ACCOUNT_CODE_LENGTH}
              parse={digitsOnly}
            />
          </InfoRow>
        </SectionInfo>
      ))}
    </SskFormModal>
  );
};
