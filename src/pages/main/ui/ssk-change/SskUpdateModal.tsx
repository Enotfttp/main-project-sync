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
import {
  IAccountInfo,
  ICorrectionalScenario,
  TCorrectionRequestStatus,
} from "@entities/correctional-scenario/model/types";
import { normalizedDate } from "@shared/lib";
import {
  InfoRow,
  InputFieldUI,
  SectionInfo,
  StatusModal,
  TStatusPhase,
} from "@shared/ui";
import { ComponentProps, FC, useRef, useState } from "react";

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

const UPDATED = new Set<TCorrectionRequestStatus>(["PROCESSED", "COMPLETED"]);

const STATUS_TEXT: Record<TStatusPhase, string> = {
  loading: "Данные обновляются...",
  success: "Счёт успешно обновлён",
  error: "Произошла ошибка во время обновления",
};

const toAccountInfo = (
  scenario: ICorrectionalScenario,
  values: TSskUpdateForm,
): IAccountInfo => ({
  accountCode: scenario.accountCode,
  iterimAccountIdOld: scenario.iterimAccountId,
  iterimAccountCodeOld: scenario.iterimAccountCode,
  accrueAccountIdOld: scenario.accrueAccountId,
  accrueAccountCodeOld: scenario.accrueAccountCode,
  ...values,
});

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
  const valuesRef = useRef(INITIAL_VALUES);
  const [phase, setPhase] = useState<TStatusPhase>();

  const run = async (values: TSskUpdateForm) => {
    valuesRef.current = values;
    setPhase("loading");

    try {
      const status = await mutateAsync(toAccountInfo(scenario, values));
      setPhase(UPDATED.has(status) ? "success" : "error");
    } catch {
      setPhase("error");
    }
  };

  return (
    <>
      <SskFormModal
        title="Обновление счёта"
        dimension="xl"
        submitText="Обновить"
        initialValues={INITIAL_VALUES}
        validate={validateSskUpdate}
        onClose={onClose}
        onSubmit={run}
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
            <InfoRow label="Старый идентификатор">{scenario[idName]}</InfoRow>
            <InfoRow label="Новый идентификатор">
              <AccountInput
                name={idName}
                placeholder="Введите новый идентификатор"
                type="uuid"
              />
            </InfoRow>
            <InfoRow label="Старый номер">{scenario[codeName]}</InfoRow>
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
      {phase && (
        <StatusModal
          phase={phase}
          text={STATUS_TEXT[phase]}
          onClose={phase === "success" ? onClose : () => setPhase(undefined)}
          onRetry={() => run(valuesRef.current)}
        />
      )}
    </>
  );
};
