import { StyledAdminPageContainer } from "./AdminPage.styled";
import { ChartDiagram, DataTable } from "./components";
import React, { useState } from "react";

const AdminPage = () => {
  const [selectedChartSection, setSelectedChartSection] = useState<{
    id: string;
    title: string;
  } | null>(null);

  const handleChartSectionSelect = (
    section: {
      id: string;
      title: string;
    } | null,
  ) => {
    setSelectedChartSection(section ? { ...section } : section);
  };

  return (
    <StyledAdminPageContainer>
      <ChartDiagram
        selectedChartSection={selectedChartSection}
        onChartSectionSelect={handleChartSectionSelect}
      />
      {selectedChartSection && (
        <DataTable selectedChartSection={selectedChartSection} />
      )}
    </StyledAdminPageContainer>
  );
};

export default AdminPage;
