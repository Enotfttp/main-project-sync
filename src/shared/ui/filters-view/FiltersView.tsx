import {
  StyledFiltersView,
  StyledIconCount,
  WrapperChip,
  WrapperFilters,
  WrapperInfo,
} from "./FiltersView.styled";
import { SystemFilterOutline } from "@admiral-ds/icons";
import { Chips, IconButton, T } from "@admiral-ds/react-ui";
import { IRenderField, TFilterValue } from "@features/dynamic-filters";
import { FC } from "react";

interface IProps {
  fields: IRenderField[];
  totalElements?: number;
  handleClose(id: string): void;
  filtersValue?: TFilterValue;
  handleOpenFilter(): void;
}

export const FiltersView: FC<IProps> = ({
  fields,
  handleClose,
  filtersValue,
  totalElements,
  handleOpenFilter,
}) => (
  <StyledFiltersView>
    <WrapperFilters>
      {fields.map(({ id, label }) => (
        <WrapperInfo key={id}>
          <T font="Additional/S" color="Neutral/Neutral 50">
            {label}
          </T>
          <WrapperChip dimension="m">
            {filtersValue?.[id] ? (
              <Chips
                dimension="m"
                appearance="filled"
                key={id}
                onClose={() => handleClose(id)}
              >
                {filtersValue[id].toString()}
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
        onClick={handleOpenFilter}
        dimension="s"
        appearance="primary"
        type="button"
      >
        <SystemFilterOutline />
      </IconButton>
    </StyledIconCount>
  </StyledFiltersView>
);
