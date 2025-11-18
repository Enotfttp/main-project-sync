import { SystemSignInSolid } from "@admiral-ds/icons";
import { Link } from "react-router-dom";
import styled from "styled-components";

export const StyledHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 65px;
  height: 100px;
  background-color: #1d6f95;
`;

export const StyledLink = styled(Link)`
  text-decoration: none;
  color: #ffffff;
  font-size: 40px;
  letter-spacing: 3px;
  font-weight: 600;
`;

export const StyledIconLogout = styled(SystemSignInSolid)`
  & > g {
    fill: #fff !important;
  }
`;
