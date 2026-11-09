import { ScheduleInfo } from "./ui/ScheduleInfo";
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

export const ScheduleInfoPage: FC = () => {
  const { idSchedule } = useParams();
  const { pathname } = useLocation();
  const navigate = useNavigate();

  if (!idSchedule) throw new Error("Нет id графика");

  const periodPath = resolveChildPath(pathname, "period");

  const handlePeriods = () => {
    if (periodPath) navigate(periodPath);
  };

  return (
    <InfoPage>
      <PageBack />
      <InfoPageContainer>
        <ScheduleInfo id={idSchedule} />
      </InfoPageContainer>
      <InfoPageActions>
        <Button
          type="button"
          appearance="primary"
          dimension="m"
          onClick={handlePeriods}
        >
          Получить информацию по периодам
        </Button>
      </InfoPageActions>
    </InfoPage>
  );
};

export default ScheduleInfoPage;
