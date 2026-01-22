import {
  StyledApproveCategoryFlagOutline,
  StyledApproveSentOutline,
  StyledErrorCloseCircleOutline,
  StyledWarningTriangleOutline,
} from "./RequestTypes.styled";
import { DocumentsInvoiceOutline, SystemTimeOutline } from "@admiral-ds/icons";
import { LIGHT_THEME } from "@admiral-ds/react-ui";
import { TRequestTypeRequestStatus } from "@entities/requestTypes/types";
import { TTag } from "@shared/types/types";
import React from "react";

export const statusConfig: TTag<TRequestTypeRequestStatus> = {
  CREATED: {
    kind: "neutral",
    icon: <DocumentsInvoiceOutline />,
  },
  ACCEPTED: {
    kind: "primary",
    icon: <StyledApproveSentOutline />,
  },
  REJECTED: {
    kind: {
      background: `var(--admiral-color-Attention_Attention10, ${LIGHT_THEME.color["Attention/Attention 10"]})`,
      border: `var(--admiral-color-Attention_Attention40, ${LIGHT_THEME.color["Attention/Attention 40"]})`,
      backgroundHover: `var(--admiral-color-Attention_Attention20, ${LIGHT_THEME.color["Attention/Attention 20"]})`,
    },
    icon: <StyledWarningTriangleOutline />,
  },
  PROCESSED: {
    kind: "primary",
    icon: <SystemTimeOutline />,
  },
  COMPLETED: {
    kind: "success",
    icon: <StyledApproveCategoryFlagOutline />,
  },
  ERROR: {
    kind: "danger",
    icon: <StyledErrorCloseCircleOutline />,
  },
};
