import { useState } from 'react';
import type { ChangeEvent } from 'react';
import  {  ThemeProvider } from 'styled-components';
import {LIGHT_THEME, MultiInputField} from '@admiral-ds/react-ui';
import type { InputExFieldProps } from '@admiral-ds/react-ui';
import {StyledChip} from "@features/Search/Search.styled.ts";
import {uid} from "@shared/index.ts";

export const Search = ({
  label = '',
  extraText = '',
  displayClearIcon = true,
  ...props
}: InputExFieldProps )   =>{
  const [value, setValue] = useState('');
  const [listValue, setListValue] = useState<React.ComponentProps<typeof StyledChip>[]>([]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const currentValue = e.currentTarget.value;

    setValue(currentValue);
  };

  const handleDeleteChip = (id?: string) => {
    setListValue((prevState) => {
      return prevState.filter((elem) => elem.id !== id);
    });
  };

  const handleKeyDown = () => {
    const newValue = value.trim();

    if (newValue) {
      setListValue((prevState) => {
        return [...prevState, { id: uid(), children: newValue }];
      });
      setValue('');
    }
  };

  const handleClearListValue = () => {
    setListValue([]);
  };


  return (
    <ThemeProvider theme={LIGHT_THEME}>
      <MultiInputField
        data-container-id="MultiSearchFieldId"
        {...props}
        label={label}
        extraText={extraText}
        value={value}
        onInputComplete={handleKeyDown}
        onClearOptions={handleClearListValue}
        onChange={handleChange}
        displayClearIcon={displayClearIcon && listValue.length !== 0}
      >
        {listValue.map((item, index) => (
          <StyledChip
            {...item}
            key={index}
            onClose={props.readOnly || props.disableCopying ? undefined : handleDeleteChip}
            tabIndex={-1}
            dimension="s"
            appearance="filled"
            readOnly={props.readOnly}
            disabled={props.disabled}
          />
        ))}
      </MultiInputField>
    </ThemeProvider>
  )
}
