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
  display: grid;
  grid-template-rows: auto auto minmax(0, 1fr);
  height: auto;
  min-height: 100vh;
`;

export const InfoPageContainer = styled(Container)`
  gap: 0;
  flex: none;
`;

export const InfoPageActions = styled.div`
  display: flex;
  grid-row: 3;
  align-self: end;
  justify-content: space-between;
  margin-top: auto;
  padding-top: 24px;
`;
