import styled, { keyframes } from "styled-components";

const slideInAnimation = keyframes`
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`;

export const StyledNotificationStack = styled.div`
  position: fixed;
  right: 16px;
  bottom: 16px;
  margin: 20px;
  z-index: 1000;
  width: 15%;
  overflow: hidden auto;
  max-height: calc(100vh - 40px);
  scroll-behavior: smooth;
  padding: 4px;
  scrollbar-width: thin;
  & > div {
    display: flex;
    flex-direction: column;
    animation: ${slideInAnimation} 0.3s ease-out forwards;
    flex-shrink: 0;
    margin: 10px 0;
  }
`;
