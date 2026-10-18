import styled from "styled-components";

export const StyledServiceGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  &:not(first-child) {
    margin-top: 32px;
  }
`;

export const StyledServiceList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(0, 292px));
  height: 92px;
  gap: 16px;
`;

export const StyledServiceCard = styled.div`
  display: flex;
  align-items: flex-start;
  min-height: 72px;
  padding: 16px 24px;
  background-color: ${({ theme }) => theme.color["Neutral/Neutral 00"]};
  border-radius: 10px;
  border: 1px solid ${({ theme }) => theme.color["Neutral/Neutral 20"]};
`;
