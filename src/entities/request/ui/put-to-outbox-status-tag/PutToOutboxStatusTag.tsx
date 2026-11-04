import { mapPutToOutboxStatus, TPutToOutboxStatus } from "../../model";
import { TagKind } from "@admiral-ds/react-ui";
import { StatusTag } from "@shared/ui";
import { FC } from "react";

const resultTypeKind: Record<TPutToOutboxStatus, TagKind> = {
  NEW: "neutral",
  IN_PROGRESS: "primary",
  DONE: "success",
  ERROR: "warning",
  NOT_SUPPORTED: "danger",
};

interface IPutToOutboxStatusTagProps {
  status?: TPutToOutboxStatus;
}

export const PutToOutboxStatusTag: FC<IPutToOutboxStatusTagProps> = ({
  status,
}) => {
  if (!status) {
    return null;
  }

  return (
    <StatusTag kind={resultTypeKind[status]}>
      {mapPutToOutboxStatus(status)}
    </StatusTag>
  );
};
