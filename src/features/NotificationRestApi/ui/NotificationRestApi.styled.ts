import styled, { keyframes } from "styled-components";

const slideInAnimation = keyframes`
  from {
    transform: translateY(100%);
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
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  gap: 12px;
  max-width: 300px;
  overflow-y: auto; 
  overflow-x: hidden;
  max-height: calc(100vh - 40px); 
  scroll-behavior: smooth;
  padding: 4px;
  scrollbar-width: thin;
   & > div {
    display: flex; 
    flex-direction: column;
    animation: ${slideInAnimation} 0.3s ease-out forwards;
    flex-shrink: 0;
  }
`;
