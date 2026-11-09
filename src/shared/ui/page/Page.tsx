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

export const InfoPage = styled(Page)`
  height: auto;
  min-height: 100vh;
`;

export const InfoPageContainer = styled(Container)`
  gap: 0;
`;

export const InfoPageActions = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 24px;
`;
