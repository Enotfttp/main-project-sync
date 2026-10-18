import { StyledInputEx, StyledPageSearch } from "./PageSearch.styled";
import { SystemSearchOutline } from "@admiral-ds/icons";
import { ChangeEvent, FC } from "react";

interface IPageSearch {
  value: string;
  onChange(value: string): void;
}

export const PageSearch: FC<IPageSearch> = ({ value, onChange }) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  return (
    <StyledPageSearch>
      <StyledInputEx
        placeholder="Введите название страницы"
        value={value}
        onChange={handleChange}
        iconsAfter={<SystemSearchOutline />}
      />
    </StyledPageSearch>
  );
};
