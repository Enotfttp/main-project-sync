import styled from "styled-components";

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

export const Section = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 8px -24px;
  padding: 6px 24px;
  background-color: ${({ theme }) => theme.color["Primary/Primary 10"]};
  text-transform: uppercase;

  svg {
    width: 20px;
    height: 20px;
    flex-shrink: 0;
  }

  path {
    fill: ${({ theme }) => theme.color["Primary/Primary 60 Main"]};
  }
`;

export const MessageText = styled.pre`
  margin: 0;
  white-space: pre-wrap;
  word-break: break-word;
  font: inherit;
`;
