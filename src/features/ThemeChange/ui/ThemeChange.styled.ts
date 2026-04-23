import {
  SystemDarkModeOutline,
  SystemLightModeOutline,
} from "@admiral-ds/icons";
import styled from "styled-components";

export const StyledSystemDarkModeOutline = styled(SystemDarkModeOutline)`
  > path {
    fill: ${({ theme }) =>
      theme.color["Special/Dark Static Neutral 00"]} !important;
  }
`;

export const StyledSystemLightModeOutline = styled(SystemLightModeOutline)`
  > path {
    fill: ${({ theme }) => theme.color["Attention/Attention 40"]} !important;
  }
`;
