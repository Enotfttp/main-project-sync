import { DateField } from "@admiral-ds/react-ui";
import styled from "styled-components";

export const StyledDateField = styled(DateField)`
  label {
    color: ${({ theme }) => theme.color["Neutral/Neutral 90"]} !important;
  }
`;
