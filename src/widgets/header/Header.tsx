import { IconButton } from '@admiral-ds/react-ui';
import { StyledHeader, StyledIconLogout, StyledLink } from './Header.styled';
import { useLogoutMutation } from '@entities/auth';

export const Header = () => {
  const {mutateAsync} = useLogoutMutation();

  return(
    <StyledHeader>
      <StyledLink to="/">КОМСОЮЛ</StyledLink>
      <IconButton dimension="xl" onClick={()=>mutateAsync()}>
        <StyledIconLogout />
      </IconButton>
    </StyledHeader>
  );};
