import { MissingDocumentsRow } from "./MissingDocumentsRow";
import { TableRow } from "@admiral-ds/react-ui";
import { isMissingRow } from "@pages/report/lib/isMissingRow";
import { ReactNode } from "react";

export const renderMissingDocumentsRow = (
  row: TableRow,
  _index: number,
  node: ReactNode,
) => {
  if (!isMissingRow(row)) return node;

  return (
    <MissingDocumentsRow
      requestId={row.requestId}
      scheduleId={row.scheduleSourceGuid}
      defaultOpened={row.defaultOpened}
    />
  );
};
