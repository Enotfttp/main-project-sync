import { TableRow } from "@admiral-ds/react-ui";
import { IReportInfo } from "@entities/report/model";

export const isMissingRow = (
  row: TableRow,
): row is TableRow & IReportInfo & { defaultOpened?: boolean } =>
  "missing" in row && Boolean(row.missing);
