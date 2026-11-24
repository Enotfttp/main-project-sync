import { columnList } from "../../lib/columns";
import { useGetReports } from "@entities/report/api/hook";
import { IReportInfo } from "@entities/report/model";
import { renderMissingDocumentsDetails } from "@pages/report/ui/missing-documents-row/MissingDocumentsRow";
import { MissingDocumentsTable } from "@pages/report/ui/missing-documents-row/MissingDocumentsRow.styled";
import { resolveChildPath } from "@shared/lib";
import { TableSort, useServerSort } from "@shared/ui";
import { FC, useCallback, useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

interface IProps {
  onTotalElementsChange: (totalElements?: number) => void;
}

export const Table: FC<IProps> = ({ onTotalElementsChange }) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const [expandedIds, setExpandedIds] = useState<Record<string, boolean>>({});
  const { page, sort, handlePaginationChange, handleSortChange } =
    useServerSort<IReportInfo>();

  const { data } = useGetReports({
    pathname: pathname,
    page,
    sort,
  });

  useEffect(() => {
    onTotalElementsChange(data?.totalElements);
  }, [data?.totalElements, onTotalElementsChange]);

  const rows = useMemo(
    () =>
      data?.content.map((item) => {
        const id = item.documentId ?? `${item.requestId}:${item.scheduleSourceGuid}`;
        const missing = !item.documentId;

        return {
          ...item,
          id,
          hover: !missing,
          expanded: Boolean(expandedIds[id]),
          expandedRowRender: renderMissingDocumentsDetails,
          ...(missing ? { className: "missing-documents" } : {}),
        };
      }) ?? [],
    [data?.content, expandedIds],
  );

  const handleExpansionChange = (ids: Record<string, boolean>) => {
    setExpandedIds(ids);
  };

  const handleRowClick = useCallback(
    (rowId: string | number) => {
      const item = data?.content.find(
        (row) =>
          (row.documentId ?? `${row.requestId}:${row.scheduleSourceGuid}`) ===
          String(rowId),
      );
      if (!item?.documentId) return;

      const documentInfoPath = resolveChildPath(pathname, "documentInfo", {
        idDocument: item.documentId,
      });

      if (documentInfoPath) navigate(documentInfoPath);
    },
    [data?.content, navigate, pathname],
  );

  return (
    <MissingDocumentsTable>
      <TableSort
        isPagination
        columnList={columnList}
        rowList={rows}
        onRowClick={handleRowClick}
        queryKey="documents"
        sort={sort}
        handleSortChange={handleSortChange}
        handlePaginationChange={handlePaginationChange}
        pagination={data}
        displayRowExpansionColumn
        onRowExpansionChange={handleExpansionChange}
      />
    </MissingDocumentsTable>
  );
};
