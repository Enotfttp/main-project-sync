import { filterVariants } from "./lib/filters";
import { Filter, Table } from "./ui";
import { useFilters } from "@features/dynamic-filters";
import { getFieldsFromMutlyFilters } from "@shared/lib";
import { Container, FiltersView, Page } from "@shared/ui";
import { FC } from "react";

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
  } = useFilters();

  return (
    <>
      <Filter
        onApplyFilters={handleApplyFilters}
        onResetFilters={handleResetFilters}
        isShowFilters={isShowFilters}
        filtersValue={filtersValue}
        onCancel={handleCloseFilters}
      />
      <Page>
        <Container>
          <FiltersView
            filtersValue={filtersValue}
            handleClose={handleRemoveField}
            fields={getFieldsFromMutlyFilters(filterVariants, variant)}
            handleOpenFilters={handleOpenFilters}
          />
          <Table tableKey={tableKey} filters={filtersValue} />
        </Container>
      </Page>
    </>
  );
};

export default RequestPage;
