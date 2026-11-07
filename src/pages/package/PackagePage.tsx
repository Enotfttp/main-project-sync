import { filters } from "./lib/filters";
import { Filter, PackageDetails, Table } from "./ui";
import { FiltersView, useFilters } from "@features/dynamic-filters";
import { useModal } from "@features/modal";
import { Container, Page, PageBack } from "@shared/ui";
import { FC } from "react";

const PackagePage: FC = () => {
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
  } = useFilters("package");
  const { id, open, close } = useModal();

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
        <PageBack />
        <Container>
          <FiltersView
            filtersValue={filtersValue}
            handleClose={handleRemoveField}
            fields={filters}
            handleOpenFilters={handleOpenFilters}
          />
          <Table tableKey={tableKey} filters={filtersValue} onRowClick={open} />
        </Container>
      </Page>
      {id && <PackageDetails id={id} onClose={close} />}
    </>
  );
};

export default PackagePage;
