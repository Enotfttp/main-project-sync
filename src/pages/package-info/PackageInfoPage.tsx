import { PackageInfo } from "./ui/PackageInfo";
import { Button } from "@admiral-ds/react-ui";
import { resolveChildPath } from "@shared/lib";
import { PageBack } from "@shared/ui";
import {
  InfoPage,
  InfoPageActions,
  InfoPageContainer,
} from "@shared/ui/page/Page";
import { FC } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

export const PackageInfoPage: FC = () => {
  const { idPackage } = useParams();
  const { pathname } = useLocation();
  const navigate = useNavigate();

  if (!idPackage) throw new Error("Нет id пакета");

  const optionPath = resolveChildPath(pathname, "option");

  const handlePeriods = () => {
    if (optionPath) navigate(optionPath);
  };

  return (
    <InfoPage>
      <PageBack />
      <InfoPageContainer>
        <PackageInfo id={idPackage} />
      </InfoPageContainer>
      <InfoPageActions>
        <Button
          type="button"
          appearance="primary"
          dimension="m"
          onClick={handlePeriods}
        >
          Получить информацию по опциям
        </Button>
      </InfoPageActions>
    </InfoPage>
  );
};

export default PackageInfoPage;
