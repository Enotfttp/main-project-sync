import {
  StyledApproveCategoryFlagOutline,
  StyledApproveSentOutline,
  StyledErrorCloseCircleOutline,
  StyledWarningTriangleOutline,
} from "./RequestTypes.styled";
import { DocumentsInvoiceOutline, SystemTimeOutline } from "@admiral-ds/icons";
import { DARK_THEME, LIGHT_THEME } from "@admiral-ds/react-ui";
import { ERequestTypeRequestStatus } from "@entities/requestTypes/types";
import { TTag } from "@shared/types/types";
import React from "react";

export const statusConfig = (
  theme: typeof DARK_THEME | typeof LIGHT_THEME,
): TTag<keyof typeof ERequestTypeRequestStatus> => ({
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
      background: `var(--admiral-color-Attention_Attention10, ${theme.color["Attention/Attention 10"]})`,
      border: `var(--admiral-color-Attention_Attention40, ${theme.color["Attention/Attention 40"]})`,
      backgroundHover: `var(--admiral-color-Attention_Attention20, ${theme.color["Attention/Attention 20"]})`,
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
});
