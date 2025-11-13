import { StyledAdminPageContainer } from "./AdminPage.styled.ts";
import { DataTable, ChartDiagram } from "./components";
import React, { useState } from "react";

const AdminPage: React.FC = () => {
  const [selectedChartSection, setSelectedChartSection] = useState<
    string | null
  >(null);

  const handleChartSectionSelect = (sectionId: string | null) => {
    setSelectedChartSection(sectionId);
  };

  return (
    <StyledAdminPageContainer>
      <ChartDiagram
        selectedChartSection={selectedChartSection}
        onChartSectionSelect={handleChartSectionSelect}
      />
      <DataTable selectedChartSection={selectedChartSection} />
    </StyledAdminPageContainer>
  );
};

export default AdminPage;
