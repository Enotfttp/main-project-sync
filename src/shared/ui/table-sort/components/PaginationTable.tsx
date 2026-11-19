import type { PaginationOneProps } from "@admiral-ds/react-ui";
import { PaginationOne, useId } from "@admiral-ds/react-ui";
import { DEFAULT_PAGE_SIZE, TPaginationTable } from "@shared/types";
import * as React from "react";

export const PaginationTable = ({
  handlePaginationChange,
  ...props
}: Partial<PaginationOneProps> & {
  handlePaginationChange?(pagination: TPaginationTable): void;
}) => {
  const pageSizes = props.pageSizes ?? [DEFAULT_PAGE_SIZE, 50, 100, 200];
  const [pageSize, setPageSize] = React.useState(
    props.pageSize ?? pageSizes[0],
  );
  const [curPage, setPage] = React.useState(props.page ?? 1);
  const totalElements = props.totalItems ?? 0;

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
      }}
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
