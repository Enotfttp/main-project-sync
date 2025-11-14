import styled from "styled-components";

export const StyledFilter = styled.div``;

export const StyledFilterHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
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

  label {
    font-size: 14px;
    font-weight: 500;
    color: #0d1f2c;
    margin-bottom: 4px;
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
  padding-top: 16px;
  border-top: 1px solid #e2e5e8;
`;
