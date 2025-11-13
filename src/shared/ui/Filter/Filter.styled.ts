import styled from "styled-components";

export const StyledFilter = styled.div``;

export const StyledFilterHeader = styled.h3`
  margin-bottom: 20px;
  font-size: 16px;
  font-weight: 600;
  color: #0d1f2c;
`;
export const StyledFilterCount = styled.h3`
  background: #0d5ace;
  color: white;
  border-radius: 12px;
  padding: 2px 8px;
  font-size: 12px;
  font-weight: 500;
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

export const StyledFilterActions = styled.div`
  display: flex;
  gap: 8px;
  justify-content: flex-end;
  padding-top: 16px;
  border-top: 1px solid #e2e5e8;
`;
