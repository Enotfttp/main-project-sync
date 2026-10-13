import { filterVariants } from "./filters";
import { DynamicFilters, FilterCancelActions } from "@features/dynamic-filters";
import { FC } from "react";

const MainPage: FC = () => {
  const handleCancel = ({ reset }: FilterCancelActions) => {
    reset();
  };

  return <DynamicFilters variants={filterVariants} onCancel={handleCancel} />;
};

export default MainPage;
