import { filterVariants } from "./lib/filters";
import { Filter, RequestDetails, Table } from "./ui";
import {
  FiltersView,
  getVariantFields,
  useFilters,
} from "@features/dynamic-filters";
import { useModal } from "@features/modal";
import { Container, Page, PageBack } from "@shared/ui";
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
            fields={getVariantFields(filterVariants, variant)}
            handleOpenFilters={handleOpenFilters}
          />
          <Table tableKey={tableKey} filters={filtersValue} onRowClick={open} />
        </Container>
      </Page>
      {id && <RequestDetails id={id} onClose={close} />}
    </>
  );
};

export default RequestPage;
