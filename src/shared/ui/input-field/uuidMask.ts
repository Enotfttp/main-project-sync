import { InputFieldProps } from "@admiral-ds/react-ui";

export const UUID_LENGTH = 36;

const hexOnly = (value: string) => value.replace(/[^0-9a-f]/gi, "");

const formatUuid = (value: string) => {
  const hex = hexOnly(value).slice(0, 32).toLowerCase();
  const parts: string[] = [];
  let offset = 0;

  for (const size of [8, 4, 4, 4, 12]) {
    if (offset >= hex.length) break;

    parts.push(hex.slice(offset, offset + size));
    offset += size;
  }

  return parts.join("-");
};

export const isUuid = (value: string) =>
  value.length === UUID_LENGTH && formatUuid(value) === value;

const cursorAt = (value: string, hexCount: number) => {
  if (!hexCount) return 0;

  let seen = 0;

  for (let index = 0; index < value.length; index += 1) {
    if (value[index] === "-") continue;

    seen += 1;
    if (seen === hexCount) return index + 1;
  }

  return value.length;
};

export const maskUuid: InputFieldProps["handleInput"] = (data) => {
  if (!data) return {};

  const raw = data.value ?? "";
  const value = formatUuid(raw);
  const cursor = cursorAt(
    value,
    hexOnly(raw.slice(0, data.selectionStart ?? raw.length)).length,
  );

  return { ...data, value, selectionStart: cursor, selectionEnd: cursor };
};
