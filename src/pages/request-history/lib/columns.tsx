import {
  DocumentsAccountDetailOutline,
  ServiceErrorSolid,
} from "@admiral-ds/icons";
import { Column, Flex, Hint, IconButton } from "@admiral-ds/react-ui";
import {
  IRequestHistoryInfo,
  mapEventType,
  mapResultType,
} from "@entities/request/model";
import { PutToOutboxStatusTag, RequestStatusTag } from "@entities/request/ui";
import React, { FC, useState } from "react";
import styled from "styled-components";

const StyledServiceErrorSolid = styled(ServiceErrorSolid)`
  &&& path {
    fill: ${({ theme }) => theme.color["Warning/Warning 50 Main"]};
  }
`;

const HistoryActions: FC<{ row: IRequestHistoryInfo }> = ({ row }) => {
  const [visibleError, setVisibleError] = useState(false);
  const [visibleContent, setVisibleContent] = useState(false);

  const handleVisibilityErrorChange = (visible: boolean) =>
    setVisibleError(visible);
  const handleVisibilityContentChange = (visible: boolean) =>
    setVisibleContent(visible);

  return (
    <Flex.Container>
      <Flex.Row>
        {row?.errorMessage && (
          <Hint
            renderContent={() => row.errorMessage}
            visible={visibleError}
            onVisibilityChange={handleVisibilityErrorChange}
          >
            <IconButton dimension="m">
              <StyledServiceErrorSolid />
            </IconButton>
          </Hint>
        )}
        {row?.content && (
          <Hint
            renderContent={() => row.content}
            visible={visibleContent}
            onVisibilityChange={handleVisibilityContentChange}
          >
            <IconButton dimension="m" appearance="primary">
              <DocumentsAccountDetailOutline aria-hidden />
            </IconButton>
          </Hint>
        )}
      </Flex.Row>
    </Flex.Container>
  );
};

export const columnList: Column[] = [
  {
    name: "requestHistoryId",
    title: "Идентификатор запроса",
    width: "18%",
  },
  {
    name: "eventType",
    title: "Тип события",
    width: "18%",
    renderCell: (status) => {
      return mapEventType(status);
    },
  },
  {
    name: "requestStatus",
    title: "Статус запроса",
    width: "18%",
    renderCell(status) {
      return <RequestStatusTag status={status} />;
    },
  },
  {
    name: "resultType",
    title: "Результат обработки",
    width: "18%",
    renderCell(status) {
      return mapResultType(status);
    },
  },
  {
    name: "putToOutboxStatus",
    title: "Статус отправки",
    width: "18%",
    renderCell(status) {
      return <PutToOutboxStatusTag status={status} />;
    },
  },
  {
    name: "actions",
    title: "Действия",
    width: "6%",
    renderCell: (_, row) => (
      <HistoryActions row={row as unknown as IRequestHistoryInfo} />
    ),
  },
];
