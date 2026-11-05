import styled from "styled-components";

export const StyledTableSort = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  min-height: 0;
  gap: 20px;
`;

export const StyledPagination = styled.div`
  flex-shrink: 0;
  margin: auto -24px -16px;
  padding: 16px 24px;
  background-color: ${({ theme }) => theme.color["Neutral/Neutral 05"]};
`;
