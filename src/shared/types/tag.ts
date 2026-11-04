import {
  TagInternalProps,
  TagSizeProps,
  TagVisualProps,
} from "@admiral-ds/react-ui";

export type TTag<T extends string> = Record<
  T,
  TTagProps & { text?: string; extraText?: string }
>;

export type TTagProps = TagVisualProps & TagSizeProps & TagInternalProps;
