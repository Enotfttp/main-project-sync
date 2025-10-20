import * as React from 'react';
import { Button } from '@admiral-ds/react-ui';


// Тут можно протестить как-нибудь функционал.
const TestUIPage = () => {
  const [test, setTest] = React.useState(false);

  const handleTest = () =>{
    setTest(true);
    throw new Error('Тестовая ошибка');
  };

  if(test){
    throw new Error('Тестовая ошибка');
  }

  return <>Тестовая страница
    <Button
      onClick={handleTest}
      appearance="primary"
    >
      Нажми на меня
    </Button>
  </>;
};

export default TestUIPage;
