import { mapOptionStatus, TOptionStatus } from "../../model";
import { TagKind } from "@admiral-ds/react-ui";
import { StatusTag } from "@shared/ui";
import { FC } from "react";

const optionStatusKind: Record<TOptionStatus, TagKind> = {
  CREATED: "neutral",
  ACTIVE: "primary",
  INACTIVE: "success",
  DISABLED: "warning",
};

interface OptionStatusTagProps {
  status?: TOptionStatus;
}

export const OptionStatusTag: FC<OptionStatusTagProps> = ({ status }) => {
  if (!status) {
    return null;
  }

  return (
    <StatusTag kind={optionStatusKind[status]}>
      {mapOptionStatus(status)}
    </StatusTag>
  );
};
