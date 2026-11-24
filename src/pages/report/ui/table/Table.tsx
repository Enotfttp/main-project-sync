import { columnList } from "../../lib/columns";
import { useGetDocuments } from "@entities/document/api/hook";
import { IDocumentInfo } from "@entities/document/model";
import { renderMissingDocumentsRow } from "@pages/report/ui/missing-documents-row/renderMissingDocumentsRow";
import { addIdAndHoverTableRowData } from "@shared/lib";
import { TableSort, useServerSort } from "@shared/ui";
import { FC, useCallback, useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";

interface IProps {
  onRowClick: (id: string) => void;
  onTotalElementsChange: (totalElements?: number) => void;
}

export const Table: FC<IProps> = ({ onRowClick, onTotalElementsChange }) => {
  const { idOption, idPackage, idPeriod, idDocumentUnion } = useParams();

  if (!idOption && !idPackage && !idPeriod && !idDocumentUnion)
    throw new Error("Нет id");

  const { page, sort, handlePaginationChange, handleSortChange } =
    useServerSort<IDocumentInfo>();

  const { data } = useGetDocuments({
    periodId: idPeriod,
    packageSubscriptionId: idPackage,
    optionSubscriptionId: idOption,
    mergedDocumentId: idDocumentUnion,
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

  const handleRowClick = useCallback(
    (rowId: string | number) => {
      onRowClick(String(rowId));
    },
    [onRowClick],
  );
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
    />
  );
};
