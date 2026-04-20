import styled from "styled-components";

export const StyledFilter = styled.div<{ isVisible: boolean }>`
  background-color: ${({ theme, isVisible }) =>
    isVisible
      ? theme.color["Neutral/Neutral 00"]
      : theme.color["Neutral/Neutral 05"]};
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

export const StyledFilterHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 16px;
  font-weight: 600;
  color: #0d1f2c;
`;

export const StyledFilterBody = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  margin-bottom: 20px;
`;

export const StyledFilterField = styled.div`
  flex: 1 1 30%;
  display: flex;
  gap: 15px;
  flex-direction: column;

  label {
    font-size: 14px;
    font-weight: 500;
    color: #0d1f2c;
  }
`;

export const StyledFilterRange = styled.div`
  display: flex;
  flex-direction: column;

  > div {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`;

export const StyledFilterActions = styled.div`
  display: flex;
  gap: 8px;
  justify-content: flex-end;
`;
