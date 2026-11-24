import { Details, IdLink, Line } from "./MissingDocumentsRow.styled";
import { T, TableRow } from "@admiral-ds/react-ui";
import { routesPath } from "@app/routes";
import { IReportInfo } from "@entities/report/model";
import { MouseEvent } from "react";
import { generatePath, Link as RouterLink } from "react-router-dom";

const stopRowClick = (event: MouseEvent<HTMLAnchorElement>) => {
  event.stopPropagation();
};

export const renderMissingDocumentsDetails = (row: TableRow) => {
  const { requestId, scheduleSourceGuid } = row as unknown as IReportInfo;

  return (
    <Details>
      <Line>
        <T font="Body/Body 2 Long">Идентификатор запроса:</T>
        <IdLink
          as={RouterLink}
          to={generatePath(routesPath.request.detail.history.root, {
            id: requestId,
          })}
          dimension="s"
          appearance="primary"
          onClick={stopRowClick}
        >
          {requestId}
        </IdLink>
      </Line>
      <Line>
        <T font="Body/Body 2 Long">Идентификатор графика:</T>
        <IdLink
          as={RouterLink}
          to={generatePath(routesPath.request.detail.schedule.root, {
            id: requestId,
            idSchedule: scheduleSourceGuid,
          })}
          dimension="s"
          appearance="primary"
          onClick={stopRowClick}
        >
          {scheduleSourceGuid}
        </IdLink>
      </Line>
    </Details>
  );
};
