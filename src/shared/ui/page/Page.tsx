import styled from "styled-components";

export const Page = styled.div`
  padding: 32px;
  min-height: 100vh;
  box-sizing: border-box;
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 16px 24px;
  box-sizing: border-box;
  width: 100%;
  height: calc(100vh - 64px);
  background-color: ${({ theme }) => theme.color["Neutral/Neutral 00"]};
  gap: 24px;
`;
