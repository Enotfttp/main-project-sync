import { SskFormModal } from "./SskFormModal";
import { ACCOUNT_CODE_LENGTH, digitsOnly, validateSskSearch } from "./validate";
import { useFindCorrectionalScenario } from "@entities/correctional-scenario/api/hook";
import { ICorrectionalScenario } from "@entities/correctional-scenario/model/types";
import { InputFieldUI } from "@shared/ui";
import { FC } from "react";

interface ISskSearchModalProps {
  onClose: () => void;
  onFound: (scenario: ICorrectionalScenario) => void;
}

export const SskSearchModal: FC<ISskSearchModalProps> = ({
  onClose,
  onFound,
}) => {
  const { mutateAsync } = useFindCorrectionalScenario();

  return (
    <SskFormModal
      title="Смена ССК"
      dimension="m"
      submitText="Найти"
      initialValues={{ accountCode: "" }}
      validate={validateSskSearch}
      onClose={onClose}
      onSubmit={async ({ accountCode }) => {
        onFound(await mutateAsync({ accountCode }));
      }}
    >
      <InputFieldUI
        name="accountCode"
        label="Номер счёта ССК"
        placeholder="Введите номер счёта"
        maxLength={ACCOUNT_CODE_LENGTH}
        parse={digitsOnly}
        dimension="m"
        displayCharacterCounter={false}
        autoComplete="off"
      />
    </SskFormModal>
  );
};
