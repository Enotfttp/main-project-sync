import styled from "styled-components";

export const StyledFiltersView = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  width: 100%;
`;

export const WrapperFilters = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex: 0 0 90%;
  gap: 20px;
`;

export const WrapperInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  flex: 0 0 30%;
`;

export const StyledIconCount = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding-top: 32px;
  gap: 12px;
  flex: 0 0 10%;
`;

export const WrapperChip = styled.div<{ $dimension?: "m" | "s" }>`
  display: flex;
  & > div {
    margin-right: ${({ $dimension }) => ($dimension === "s" ? 8 : 12)}px;
  }
`;
