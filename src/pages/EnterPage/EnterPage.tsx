import { Login, Registration } from "./components";
import { StyledEnterPage } from "./EnterPage.styled";
import { TextButton } from "@admiral-ds/react-ui";
import * as React from "react";

const EnterPage = () => {
  const [isLogin, setLogin] = React.useState(true);

  const btnRedirect = React.useMemo(
    () => (
      <TextButton
        text={`${isLogin ? "Зарегистрироваться" : "Войти"}`}
        onClick={() => setLogin(!isLogin)}
      />
    ),
    [isLogin],
  );

  return (
    <StyledEnterPage>
      {isLogin ? (
        <Login btnRedirect={btnRedirect} />
      ) : (
        <Registration btnRedirect={btnRedirect} />
      )}
    </StyledEnterPage>
  );
};

export default EnterPage;
