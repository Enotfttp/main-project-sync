import { ChartData } from "@entities/admin/admin.types";
import styled from "styled-components";

export const StyledAdditionalErrorInfo = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  padding: 0 16px;
`;

export const StyledError = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const StyledSquare = styled.div<{ section: ChartData }>`
  width: 16px;
  height: 16px;
  border-radius: 4px;
  background-color: #f44336;
`;
