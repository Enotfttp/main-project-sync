import { Button, T } from "@admiral-ds/react-ui";
import styled from "styled-components";

export const ErrorLayout = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-height: 100vh;
  padding: 32px;
  box-sizing: border-box;
`;

export const ErrorContainer = styled.div`
  display: flex;
  text-align: center;
  flex-direction: column;
  justify-content: center;
  max-width: 600px;
  gap: 32px;
`;

export const StyledTitleError = styled(T)`
  color: ${({ theme }) => theme.color["Neutral/Neutral 50"]};
`;

export const StyledSubtitleError = styled(T)`
  color: ${({ theme }) => theme.color["Neutral/Neutral 40"]};
`;

export const StyledButton = styled(Button)`
  width: fit-content;
  margin: 0 auto;
`;

export const StyledButtonBlock = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
`;

export const StyledErrorDetails = styled.details`
  margin-top: 15px;
  text-align: left;

  summary {
    cursor: pointer;
    color: #718096;
    font-size: 14px;
    margin-bottom: 8px;
  }

  pre {
    background: #f7fafc;
    padding: 12px;
    border-radius: 6px;
    font-size: 12px;
    overflow-x: auto;
    border: 1px solid #e2e8f0;
    color: #4a5568;
  }
`;
