import { Button } from "@admiral-ds/react-ui";
import { routesPath } from "@app/routes";
import { Container, Page, PageBack } from "@shared/ui";
import { FC } from "react";
import { useNavigate } from "react-router-dom";

const ReportChartPage: FC = () => {
  const navigate = useNavigate();

  const handleClick1 = () => {
    navigate(routesPath.report.createdOrAcceptedDocuments.root);
  };

  const handleClick2 = () => {
    navigate(routesPath.report.cardIndexControl.root);
  };

  return (
    <Page>
      <PageBack />
      <Button onClick={handleClick1}>createdOrAcceptedDocuments</Button>
      <Button onClick={handleClick2}>cardIndexControl</Button>
      <Container>ReportChartPage</Container>
    </Page>
  );
};

export default ReportChartPage;
