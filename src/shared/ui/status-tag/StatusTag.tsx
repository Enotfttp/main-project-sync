import { Tag, TagKind } from "@admiral-ds/react-ui";
import { FC, ReactNode } from "react";
import styled from "styled-components";

const StatusDot = styled.span<{ $kind: TagKind }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 16px;
  height: 16px;

  &::before {
    content: "";
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: ${({ $kind, theme }) => {
      switch ($kind) {
        case "success":
        case "green":
          return `var(--admiral-color-Success_Success50Main, ${theme.color["Success/Success 50 Main"]})`;
        case "primary":
        case "blue":
          return `var(--admiral-color-Primary_Primary60Main, ${theme.color["Primary/Primary 60 Main"]})`;
        case "danger":
        case "red":
          return `var(--admiral-color-Error_Error60Main, ${theme.color["Error/Error 60 Main"]})`;
        case "warning":
        case "orange":
          return `var(--admiral-color-Warning_Warning50Main, ${theme.color["Warning/Warning 50 Main"]})`;
        default:
          return `var(--admiral-color-Neutral_Neutral50, ${theme.color["Neutral/Neutral 50"]})`;
      }
    }};
  }
`;

interface StatusTagProps {
  kind: TagKind;
  children: ReactNode;
}

export const StatusTag: FC<StatusTagProps> = ({ kind, children }) => (
  <Tag
    kind={kind}
    statusViaBackground
    isBorderHidden
    icon={<StatusDot $kind={kind} />}
  >
    {children}
  </Tag>
);
