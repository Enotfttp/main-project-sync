import { mapResultType, TResultType } from "../../model";
import { TagKind } from "@admiral-ds/react-ui";
import { StatusTag } from "@shared/ui";
import { FC } from "react";

const resultTypeKind: Record<TResultType, TagKind> = {
  ITERIM_ACCOUNT: "primary",
  BANK_INCOME_ACCOUNT: "success",
  ANNULMENT: "warning",
};

interface ResultTypeTagProps {
  status?: TResultType;
}

export const ResultTypeTag: FC<ResultTypeTagProps> = ({ status }) => {
  if (!status) {
    return null;
  }

  return (
    <StatusTag kind={resultTypeKind[status]}>{mapResultType(status)}</StatusTag>
  );
};
