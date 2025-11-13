import { useDiagram } from "./ChartDiagram.hook.ts";
import {
  StyledDiagramLegendBlock,
  StyledLegend,
  StyledLegendDescription,
  StyledServiceNumber,
  StyledSquare,
  StyledTextDescription,
  StyledTextDescriptionLabel,
  StyledTextDescriptionProgress,
  StyledTextDescriptionProgressPercent,
  StyledTotal,
} from "./ChartDiagram.styled.ts";
import { getStatusAppearance } from "./ChartDiagram.utils.ts";
import { Tag } from "@admiral-ds/react-ui";
import { useDashboardData } from "@entities/admin/api/admin.service.ts";
import { ChartData } from "@entities/admin/types/admin.types.ts";
import { Loader, Notification } from "@shared/ui";
import { select } from "d3-selection";
import { PieArcDatum as D3PieArcDatum } from "d3-shape";
import React, { useRef } from "react";
import { useParams } from "react-router-dom";

interface ChartDiagramProps {
  selectedChartSection: string | null;
  onChartSectionSelect: (sectionId: string | null) => void;
}

interface D3PieDatum extends D3PieArcDatum<ChartData> {
  data: ChartData;
}

export const ChartDiagram: React.FC<ChartDiagramProps> = ({
  selectedChartSection,
  onChartSectionSelect,
}) => {
  const { serviceId } = useParams();

  const svgRef = useRef<SVGSVGElement>(null);
  const {
    data: dashboardData,
    isLoading,
    error,
  } = useDashboardData(serviceId || "");

  const chartData = dashboardData?.chartData || [];
  const total = chartData.reduce((sum, item) => sum + item.value, 0);

  const handleSectionClick = (sectionId: string) => {
    if (selectedChartSection === sectionId) {
      onChartSectionSelect(null);
    } else {
      onChartSectionSelect(sectionId);
    }
  };

  const handleLegendHover = (sectionId: string, isHovered: boolean) => {
    if (!svgRef.current) return;

    select(svgRef.current)
      .selectAll(".arc path")
      .style("opacity", function (_, d: unknown) {
        const pieDatum = d as D3PieDatum;
        if (isHovered) {
          return pieDatum.data.id === sectionId ? 1 : 0.6;
        } else {
          return selectedChartSection === pieDatum.data.id ? 1 : 0.8;
        }
      });
  };

  // Отрисовка круговой диаграммы с помощью d3
  useDiagram(
    svgRef,
    chartData,
    selectedChartSection,
    handleSectionClick,
    total,
  );

  if (!serviceId) {
    return (
      <Notification
        status="info"
        title="Выберите сервис"
        body="Пожалуйста, выберите сервис для отображения данных"
      />
    );
  }

  if (error) {
    return (
      <Notification
        status="error"
        title="Ошибка загрузки"
        body="Не удалось загрузить данные диаграммы"
      />
    );
  }

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div>
      <StyledServiceNumber>
        Диаграмма данных - Сервис {serviceId}
      </StyledServiceNumber>
      {/* Круговая диаграмма */}
      <StyledDiagramLegendBlock>
        <svg ref={svgRef} width={300} height={300} />
        <StyledLegend>
          {chartData.map((section) => {
            const percentage = (section.value / total) * 100;
            return (
              <StyledLegendDescription
                selectedChartSection={selectedChartSection}
                section={section}
                key={section.id}
                onClick={() => handleSectionClick(section.id)}
                onMouseEnter={() => handleLegendHover(section.id, true)}
                onMouseLeave={() => handleLegendHover(section.id, false)}
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
            );
          })}
          <StyledTotal>Всего: {total} операций</StyledTotal>
        </StyledLegend>
      </StyledDiagramLegendBlock>
    </div>
  );
};
