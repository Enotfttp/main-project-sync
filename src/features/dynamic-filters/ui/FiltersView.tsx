import {
  StyledFiltersView,
  StyledIconCount,
  WrapperChip,
  WrapperFilters,
  WrapperInfo,
} from "./FiltersView.styled";
import { TFilterValue } from "../model/DynamicFilters.types";
import { IRenderField } from "../model/RenderFields.types";
import { SystemFilterOutline } from "@admiral-ds/icons";
import { Chips, IconButton, T } from "@admiral-ds/react-ui";
import { normalizedDate } from "@shared/lib";
import { FC } from "react";

interface IProps {
  fields: IRenderField[];
  totalElements?: number;
  handleClose(id: string): void;
  filtersValue?: TFilterValue;
  handleOpenFilters(): void;
}

const getValueSelectField = (
  field: IRenderField,
  filtersValue: TFilterValue,
) => {
  const value = filtersValue[field.id];

  if (field.type === "date" || field.type === "date-range") {
    return normalizedDate(value as IsoDate);
  }

  if (field.type === "select") {
    return field.options?.find((el) => el.value === value)!.label;
  }

  return "";
};

export const FiltersView: FC<IProps> = ({
  fields,
  handleClose,
  filtersValue,
  totalElements,
  handleOpenFilters,
}) => (
  <StyledFiltersView>
    <WrapperFilters>
      {fields.map((field) => (
        <WrapperInfo key={field.id}>
          <T font="Additional/S" color="Neutral/Neutral 50">
            {field.label}
          </T>
          <WrapperChip dimension="m">
            {filtersValue?.[field.id] ? (
              <Chips
                dimension="m"
                appearance="filled"
                key={field.id}
                onClose={() => handleClose(field.id)}
              >
                {getValueSelectField(field, filtersValue)}
              </Chips>
            ) : (
              <T font="Additional/S" color="Neutral/Neutral 50">
                -
              </T>
            )}
          </WrapperChip>
        </WrapperInfo>
      ))}
    </WrapperFilters>
    <StyledIconCount>
      {totalElements && (
        <T font="Body/Body 2 Short" color="Neutral/Neutral 50">
          Найдено: {totalElements}
        </T>
      )}
      <IconButton
        onClick={handleOpenFilters}
        dimension="s"
        appearance="primary"
        type="button"
      >
        <SystemFilterOutline />
      </IconButton>
    </StyledIconCount>
  </StyledFiltersView>
);
