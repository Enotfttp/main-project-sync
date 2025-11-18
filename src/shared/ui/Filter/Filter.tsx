import {
  StyledFilter,
  StyledFilterActions,
  StyledFilterBody,
  StyledFilterField,
  StyledFilterHeader,
  StyledFilterRange,
} from "./Filter.styled";
import { FilterConfig, FilterField, FilterValue } from "./Filter.types";
import {
  Badge,
  Button,
  Checkbox,
  DateField,
  Range,
  TextInput,
} from "@admiral-ds/react-ui";
import type { NumberRange } from "@admiral-ds/react-ui/dist/components/Range/utils";
import { isRangeValue } from "@shared/common";
import { Select } from "@shared/ui";
import React, { useState } from "react";

export const Filter: React.FC<FilterConfig> = ({
  fields,
  values,
  onChange,
  onApply,
  onReset,
}) => {
  const [localValues, setLocalValues] = useState<FilterValue[]>(values);

  const handleFieldChange = (fieldId: string, value: FilterValue["value"]) => {
    const newValues = localValues.filter((v) => v.fieldId !== fieldId);

    if (value !== null && value !== undefined && value !== "") {
      newValues.push({
        fieldId,
        value,
      });
    }
    setLocalValues(newValues);
  };

  const handleApply = () => {
    onChange(localValues);
    onApply?.();
  };

  const handleReset = () => {
    const resetValues: FilterValue[] = [];
    setLocalValues(resetValues);
    onChange(resetValues);
    onReset?.();
  };

  const getFieldValue = (fieldId: string): FilterValue["value"] | null => {
    return localValues.find((v) => v.fieldId === fieldId)?.value ?? null;
  };

  const renderField = (field: FilterField) => {
    const value = getFieldValue(field.id);

    switch (field.type) {
      case "text":
        return (
          <TextInput
            value={typeof value === "string" ? value : ""}
            onChange={(e) => handleFieldChange(field.id, e.target.value)}
            placeholder={field.placeholder}
            dimension="s"
          />
        );

      case "number":
        return (
          <TextInput
            type="number"
            value={typeof value === "number" ? value : ""}
            onChange={(e) =>
              handleFieldChange(field.id, Number(e.target.value))
            }
            placeholder={field.placeholder}
            min={field.min}
            max={field.max}
            step={field.step}
            dimension="s"
          />
        );

      case "date":
        return (
          <DateField
            value={typeof value === "string" ? value : ""}
            onChange={(event) =>
              handleFieldChange(field.id, event.target.value)
            }
            placeholder={field.placeholder}
            dimension="s"
          />
        );

      case "select":
        return (
          <Select
            value={typeof value === "string" ? value : ""}
            onSelectedChange={(option) => handleFieldChange(field.id, option)}
            options={field.options || []}
            placeholder={field.placeholder || ""}
            dimension="s"
          />
        );

      case "multiselect":
        return (
          <Select
            multiple
            value={value ? value?.toString() : []}
            onSelectedChange={(options) => handleFieldChange(field.id, options)}
            options={field.options || []}
            placeholder={field.placeholder || ""}
            dimension="s"
          />
        );

      case "boolean":
        return (
          <Checkbox
            checked={!!value}
            onChange={(e) => handleFieldChange(field.id, e.target.checked)}
            dimension="s"
            value={field.label}
          />
        );

      case "range": {
        const min = isRangeValue(value) ? value.min : 0;
        const max = isRangeValue(value) ? value.max : 10;

        return (
          <StyledFilterRange>
            <div>
              <TextInput
                type="number"
                value={min}
                onChange={(e) =>
                  handleFieldChange(field.id, {
                    min: Number(e.target.value),
                    max,
                  })
                }
                min={field.min}
                max={field.max}
                step={field.step}
                dimension="s"
              />
              <TextInput
                type="number"
                value={max}
                onChange={(e) =>
                  handleFieldChange(field.id, {
                    min,
                    max: Number(e.target.value),
                  })
                }
                min={field.min}
                max={field.max}
                dimension="s"
              />
            </div>

            <Range
              value={[min, max]}
              onChange={(_, range: NumberRange) => {
                handleFieldChange(field.id, {
                  min: range[0],
                  max: range[1],
                });
              }}
              maxValue={100}
            />
          </StyledFilterRange>
        );
      }

      default:
        return null;
    }
  };

  const activeFiltersCount = localValues.filter(
    (v) =>
      v.value !== null &&
      v.value !== undefined &&
      v.value !== "" &&
      !(Array.isArray(v.value) && v.value.length === 0),
  ).length;

  return (
    <StyledFilter>
      <StyledFilterHeader>
        <h3>Фильтры</h3>
        {activeFiltersCount > 0 && (
          <Badge appearance="info">{activeFiltersCount}</Badge>
        )}
      </StyledFilterHeader>

      <StyledFilterBody>
        {fields.map((field) => (
          <StyledFilterField key={field.id}>
            <label>{field.label}</label>
            {renderField(field)}
          </StyledFilterField>
        ))}
      </StyledFilterBody>

      <StyledFilterActions>
        <Button dimension="s" onClick={handleReset} appearance="secondary">
          Сбросить
        </Button>
        <Button dimension="s" onClick={handleApply} appearance="primary">
          Применить
        </Button>
      </StyledFilterActions>
    </StyledFilter>
  );
};
