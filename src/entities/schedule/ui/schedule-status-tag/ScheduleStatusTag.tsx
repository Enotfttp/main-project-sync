import { mapScheduleStatus, TScheduleStatus } from "../../model";
import { TagKind } from "@admiral-ds/react-ui";
import { StatusTag } from "@shared/ui";
import { FC } from "react";

const scheduleStatusKind: Record<TScheduleStatus, TagKind> = {
  CREATED: "neutral",
  PROCESSED: "primary",
  COMPLETED: "success",
  CANCEL: "warning",
  ERROR: "danger",
};

interface ScheduleStatusTagProps {
  status?: TScheduleStatus;
}

export const ScheduleStatusTag: FC<ScheduleStatusTagProps> = ({ status }) => {
  if (!status) {
    return null;
  }

  return (
    <StatusTag kind={scheduleStatusKind[status]}>
      {mapScheduleStatus(status)}
    </StatusTag>
  );
};
