import { columnList } from "../../lib/columns";
import { IDocumentInfo } from "@entities/document/model";
import { useGetReports } from "@entities/report/api/hook";
import { renderMissingDocumentsRow } from "@pages/report/ui/missing-documents-row/renderMissingDocumentsRow";
import { addIdAndHoverTableRowData, resolveChildPath } from "@shared/lib";
import { TableSort, useServerSort } from "@shared/ui";
import { FC, useCallback, useEffect, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";

interface IProps {
  onTotalElementsChange: (totalElements?: number) => void;
}

export const Table: FC<IProps> = ({ onTotalElementsChange }) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const { page, sort, handlePaginationChange, handleSortChange } =
    useServerSort<IDocumentInfo>();

  const { data } = useGetReports({
    pathname: pathname,
    page,
    sort,
  });

  useEffect(() => {
    onTotalElementsChange(data?.totalElements);
  }, [data?.totalElements, onTotalElementsChange]);

  const rows = useMemo(
    () => addIdAndHoverTableRowData("documentId", data?.content, true),
    [data?.content],
  );

  const handleRowClick = useCallback((rowId: string | number) => {
    const documentInfoPath = resolveChildPath(pathname, "documentInfo", {
      idDocument: String(rowId),
    });

    if (documentInfoPath) navigate(documentInfoPath);
  }, []);

  return (
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
      renderRowWrapper={renderMissingDocumentsRow}
      displayRowExpansionColumn
    />
  );
};
