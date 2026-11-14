import { StyledPageBack } from "./PageBack.styled";
import { SystemArrowLeftOutline } from "@admiral-ds/icons";
import { Link, T } from "@admiral-ds/react-ui";
import { resolvePageNavigation, TPageNavigation } from "@shared/lib";
import { FC, useMemo } from "react";
import { Link as RouterLink, useLocation } from "react-router-dom";

interface IProps {
  navigation?: TPageNavigation;
  onBack?: () => void;
}

export const PageBack: FC<IProps> = ({
  navigation: navigationOverride,
  onBack,
}) => {
  const { pathname } = useLocation();
  const navigation = useMemo(
    () => navigationOverride ?? resolvePageNavigation(pathname),
    [navigationOverride, pathname],
  );

  if (!navigation) return null;

  return (
    <StyledPageBack>
      <Link
        as={RouterLink}
        to={navigation.to}
        dimension="m"
        appearance="primary"
        onClick={
          onBack
            ? (event) => {
                event.preventDefault();
                onBack();
              }
            : undefined
        }
      >
        <SystemArrowLeftOutline />
        {navigation.backLabel}
      </Link>
      <T font="Header/H5" color="Neutral/Neutral 90" as="h1">
        {navigation.title}
      </T>
    </StyledPageBack>
  );
};
