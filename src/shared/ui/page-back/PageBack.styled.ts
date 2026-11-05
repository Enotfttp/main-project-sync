import styled from "styled-components";

export const StyledPageBack = styled.nav`
  display: flex;
  align-items: center;
  gap: 16px;
  min-height: 32px;
  margin-bottom: 24px;

  a {
    display: flex;
    align-items: center;
    gap: 8px;
  }
  svg {
    width: 24px;
    height: 24px;
    flex-shrink: 0;
  }
`;
