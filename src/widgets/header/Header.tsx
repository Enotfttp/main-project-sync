import { StyledHeader, StyledIconLogout, StyledLink } from "./Header.styled";
import { IconButton } from "@admiral-ds/react-ui";
import { useLogoutMutation } from "@entities/auth/hook";
import { ThemeChange } from "@features/ThemeChange/ui/ThemeChange";

export const Header = () => {
  const { mutateAsync } = useLogoutMutation();

  return (
    <StyledHeader>
      <StyledLink to="/">Пакеты услуг</StyledLink>
      <div>
        <ThemeChange />
        <IconButton dimension="xl" onClick={() => mutateAsync()}>
          <StyledIconLogout />
        </IconButton>
      </div>
    </StyledHeader>
  );
};
