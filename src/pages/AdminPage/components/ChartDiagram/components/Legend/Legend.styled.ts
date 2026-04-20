import { ChartData } from "@entities/admin/types";
import styled from "styled-components";

export const StyledLegend = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 32px;
`;

export const StyledLegendDescription = styled.div<{
  selectedChartSection: string | null;
  section: ChartData;
}>`
  display: flex;
  align-items: center;
  text-align: left;
  gap: 12px;
  padding: 12px 16px;
  border-radius: 8px;
  background-color: ${({ selectedChartSection, section, theme }) =>
    selectedChartSection === section.id
      ? theme.color["Neutral/Neutral 50"]
      : theme.color["Neutral/Neutral 30"]};
  border: ${({ selectedChartSection, section }) =>
    selectedChartSection === section.id
      ? "2px solid #0D5ACE"
      : "1px solid #E2E5E8"};
  cursor: pointer;
  transition: all 0.2s ease;
`;

export const StyledSquare = styled.div<{ section: ChartData }>`
  width: 16px;
  height: 16px;
  border-radius: 4px;
  background-color: ${({ section }) => section.color};
`;

export const StyledTextDescription = styled.div`
  flex: 1;
  min-width: 0;
`;

export const StyledTextDescriptionLabel = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;
  > span {
    font-weight: 500;
    color: ${({ theme }) => theme.color["Neutral/Neutral 90"]};
    font-size: 14px;
    flex: 1;
  }
`;

export const StyledTextDescriptionProgress = styled.div`
  width: 100%;
  height: 6px;
  background-color: #e2e5e8;
  border-radius: 3px;
  margin-top: 8px;
  overflow: hidden;
`;

export const StyledTextDescriptionProgressPercent = styled.div<{
  section: ChartData;
  percentage: number;
}>`
  width: ${({ percentage }) => `${percentage}%`};
  height: 100%;
  background-color: ${({ section }) => section.color};
  border-radius: 3px;
  transition: width 0.3s ease;
`;

export const StyledTotal = styled.div`
  margin-top: 8px;
  font-size: 14px;
  color: #666;
`;
