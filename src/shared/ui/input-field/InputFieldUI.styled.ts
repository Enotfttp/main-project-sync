import { InputField, NumberInputField } from "@admiral-ds/react-ui";
import styled, { css } from "styled-components";

export const labelColor = css`
  label {
    color: ${({ theme }) => theme.color["Neutral/Neutral 90"]} !important;
  }
`;

export const StyledInputField = styled(InputField)`
  ${labelColor}
`;

export const StyledNumberInputField = styled(NumberInputField)`
  ${labelColor}
`;
