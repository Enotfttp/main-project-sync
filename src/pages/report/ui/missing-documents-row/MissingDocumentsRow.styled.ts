import { SystemChevronDownOutline } from "@admiral-ds/icons";
import { IconPlacement, Link } from "@admiral-ds/react-ui";
import styled from "styled-components";

export const MissingRow = styled.div`
  border-bottom: 1px solid ${({ theme }) => theme.color["Neutral/Neutral 20"]};
`;

export const MissingHeader = styled.div`
  display: flex;
  align-items: center;
  padding: 4px 12px 3px 4px;
  color: ${({ theme }) => theme.color["Neutral/Neutral 90"]};
  font-size: 14px;
  line-height: 20px;
`;

export const ExpandButton = styled(IconPlacement)`
  margin: 0;
  flex-shrink: 0;
`;

export const Chevron = styled(SystemChevronDownOutline)<{
  $isOpened?: boolean;
}>`
  transition: transform 0.3s ease-in-out;
  transform: rotate(${({ $isOpened }) => ($isOpened ? 180 : 0)}deg);
`;

export const Details = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 4px 12px 12px 44px;
`;

export const Line = styled.div`
  display: flex;
  align-items: baseline;
  gap: 8px;
`;

export const IdLink = styled(Link)`
  white-space: normal;
`;
