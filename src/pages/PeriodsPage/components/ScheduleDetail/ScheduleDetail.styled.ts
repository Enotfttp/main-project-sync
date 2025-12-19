import { T } from "@admiral-ds/react-ui";
import styled from "styled-components";

export const StyledScheduleDetailPage = styled.div`
  display: flex;
  flex-direction: column;
`;

export const StyledTitle = styled(T)`
  margin: 5px 0 20px;
`;

export const StyledInfo = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 15px 0;
`;

export const StyledInfoRow = styled.div`
  flex: 0 0 33%;
  display: flex;
  flex-direction: column;
  gap: 5px;

  span:first-child {
    text-decoration: underline;
  }
`;
