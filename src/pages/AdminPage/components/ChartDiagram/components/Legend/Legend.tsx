import {
  StyledLegend,
  StyledLegendDescription,
  StyledSquare,
  StyledTextDescription,
  StyledTextDescriptionLabel,
  StyledTextDescriptionProgress,
  StyledTextDescriptionProgressPercent,
  StyledTotal,
} from "./Legend.styled";
import { StyledServiceText } from "../../ChartDiagram.styled";
import { getStatusAppearance } from "../../ChartDiagram.utils";
import { Tag } from "@admiral-ds/react-ui";
import { ChartData } from "@entities/admin";
import { AdditionalErrorInfo } from "@pages/AdminPage/components/ChartDiagram/components/Legend/AdditionalErrorInfo";
import { statusConfig } from "@pages/AdminPage/components/DataTable/components/TableSection/column";
import React from "react";

interface ILegend {
  selectedChartSectionId?: string;
  total: number;
  chartData?: ChartData[];
  handleSectionClick(section: ChartData): void;
}

export const Legend: React.FC<ILegend> = ({
  selectedChartSectionId,
  chartData,
  total,
  handleSectionClick,
}) => {
  return (
    <>
      <StyledServiceText>Статусы сообщений сервиса</StyledServiceText>
      <StyledLegend>
        {chartData?.map((section: ChartData) => {
          const percentage = total > 0 ? (section.value / total) * 100 : 0;

          return (
            <React.Fragment key={section?.id}>
              <StyledLegendDescription
                selectedChartSection={selectedChartSectionId}
                section={section}
                onClick={() => handleSectionClick(section)}
              >
                <StyledSquare section={section} />
                <StyledTextDescription>
                  <StyledTextDescriptionLabel>
                    <span>{section.label}</span>
                    <Tag kind={getStatusAppearance(section.label)}>
                      {section.value} ({percentage.toFixed(1)}%)
                    </Tag>
                  </StyledTextDescriptionLabel>
                  <StyledTextDescriptionProgress>
                    <StyledTextDescriptionProgressPercent
                      section={section}
                      percentage={percentage}
                    />
                  </StyledTextDescriptionProgress>
                </StyledTextDescription>
              </StyledLegendDescription>
              {section.id === selectedChartSectionId &&
                section.label === statusConfig.danger.extraText && (
                  <AdditionalErrorInfo />
                )}
            </React.Fragment>
          );
        })}
        <StyledTotal>Всего: {total} операций</StyledTotal>
      </StyledLegend>
    </>
  );
};
