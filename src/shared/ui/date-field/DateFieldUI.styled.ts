import { DateField } from "@admiral-ds/react-ui";
import styled from "styled-components";

export const StyledDateField = styled(DateField)`
  label {
    color: ${({ theme }) => theme.color["Neutral/Neutral 90"]} !important;
  }
`;

export const CalendarAnchor = styled.div`
  position: relative;

  > div:has(.dropdown-container) {
    position: absolute !important;
    top: 100% !important;
    right: 0 !important;
    left: auto !important;
    width: max-content !important;
    height: auto !important;
  }

  > .dropdown-container {
    display: none;
  }
`;
