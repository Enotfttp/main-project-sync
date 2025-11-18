import { LayoutSpinner } from "./Loader.styled";
import { Spinner } from "@admiral-ds/react-ui";
import * as React from "react";

export const Loader = () => (
  <LayoutSpinner>
    <Spinner dimension="l" />
  </LayoutSpinner>
);
