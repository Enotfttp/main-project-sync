import {
  StyledFiltersView,
  StyledIconCount,
  WrapperChip,
  WrapperFilters,
  WrapperInfo,
} from "./FiltersView.styled";
import { isFilledFilterValue } from "../lib/hasFilledFilter";
import { TFilterValue } from "../model/DynamicFilters.types";
import { IRenderField, TValue } from "../model/RenderFields.types";
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

const getChipLabel = (field: IRenderField, value: Exclude<TValue, null>) => {
  if (field.type === "date" || field.type === "date-range") {
    return normalizedDate(value as IsoDate);
  }

  if (field.type === "select" || field.type === "multiselect") {
    return (Array.isArray(value) ? value : [value])
      .map(
        (item) =>
          field.options?.find((option) => option.value === item)?.label ??
          String(item),
      )
      .join(", ");
  }

  return String(value);
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
      {fields.map((field) => {
        const value = filtersValue?.[field.id];

        return (
          <WrapperInfo key={field.id}>
            <T font="Additional/S" color="Neutral/Neutral 50">
              {field.label}
            </T>
            <WrapperChip dimension="m">
              {isFilledFilterValue(value) ? (
                <Chips
                  dimension="m"
                  appearance="filled"
                  key={field.id}
                  onClose={() => handleClose(field.id)}
                >
                  {getChipLabel(field, value)}
                </Chips>
              ) : (
                <T font="Additional/S" color="Neutral/Neutral 50">
                  -
                </T>
              )}
            </WrapperChip>
          </WrapperInfo>
        );
      })}
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
