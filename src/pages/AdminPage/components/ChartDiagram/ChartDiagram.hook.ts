import { ChartData } from "@entities/admin/types/admin.types.ts";
import * as d3 from "d3";
import { useEffect } from "react";

interface PieArcDatum {
  data: ChartData;
  value: number;
  index: number;
  startAngle: number;
  endAngle: number;
  padAngle: number;
}

export const useDiagram = (
  svgRef,
  chartData,
  selectedChartSection,
  handleSectionClick,
  total,
) => {
  useEffect(() => {
    if (!svgRef.current || !chartData.length) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove(); // Очищаем предыдущую диаграмму

    const width = 300;
    const height = 300;
    const radius = Math.min(width, height) / 2;

    // Создаем группу для диаграммы в центре SVG
    const g = svg
      .append("g")
      .attr("transform", `translate(${width / 2}, ${height / 2})`);

    // Создаем генератор дуг для pie chart
    const pie = d3
      .pie<ChartData>()
      .value((d) => d.value)
      .sort(null);

    const arc = d3.arc<PieArcDatum>().innerRadius(0).outerRadius(radius);

    // Создаем секции диаграммы
    const arcs = g
      .selectAll("arc")
      .data(pie(chartData))
      .enter()
      .append("g")
      .attr("class", "arc")
      .style("cursor", "pointer")
      .on("click", (event, d) => {
        handleSectionClick(d.data.id);
      });

    // Рисуем секции
    arcs
      .append("path")
      .attr("d", arc)
      .attr("fill", (d) => d.data.color)
      .style("stroke", "#fff")
      .style("stroke-width", 2)
      .style("opacity", (d) => (selectedChartSection === d.data.id ? 1 : 0.8))
      .style("transition", "opacity 0.2s ease")
      .on("mouseover", function () {
        d3.select(this)
          .style("opacity", 1)
          .style("filter", "drop-shadow(0 0 8px rgba(0,0,0,0.3))");
      })
      .on("mouseout", function (_, d) {
        d3.select(this)
          .style("opacity", selectedChartSection === d.data.id ? 1 : 0.8)
          .style("filter", "none");
      });

    // Добавляем подписи внутри секций (если место позволяет)
    arcs
      .append("text")
      .attr("transform", (d) => {
        const pos = arc.centroid(d);
        return `translate(${pos[0]}, ${pos[1]})`;
      })
      .attr("text-anchor", "middle")
      .style("font-size", "12px")
      .style("font-weight", "bold")
      .style("fill", "#fff")
      .style("pointer-events", "none")
      .text((d) => {
        const percentage = (d.data.value / total) * 100;
        return percentage > 15 ? `${Math.round(percentage)}%` : "";
      });

    // Добавляем подписи с процентами в центр секций
    arcs
      .append("text")
      .attr("transform", (d) => {
        const pos = arc.centroid(d);
        return `translate(${pos[0]}, ${pos[1]})`;
      })
      .attr("text-anchor", "middle")
      .style("font-size", "12px")
      .style("font-weight", "bold")
      .style("fill", "#fff")
      .style("pointer-events", "none")
      .text((d) => {
        const percentage = (d.data.value / total) * 100;
        return percentage > 10 ? `${Math.round(percentage)}%` : "";
      });
  }, [chartData, selectedChartSection, total]);
};
