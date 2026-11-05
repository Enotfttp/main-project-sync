import { Table } from "./ui";
import { FiltersView } from "@features/dynamic-filters";
import { Container, Page, PageBack } from "@shared/ui";
import { FC, useCallback, useState } from "react";

const RequestHistoryPage: FC = () => {
  const [totalElements, setTotalElements] = useState<number>();
  const handleTotalElementsChange = useCallback(
    (total?: number) => setTotalElements(total),
    [],
  );

  return (
    <Page>
      <PageBack />
      <Container>
        <FiltersView totalElements={totalElements} />
        <Table
          onRowClick={open}
          onTotalElementsChange={handleTotalElementsChange}
        />
      </Container>
    </Page>
  );
};

export default RequestHistoryPage;
