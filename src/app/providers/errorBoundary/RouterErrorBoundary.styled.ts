import { ServiceErrorTriangleSolid } from "@admiral-ds/icons";
import { Button } from "@admiral-ds/react-ui";
import { Link } from "react-router-dom";
import styled from "styled-components";

export const ErrorContainer = styled.div<{ type: "modal" | "page" }>`
  margin-top: ${(props) => (props.type === "modal" ? 0 : "100px")};
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 10px;
`;

export const StyledServiceErrorTriangleSolid = styled(
  ServiceErrorTriangleSolid,
)`
  width: 100px;
  height: 100px;
  > path {
    fill: #cfcf23;
  }

  @keyframes bounce {
    0%,
    20%,
    50%,
    80%,
    100% {
      transform: translateY(0);
    }
    40% {
      transform: translateY(-10px);
    }
    60% {
      transform: translateY(-5px);
    }
  }
  animation: bounce 2s infinite;
`;

export const StyledErrorAction = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 30px;
  align-items: center;
  margin-top: 10px;
`;

export const StyledLink = styled(Link)`
  text-decoration: none;
  color: #ffffff;
`;

export const StyledButton = styled(Button)`
  transition: all 0.2s ease;
  &:hover {
    transform: translateY(-2px);
  }
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
