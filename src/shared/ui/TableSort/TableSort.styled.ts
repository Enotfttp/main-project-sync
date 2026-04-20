import styled from "styled-components";

export const StyledTableSort = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100%; /* Занимает всю высоту */
  gap: 20px;
`;

export const StyledAdditionalBlock = styled.div`
  background-color: ${({ theme }) => theme.color["Neutral/Neutral 00"]};
  display: flex;
  flex-direction: column;
  padding: 40px;
  border-radius: 25px;
  border: 2px solid ${({ theme }) => theme.color["Neutral/Neutral 20"]};
  width: 100%;
  height: 100%;
  svg {
    align-self: center;
  }
`;
