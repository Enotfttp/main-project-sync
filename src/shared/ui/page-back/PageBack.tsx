import { StyledPageBack } from "./PageBack.styled";
import { SystemArrowLeftOutline } from "@admiral-ds/icons";
import { Link, T } from "@admiral-ds/react-ui";
import { resolvePageNavigation } from "@shared/lib";
import { FC, useMemo } from "react";
import { Link as RouterLink, useLocation } from "react-router-dom";

export const PageBack: FC = () => {
  const { pathname } = useLocation();
  const navigation = useMemo(() => resolvePageNavigation(pathname), [pathname]);
  console.log("navigation: ", pathname);
  if (!navigation) return null;

  return (
    <StyledPageBack>
      <Link
        as={RouterLink}
        to={navigation.to}
        dimension="m"
        appearance="primary"
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
