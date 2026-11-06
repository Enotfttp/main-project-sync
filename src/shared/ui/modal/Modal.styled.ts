import styled from "styled-components";

export const ModalHeader = styled.div`
  padding: 0 56px 8px 24px;
`;

export const Rows = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Row = styled.div`
  display: grid;
  grid-template-columns: minmax(180px, 1fr) minmax(0, 1fr);
  column-gap: 16px;
  align-items: center;
  min-height: 40px;
`;

export const Value = styled.div`
  justify-self: end;
  text-align: right;
  min-width: 0;
  word-break: break-word;
`;

export const SectionTitle = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
  padding: 4px 8px;
  background-color: ${({ theme }) => theme.color["Primary/Primary 10"]};
  text-transform: uppercase;
  border-radius: 4px;
  margin-top: 24px;
  svg {
    width: 20px;
    height: 20px;
    flex-shrink: 0;
  }

  path {
    fill: ${({ theme }) => theme.color["Primary/Primary 60 Main"]};
  }
`;

export const State = styled.div`
  display: flex;
  justify-content: center;
  padding: 24px 0;
`;

export const MessageText = styled.pre`
  margin: 0;
  white-space: pre-wrap;
  word-break: break-word;
  font: inherit;
`;
