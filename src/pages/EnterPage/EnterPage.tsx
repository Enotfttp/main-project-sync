import * as React from 'react';
import { TextButton } from '@admiral-ds/react-ui';
import { Login, Registration } from './components';
import { StyledEnterPage } from './EnterPage.styled';


const EnterPage = () => {
  const [isLogin, setLogin] = React.useState(true);

  const btnRedirect = React.useMemo(()=>(
    <TextButton text={`${isLogin ? 'Зарегистрироваться' : 'Войти'}`} onClick={()=>setLogin(!isLogin)}/>
  ),[isLogin]);

  return (
    <StyledEnterPage>
      {isLogin ? (<Login btnRedirect={btnRedirect} />) : (<Registration btnRedirect={btnRedirect} />)}
    </StyledEnterPage>
  );
};

export default EnterPage;
