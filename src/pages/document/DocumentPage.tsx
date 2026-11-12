import { DocumentDetails, Table } from "./ui";
import { FiltersView } from "@features/dynamic-filters";
import { useModal } from "@features/modal";
import { Container, Page, PageBack } from "@shared/ui";
import { FC, useCallback, useState } from "react";

const DocumentPage: FC = () => {
  const [totalElements, setTotalElements] = useState<number>();
  const { id, open, close } = useModal();

  const handleTotalElementsChange = useCallback(
    (total?: number) => setTotalElements(total),
    [],
  );

  return (
    <>
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
      {id && <DocumentDetails id={id} onClose={close} />}
    </>
  );
};

export default DocumentPage;
