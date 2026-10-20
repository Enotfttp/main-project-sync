import { mapResultType, TResultType } from "../../model";
import { Tag, TagKind } from "@admiral-ds/react-ui";
import { FC } from "react";

const resultTypeKind: Record<TResultType, TagKind> = {
  OPERATION_SUCCESS: "success",
  OPERATION_DECLINE: "danger",
  CARD_INDEX_PLAN: "primary",
  CARD_INDEX_DONE: "warning",
  ANNULMENT: "warning",
  CANCELLATION: "danger",
};

interface RResultTypeTagProps {
  status?: TResultType;
}

export const ResultTypeTag: FC<RResultTypeTagProps> = ({ status }) => {
  if (!status) {
    return null;
  }

  return <Tag kind={resultTypeKind[status]}>{mapResultType(status)}</Tag>;
};
