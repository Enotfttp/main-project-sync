import type { PaginationOneProps } from "@admiral-ds/react-ui";
import { PaginationOne, useId } from "@admiral-ds/react-ui";
import { TPaginationTable } from "@shared/types";
import * as React from "react";

export const PaginationTable = ({
  handlePaginationChange,
  handleResetSortCols,
  ...props
}: Partial<PaginationOneProps> & {
  handlePaginationChange?(pagination: TPaginationTable): void;
  handleResetSortCols(): void;
}) => {
  const [pageSize, setPageSize] = React.useState(props.pageSize || 1);
  const [curPage, setPage] = React.useState(props.page || 1);
  const pageSizes = props.pageSizes || [8, 20, 50, 100, 200];
  const totalElements = props.totalItems || 100;

  const leftButtonProps = { "data-testid": useId() };
  const rightButtonProps = { "data-testid": useId() };
  return (
    <PaginationOne
      {...props}
      onChange={({ page, pageSize }) => {
        if (handlePaginationChange) {
          handlePaginationChange({
            page: page,
            pageSize: pageSize,
          });
        }

        setPage(page);
        setPageSize(pageSize);
        handleResetSortCols();
      }}
      style={{ marginTop: "auto", flexShrink: 0 }}
      page={curPage}
      pageSize={pageSize}
      totalItems={totalElements}
      pageSizes={pageSizes}
      data-dropdown-container-id="pagination-with-dropdown"
      data-dropdown-container-test-id="pagination-test-id-with-dropdown"
      className="pagination-class-name"
      pageSizeDropContainerStyle={{
        dropContainerClassName: "pageSizeDropContainerClass",
      }}
      pageNumberDropContainerStyle={{
        dropContainerClassName: "pageNumberDropContainerClass",
      }}
      leftButtonPropsConfig={() => leftButtonProps}
      rightButtonPropsConfig={() => rightButtonProps}
    />
  );
};
