import { useState } from 'react';
import type { ChangeEvent } from 'react';
import { MultiInputField } from '@admiral-ds/react-ui';
import type { InputExFieldProps } from '@admiral-ds/react-ui';
import { StyledChip } from './Search.styled';
import { uid } from '@shared/index.ts';

interface ISearch extends InputExFieldProps {
  listValue: React.ComponentProps<typeof StyledChip>[];
  // setListValue: React.Dispatch<React.SetStateAction<{id:string, children:unknown[]}[]>>
  setListValue: React.Dispatch<React.SetStateAction<React.ComponentProps<typeof StyledChip>[]>>;
}

export const Search = ({ label = '', extraText = '', displayClearIcon = true, listValue, setListValue, ...props }: ISearch) => {
  const [value, setValue] = useState('');

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
  );
};
