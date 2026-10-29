import { filterVariants } from "./lib/filters";
import { Filter, Table } from "./ui";
import {
  FiltersView,
  getVariantFields,
  useFilters,
} from "@features/dynamic-filters";
import { Container, Page } from "@shared/ui";
import { FC } from "react";

const REQUEST_FILTERS_ID = "request";

const RequestPage: FC = () => {
  const {
    filters: filtersValue,
    tableKey,
    variant,
    isShowFilters,
    handleResetFilters,
    handleApplyFilters,
    handleRemoveField,
    handleCloseFilters,
    handleOpenFilters,
  } = useFilters(REQUEST_FILTERS_ID);

  return (
    <>
      <Filter
        onApplyFilters={handleApplyFilters}
        onResetFilters={handleResetFilters}
        isShowFilters={isShowFilters}
        filtersValue={filtersValue}
        variant={variant}
        onClose={handleCloseFilters}
      />
      <Page>
        <Container>
          <FiltersView
            filtersValue={filtersValue}
            handleClose={handleRemoveField}
            fields={getVariantFields(filterVariants, variant)}
            handleOpenFilters={handleOpenFilters}
          />
          <Table tableKey={tableKey} filters={filtersValue} />
        </Container>
      </Page>
    </>
  );
};

export default RequestPage;
