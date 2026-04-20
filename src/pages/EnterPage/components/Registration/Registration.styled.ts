import { Button, T } from "@admiral-ds/react-ui";
import styled from "styled-components";

export const StyledRegistrationPage = styled.div`
  background-color: ${({ theme }) => theme.color["Neutral/Neutral 00"]};
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 500px;
  padding: 30px;
`;

export const StyledHeader = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  margin-bottom: 20px;
`;

export const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 25px;
`;

export const StyledCSeparator = styled.div`
  display: flex;
  align-items: center;
  text-align: center;
  margin: 10px 0;
  color: #a0aec0;
  &::before,
  &::after {
    content: "";
    flex: 1;
    border-bottom: 1px solid #e2e8f0;
  }
`;

export const StyledSeparatorText = styled(T)`
  padding: 0 15px;
`;

export const StyledBtnEnter = styled(Button)`
  margin-top: 20px;
`;

export const StyledRegistrationText = styled(T)`
  display: flex;
  align-items: center;
  justify-content: center;
`;
