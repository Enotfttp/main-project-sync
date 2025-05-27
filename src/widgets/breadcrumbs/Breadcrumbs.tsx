import React from 'react';
import { BreadcrumbsProps } from '@admiral-ds/react-ui';
import { BreadcrumbsStyled } from './Breadcrumbs.styled';
import { useBreadcrumbs } from '@widgets/breadcrumbs/Breadcrumbs.hook.ts';

export const Breadcrumbs = ({ ...props }: Partial<BreadcrumbsProps>) => {
  const items = useBreadcrumbs();
  return items.length > 0 ? <BreadcrumbsStyled dimension="m" data-testid="breadcrumbs" items={items} {...props} /> : <></>;
};
