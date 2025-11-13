import React, { useState } from 'react';
import { DataTable, ChartDiagram } from './components';
import { StyledAdminPageContainer } from './AdminPage.styled.ts';

const AdminPage: React.FC = () => {
  const [selectedChartSection, setSelectedChartSection] = useState<string | null>(null);

  const handleChartSectionSelect = (sectionId: string | null) => {
    setSelectedChartSection(sectionId);
  };

  return (
    <StyledAdminPageContainer>
      <ChartDiagram selectedChartSection={selectedChartSection} onChartSectionSelect={handleChartSectionSelect} />
      <DataTable selectedChartSection={selectedChartSection} />
    </StyledAdminPageContainer>
  );
};

export default AdminPage;
