import { StyledHeader, StyledIconLogout, StyledLink } from "./Header.styled";
import { IconButton } from "@admiral-ds/react-ui";
import { useLogoutMutation } from "@entities/auth/auth.hook";

export const Header = () => {
  const { mutateAsync } = useLogoutMutation();

  return (
    <StyledHeader>
      <StyledLink to="/">Пакеты услуг</StyledLink>
      <IconButton dimension="xl" onClick={() => mutateAsync()}>
        <StyledIconLogout />
      </IconButton>
    </StyledHeader>
  );
};
