import {
  CategoryFlagOutline,
  ServiceCloseCircleOutline,
  ServiceErrorTriangleOutline,
  ServiceSentOutline,
} from "@admiral-ds/icons";
import { LIGHT_THEME, Tag } from "@admiral-ds/react-ui";
import styled from "styled-components";

const colors = LIGHT_THEME.color;

export const StyledApproveSentOutline = styled(ServiceSentOutline)`
  > path {
    fill: ${colors["Success/Success 50 Main"]} !important;
  }
`;

export const StyledErrorCloseCircleOutline = styled(ServiceCloseCircleOutline)`
  > path {
    fill: ${colors["Error/Error 60 Main"]} !important;
  }
`;

export const StyledWarningTriangleOutline = styled(ServiceErrorTriangleOutline)`
  > path {
    fill: ${colors["Attention/Attention 50 Main"]} !important;
  }
`;

export const StyledApproveCategoryFlagOutline = styled(CategoryFlagOutline)`
  > path {
    fill: ${colors["Success/Success 50 Main"]} !important;
  }
`;

export const StyledTag = styled(Tag)`
  height: 40px;
`;
