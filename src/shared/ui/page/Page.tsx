import styled from "styled-components";

export const Page = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  padding: 32px;
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  min-height: 0;
  box-sizing: border-box;
  width: 100%;
  padding: 16px 24px;
  background-color: ${({ theme }) => theme.color["Neutral/Neutral 00"]};
  gap: 24px;
`;
