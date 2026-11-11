import { mapPeriodStatus, TPeriodStatus } from "../../model";
import { TagKind } from "@admiral-ds/react-ui";
import { StatusTag } from "@shared/ui";
import { FC } from "react";

const periodStatusKind: Record<TPeriodStatus, TagKind> = {
  CREATED: "neutral",
  PAYMENT_PROCESSED: "primary",
  INCOME_NDS_PROCESSED: "primary",
  INCOME_PROCESSED: "primary",
  DEBT_ACCOUNTED: "primary",
  ACCOUNTS_SETTLED: "primary",
  ADDITIONAL_DEBT_ACCOUNTED: "primary",
  PAYMENT_REFUNDED: "warning",
  ANNULLED: "warning",
  CARD_INDEXED: "warning",
  DECLINED: "danger",
  REVOKED: "warning",
  COMPLETED: "success",
  CANCEL: "warning",
  ERROR: "danger",
};

interface PeriodStatusTagProps {
  status?: TPeriodStatus;
}

export const PeriodStatusTag: FC<PeriodStatusTagProps> = ({ status }) => {
  if (!status) {
    return null;
  }

  return (
    <StatusTag kind={periodStatusKind[status]}>
      {mapPeriodStatus(status)}
    </StatusTag>
  );
};
