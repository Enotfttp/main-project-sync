import { PackageDetailPage, PackageTabsLayout } from "./components";
import { StyledPackagePage } from "./PackagePage.styled";
import { Divider } from "@admiral-ds/react-ui";
import * as React from "react";
import { useParams } from "react-router-dom";

const PackagePage = () => {
  const { id } = useParams();
  if (!id) {
    throw new Error("Вы не выбрали пакет услуг");
  }

  return (
    <StyledPackagePage>
      <PackageDetailPage />
      <Divider />
      <PackageTabsLayout />
    </StyledPackagePage>
  );
};

export default PackagePage;
