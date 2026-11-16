import { ServiceCheckSolid, ServiceCloseCircleSolid } from "@admiral-ds/icons";
import styled from "styled-components";

export const StatusBody = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  padding: 12px 0 8px;
  text-align: center;

  svg {
    width: 40px;
    height: 40px;
  }
`;

export const SuccessIcon = styled(ServiceCheckSolid)`
  path {
    fill: ${({ theme }) => theme.color["Success/Success 50 Main"]};
  }
`;

export const ErrorIcon = styled(ServiceCloseCircleSolid)`
  path {
    fill: ${({ theme }) => theme.color["Error/Error 60 Main"]};
  }
`;
