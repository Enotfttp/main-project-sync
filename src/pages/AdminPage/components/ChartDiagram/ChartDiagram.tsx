import { useDiagram } from "./ChartDiagram.hook";
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
} from "./ChartDiagram.styled";
import { getStatusAppearance } from "./ChartDiagram.utils";
import { Tag } from "@admiral-ds/react-ui";
import { useDashboardData } from "@entities/admin";
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

  const handleSectionClick = ({ id, title }: { id: string; title: string }) => {
    if (selectedChartSection?.id === id) {
      onChartSectionSelect(null);
    } else {
      onChartSectionSelect({ id, title });
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
          {chartData?.map((section) => {
            const percentage = total > 0 ? (section.value / total) * 100 : 0;

            return (
              <StyledLegendDescription
                selectedChartSection={selectedChartSection}
                section={section}
                key={section?.id}
                onClick={() =>
                  handleSectionClick({ id: section.id, title: section.label })
                }
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
