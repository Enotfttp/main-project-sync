import styled from "styled-components";

export const StyledFilter = styled.div`
  background-color: ${({ theme }) => theme.color["Neutral/Neutral 00"]};
  padding: 24px 32px;
`;

export const StyledBgBlock = styled.div`
  position: fixed;
  inset: 0;
  z-index: ${({ theme }) => theme.zIndex.modal};
  background-color: ${({ theme }) => theme.color["Opacity/Modal"]};
`;

export const StyledAdditionalBlock = styled.div`
  background-color: ${({ theme }) => theme.color["Neutral/Neutral 00"]};
  display: flex;
  flex-direction: column;
  border: 2px solid ${({ theme }) => theme.color["Neutral/Neutral 20"]};
  svg {
    align-self: center;
  }
`;

export const StyledFilterHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  font-size: 16px;
  font-weight: 600;
  color: #0d1f2c;
`;

export const StyledFilterTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const StyledFilterBody = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 32px;
  margin: 16px 0;
`;

export const StyledFilterField = styled.div`
  flex: 0 1 30%;
  display: flex;
  gap: 15px;
  flex-direction: column;

  label {
    font-size: 14px;
    font-weight: 500;
    color: #0d1f2c;
  }
`;

export const StyledFilterActions = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const StyledFilterActionsGroup = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 16px;
`;
