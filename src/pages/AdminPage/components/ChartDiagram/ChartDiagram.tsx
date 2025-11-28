import { useDiagram } from "./ChartDiagram.hook";
import {
  StyledDiagramLegendBlock,
  StyledServiceText,
  StyledWhiteBlock,
} from "./ChartDiagram.styled";
import { Legend } from "./components";
import { ChartData, useDashboardData } from "@entities/admin";
import { Loader, Notification } from "@shared/ui";
import React, { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";

interface ChartDiagramProps {
  selectedChartSection: { id: string; title: string } | null;
  onChartSectionSelect: (section: { id: string; title: string } | null) => void;
}

export const ChartDiagram: React.FC<ChartDiagramProps> = ({
  selectedChartSection,
  onChartSectionSelect,
}) => {
  const { serviceId } = useParams();

  const svgRef = useRef<SVGSVGElement>(null);
  const {
    data: chartData,
    isLoading,
    error,
  } = useDashboardData(serviceId || "");

  const total = chartData?.reduce((sum, item) => sum + item.value, 0) || 0;

  const handleSectionClick = (section: ChartData) => {
    if (selectedChartSection?.id === section.id) {
      onChartSectionSelect(null);
    } else {
      onChartSectionSelect({ id: section.id, title: section.label });
    }
  };

  // Отрисовка круговой диаграммы с помощью d3
  useDiagram(
    svgRef,
    chartData,
    selectedChartSection,
    handleSectionClick,
    total,
  );

  // Закрытие таблицы после смены сервиса
  useEffect(() => {
    return () => {
      onChartSectionSelect(null);
    };
  }, [serviceId]);

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
      <StyledDiagramLegendBlock>
        <StyledWhiteBlock>
          <StyledServiceText>Диаграмма данных</StyledServiceText>
          <svg ref={svgRef} width={400} height={400} />
        </StyledWhiteBlock>

        <StyledWhiteBlock>
          <Legend
            chartData={chartData}
            handleSectionClick={handleSectionClick}
            selectedChartSectionId={selectedChartSection?.id}
            total={total}
          />
        </StyledWhiteBlock>
      </StyledDiagramLegendBlock>
    </div>
  );
};
