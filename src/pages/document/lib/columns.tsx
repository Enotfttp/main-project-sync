import {
  DocumentsAccountDetailOutline,
  ServiceInfoSolid,
} from "@admiral-ds/icons";
import { Column, Flex, Hint, IconButton } from "@admiral-ds/react-ui";
import {
  IDocumentInfo,
  mapDocumentStatus,
  mapOrderStatus,
} from "@entities/document/model";
import { normalizedDate } from "@shared/lib";
import React, { FC, useState } from "react";

const Purpose: FC<{ row: IDocumentInfo }> = ({ row }) => {
  const [visible, setVisible] = useState(false);

  const handleVisibility = (visible: boolean) => setVisible(visible);

  return (
    <Hint
      renderContent={() => row.purpose}
      visible={visible}
      onVisibilityChange={handleVisibility}
    >
      <IconButton dimension="m" appearance="primary">
        <ServiceInfoSolid aria-hidden />
      </IconButton>
    </Hint>
  );
};

const DocumentTypeMerge: FC<{ row: IDocumentInfo }> = ({ row }) => {
  const [visible, setVisible] = useState(false);

  const handleVisibility = (visible: boolean) => setVisible(visible);

  return (
    <Flex.Container>
      <Flex.Row style={{ alignItems: "center" }}>
        {row.documentType}
        {row.documentMerged && (
          <Hint
            renderContent={() => "Объединённый документ"}
            visible={visible}
            visibilityTrigger="hover"
            onVisibilityChange={handleVisibility}
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
    name: "documentId",
    title: "Идентификатор документа",
    width: "14%",
  },
  {
    name: "documentDate",
    title: "Дата документа",
    width: "12%",
    renderCell: (date) => {
      return normalizedDate(date);
    },
  },
  {
    name: "documentType",
    title: "Вид документа",
    width: "13%",
    renderCell: (_, row) => (
      <DocumentTypeMerge row={row as unknown as IDocumentInfo} />
    ),
  },
  {
    name: "documentProcessCode",
    title: "Управляющий признак",
    width: "13%",
  },
  {
    name: "documentStatus",
    title: "Статус документа",
    width: "13%",
    renderCell: (status) => {
      return mapDocumentStatus(status);
    },
  },
  {
    name: "orderStatus",
    title: "Статус исполнения РОЮЛ",
    width: "13%",
    renderCell: (status) => {
      return mapOrderStatus(status);
    },
  },
  {
    name: "amountFullCur",
    title: "Сумма документа",
    width: "12%",
  },
  {
    name: "purpose",
    title: "Назначение платежа",
    width: "10%",
    renderCell: (_, row) => <Purpose row={row as unknown as IDocumentInfo} />,
  },
];
