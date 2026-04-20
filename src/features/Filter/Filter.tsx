import {
  StyledAdditionalBlock,
  StyledFilter,
  StyledFilterActions,
  StyledFilterBody,
  StyledFilterField,
  StyledFilterHeader,
} from "./Filter.styled";
import { FilterConfig, FilterValue } from "./Filter.types";
import { validate } from "./utils";
import { Badge, Button, T } from "@admiral-ds/react-ui";
import { renderField } from "@features/Fields/RenderFields";
import { DropDown } from "@shared/ui";
import React, { useMemo } from "react";
import { Form } from "react-final-form";

export const Filter: React.FC<FilterConfig> = ({
  fields,
  onApply,
  onReset,
  isVisibleAdditionalBlock = false,
}) => {
  const initialState: FilterValue = React.useMemo(
    () => ({
      ...fields.reduce((acc, el) => ({ ...acc, [el.name]: "" }), {}),
    }),
    [],
  );

  const handleApply = (values: FilterValue) => {
    onApply?.(values);
  };

  const handleReset = () => {
    onReset?.();
  };

  const formFilter = useMemo(
    () => (
      <Form<FilterValue>
        initialValues={initialState}
        onSubmit={handleApply}
        validate={(values) => validate(values, fields)}
      >
        {({ handleSubmit, errors, form, values = {} }) => {
          const activeFiltersCount = Object.entries(values).filter(
            ([key, value]) => initialState[key] !== value,
          ).length;

          return (
            <form onSubmit={handleSubmit}>
              <StyledFilter isVisible={isVisibleAdditionalBlock}>
                <DropDown
                  headerChildren={
                    <StyledFilterHeader>
                      <T font="Header/H6">Фильтр</T>
                      {activeFiltersCount > 0 && (
                        <Badge appearance="info">{activeFiltersCount}</Badge>
                      )}
                    </StyledFilterHeader>
                  }
                >
                  <StyledFilterBody>
                    {fields.map((field) => (
                      <StyledFilterField key={field.id}>
                        {renderField(field)}
                      </StyledFilterField>
                    ))}
                  </StyledFilterBody>

                  <StyledFilterActions>
                    <Button
                      dimension="s"
                      onClick={() => {
                        form.reset();
                        handleReset();
                      }}
                      appearance="secondary"
                      type="reset"
                    >
                      Сбросить
                    </Button>
                    <Button
                      disabled={Boolean(errors && Object.keys(errors).length)}
                      dimension="s"
                      type="submit"
                      appearance="primary"
                    >
                      Применить
                    </Button>
                  </StyledFilterActions>
                </DropDown>
              </StyledFilter>
            </form>
          );
        }}
      </Form>
    ),
    [fields, onApply, onReset],
  );

  return isVisibleAdditionalBlock ? (
    <StyledAdditionalBlock>{formFilter}</StyledAdditionalBlock>
  ) : (
    formFilter
  );
};
