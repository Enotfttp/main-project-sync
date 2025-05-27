import { Spinner } from '@admiral-ds/react-ui';
import * as React from 'react';
import { LayoutSpinner } from './Loader.styled';

export const Loader = () => (
  <LayoutSpinner>
    <Spinner dimension="l" />
  </LayoutSpinner>
);
