import { mapPackageStatus, TPackageStatus } from "../../model";
import { TagKind } from "@admiral-ds/react-ui";
import { StatusTag } from "@shared/ui";
import { FC } from "react";

const packageStatusKind: Record<TPackageStatus, TagKind> = {
  CREATED: "neutral",
  ACCEPTED: "warning",
  REJECTED: "danger",
  PROCESSED: "primary",
  COMPLETED: "success",
  ERROR: "danger",
};

interface PackageStatusTagProps {
  status?: TPackageStatus;
}

export const PackageStatusTag: FC<PackageStatusTagProps> = ({ status }) => {
  if (!status) {
    return null;
  }

  return (
    <StatusTag kind={packageStatusKind[status]}>
      {mapPackageStatus(status)}
    </StatusTag>
  );
};
