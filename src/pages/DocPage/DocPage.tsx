import { FilterSection, TableSection } from "./components";
import { StyledDocPage, StyledWhiteBlock } from "./DocPage.styled";
import { T } from "@admiral-ds/react-ui";
import { DocTypeText } from "@entities/documents/types";
import { HorizontalTabsTemplate } from "@shared/ui";
import { handleSetFilters, useFilter } from "@shared/ui/Filter/useFilter";
import * as React from "react";
import { useLayoutEffect, useState } from "react";

const TABS = Object.entries(DocTypeText).map(([key, value]) => ({
  text: value,
  tabId: key,
}));

const DocPage = () => {
  const [tabId, setTabId] = useState(TABS[0].tabId);

  const {
    handleResetFilters,
    handleApplyFilters,
    filters,
    tableKey,
    setFilters,
  } = useFilter();

  useLayoutEffect(() => {
    setFilters((prevState) =>
      handleSetFilters(
        {
          docType: tabId,
        },
        prevState,
      ),
    );
  }, [filters]);

  const handleSetTabId = (tabId: string) => {
    setTabId(tabId);
    setFilters((prevState) =>
      handleSetFilters(
        {
          docType: tabId,
        },
        prevState,
      ),
    );
  };

  return (
    <StyledDocPage>
      <T font="Header/H1">Документы</T>
      <HorizontalTabsTemplate
        tabs={TABS}
        defaultSelectedTabId={tabId}
        onSelectTab={handleSetTabId}
      />
      {TABS.map((tab) => {
        if (tab.tabId !== tabId) return null;
        return (
          <React.Fragment key={tab.tabId}>
            <StyledWhiteBlock>
              <FilterSection
                onApplyFilters={handleApplyFilters}
                onResetFilters={handleResetFilters}
              />
            </StyledWhiteBlock>
            <StyledWhiteBlock>
              <TableSection tableKey={tableKey} filters={filters} />
            </StyledWhiteBlock>
          </React.Fragment>
        );
      })}
    </StyledDocPage>
  );
};

export default DocPage;
