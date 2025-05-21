import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const StyledHeader = styled.header`
  display: flex;
  justify-content: flex-start;
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
