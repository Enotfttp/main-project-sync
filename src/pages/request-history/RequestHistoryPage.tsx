import { Table } from "./ui";
import { FiltersView } from "@features/dynamic-filters";
import { Container, Page } from "@shared/ui";
import { FC } from "react";

const RequestHistoryPage: FC = () => {
  return (
    <Page>
      <Container>
        <FiltersView totalElements={25} />
        <Table onRowClick={open} />
      </Container>
    </Page>
  );
};

export default RequestHistoryPage;
