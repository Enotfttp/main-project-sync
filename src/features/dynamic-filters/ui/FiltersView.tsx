import {
  StyledFiltersView,
  StyledIconCount,
  WrapperChip,
  WrapperFilters,
  WrapperInfo,
} from "./FiltersView.styled";
import {
  formatFilterValue,
  isFilledFilterValue,
} from "../lib/formatFilterValue";
import { TFilterValue } from "../model/DynamicFilters.types";
import { IRenderField } from "../model/RenderFields.types";
import { SystemFilterOutline } from "@admiral-ds/icons";
import { Chips, IconButton, T } from "@admiral-ds/react-ui";
import { FC } from "react";

interface IProps {
  fields: IRenderField[];
  totalElements?: number;
  handleClose(name: string): void;
  filtersValue?: TFilterValue;
  handleOpenFilters(): void;
}

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
        const value = filtersValue?.[field.name];

        return (
          <WrapperInfo key={field.name}>
            <T font="Additional/S" color="Neutral/Neutral 50">
              {field.label}
            </T>
            <WrapperChip dimension="m">
              {isFilledFilterValue(value) ? (
                <Chips
                  dimension="m"
                  appearance="filled"
                  onClose={() => handleClose(field.name)}
                >
                  {formatFilterValue(field, value)}
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
