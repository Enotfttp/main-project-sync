import { mapRequestStatus, TRequestStatus } from "../../model";
import { Tag, TagKind } from "@admiral-ds/react-ui";
import { FC } from "react";

const requestStatusKind: Record<TRequestStatus, TagKind> = {
  CREATED: "neutral",
  ACCEPTED: "warning",
  REJECTED: "danger",
  PROCESSED: "primary",
  COMPLETED: "success",
  ERROR: "danger",
};

interface RequestStatusTagProps {
  status?: TRequestStatus;
}

export const RequestStatusTag: FC<RequestStatusTagProps> = ({ status }) => {
  if (!status) {
    return null;
  }

  return <Tag kind={requestStatusKind[status]}>{mapRequestStatus(status)}</Tag>;
};
