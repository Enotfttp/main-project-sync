import { T } from "@admiral-ds/react-ui";
import styled from "styled-components";

export const ErrorStateRoot = styled.div`
  display: flex;
  text-align: center;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 32px;
  padding-top: 16px;
`;

export const StyledTitleError = styled(T)`
  color: ${({ theme }) => theme.color["Neutral/Neutral 50"]};
`;

export const StyledSubtitleError = styled(T)`
  color: ${({ theme }) => theme.color["Neutral/Neutral 40"]};
`;

export const StyledButtonBlock = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
`;

export const StyledErrorDetails = styled.details`
  text-align: left;
  width: 100%;

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
    margin: 0;
    white-space: pre-wrap;
  }
`;
