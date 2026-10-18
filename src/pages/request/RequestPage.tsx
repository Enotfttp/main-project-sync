import { filterVariants } from "./filters";
import { DynamicFilters, FilterCancelActions } from "@features/dynamic-filters";
import { Page } from "@shared/ui";
import { FC } from "react";

const RequestPage: FC = () => {
  const handleCancel = ({ reset }: FilterCancelActions) => {
    reset();
  };

  return (
    <>
      <DynamicFilters variants={filterVariants} onCancel={handleCancel} />
      <Page>RequestPage</Page>
    </>
  );
};

export default RequestPage;
