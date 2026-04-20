import styled from "styled-components";

export const StyledTableTitle = styled.h2`
  text-align: left;
  margin: 0 0 44px 0;
  font-size: 18px;
  font-weight: 500;
  color: ${({ theme }) => theme.color["Neutral/Neutral 90"]};
`;

export const StyledTableHeader = styled.div`
  margin-bottom: 20px;
`;
