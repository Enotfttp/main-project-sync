import styled from "styled-components";

export const ErrorContainer = styled.div`
  position: absolute;
  top: 50%;
  right: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  gap: 32px;
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
