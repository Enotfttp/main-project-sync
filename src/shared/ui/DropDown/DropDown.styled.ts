import {
  SystemSmallArrowDownOutline,
  SystemSmallArrowUpOutline,
} from "@admiral-ds/icons";
import { Button } from "@admiral-ds/react-ui";
import styled from "styled-components";

export const ButtonStyled = styled(Button)`
  padding: 0 !important;
`;

export const StyledSSystemSmallArrowUpOutline = styled(
  SystemSmallArrowUpOutline,
)`
  > path {
    fill: ${({ theme }) => theme.color["Neutral/Neutral 90"]} !important;
  }
`;

export const StyledSystemSmallArrowDownOutline = styled(
  SystemSmallArrowDownOutline,
)`
  > path {
    fill: ${({ theme }) => theme.color["Neutral/Neutral 90"]} !important;
  }
`;

export const DropDownStyled = styled.div<{ $isShow: boolean }>`
  margin-top: 20px;
  opacity: ${(props) => (props.$isShow ? 0.7 : 1)};
  transition: opacity 0.9s ease-in-out;

  /* Плавное появление при загрузке */
  animation: fadeInScale 0.4s ease-out;

  @keyframes fadeInScale {
    from {
      opacity: 0;
      transform: scale(0.98);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }
`;
