import { PaginationOne, useId } from "@admiral-ds/react-ui";
import type { PaginationOneProps } from "@admiral-ds/react-ui";
import * as React from "react";

export const PaginationTable = ({ ...props }: PaginationOneProps) => {
  const [pageSize, setPageSize] = React.useState(props.pageSize || 1);
  const [page, setPage] = React.useState(props.page || 1);
  const pageSizes = props.pageSizes || [8, 20, 50, 100, 200];
  const totalElements = props.totalItems || 100;

  const leftButtonProps = { "data-testid": useId() };
  const rightButtonProps = { "data-testid": useId() };
  return (
    <PaginationOne
      {...props}
      onChange={({ page, pageSize }) => {
        setPage(page);
        setPageSize(pageSize);
      }}
      style={{ flexGrow: 1 }}
      page={page}
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
