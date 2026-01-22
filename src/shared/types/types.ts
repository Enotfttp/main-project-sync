import {
  TagInternalProps,
  TagSizeProps,
  TagVisualProps,
} from "@admiral-ds/react-ui";

export type TTag<T extends string> = Record<T, TTagProps>;

export type TTagProps = TagVisualProps & TagSizeProps & TagInternalProps;
