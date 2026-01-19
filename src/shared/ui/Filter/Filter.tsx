import {
  StyledFilter,
  StyledFilterActions,
  StyledFilterBody,
  StyledFilterField,
  StyledFilterHeader,
} from "./Filter.styled";
import { FilterConfig, FilterField, FilterValue } from "./Filter.types";
import { validate } from "./utils";
import { Badge, Button, T } from "@admiral-ds/react-ui";
import {
  CheckboxFieldUI,
  DateFieldUI,
  DropDown,
  InputFieldUI,
  RangeWithInput,
  SelectFieldUI,
} from "@shared/ui";
import React from "react";
import { Form } from "react-final-form";

export const Filter: React.FC<FilterConfig> = ({
  fields,
  onApply,
  onReset,
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

  const renderField = (field: FilterField) => {
    switch (field.type) {
      case "number":
      case "text":
        return <InputFieldUI {...field} dimension="m" />;

      case "date":
      case "date-range":
        return <DateFieldUI {...field} dimension="m" />;

      case "select":
      case "multiselect":
        return (
          <SelectFieldUI
            {...field}
            multiple={field.type === "multiselect"}
            dimension="m"
          />
        );

      case "boolean":
        return <CheckboxFieldUI {...field} dimension="m" />;

      case "range": {
        return <RangeWithInput {...field} dimension="m" />;
      }

      default:
        return null;
    }
  };

  return (
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
            <StyledFilter>
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
  );
};
