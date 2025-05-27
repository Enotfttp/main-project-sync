import styled from 'styled-components';
import { Breadcrumbs } from '@admiral-ds/react-ui';

export const BreadcrumbsStyled = styled(Breadcrumbs)`
  // контейнер, куда мы встраиваем крошки имеет паддинги больше, чем нужен отсуп крошкам
  & > ol {
    margin: -8px 0 10px -2px;
  }
`;
