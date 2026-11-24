import { Link } from "@admiral-ds/react-ui";
import styled from "styled-components";

export const MissingDocumentsTable = styled.div`
  display: contents;

  .missing-documents .tr-simple {
    position: relative;
  }

  .missing-documents .td[data-column="documentId"] {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 44px;
    z-index: 1;
    width: auto !important;
    overflow: visible;
    white-space: nowrap;
    background: inherit;
  }
`;

export const Details = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 4px 12px 12px 32px;
`;

export const Line = styled.div`
  display: flex;
  align-items: baseline;
  gap: 8px;
`;

export const IdLink = styled(Link)`
  white-space: normal;
`;
