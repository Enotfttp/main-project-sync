import {
  StyledFilter,
  StyledFilterActions,
  StyledFilterBody,
  StyledFilterCount,
  StyledFilterField,
  StyledFilterHeader,
} from "./Filter.styled";
import { FilterConfig, FilterField, FilterValue } from "./Filter.types";
import {
  Button,
  Checkbox,
  DateField,
  Range,
  TextInput,
} from "@admiral-ds/react-ui";
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

  const getFieldValue = (fieldId: string): FilterValue["value"] => {
    return localValues.find((v) => v.fieldId === fieldId)?.value ?? null;
  };

  const renderField = (field: FilterField) => {
    const value = getFieldValue(field.id);

    switch (field.type) {
      case "text":
        return (
          <TextInput
            value={typeof value === "number" ? value : ""}
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
            // value={value ? new Date(value) : null}
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
            value={value ? value.toString() : ""}
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
            onChange={(e) =>
              handleFieldChange(field.id, e.target.checked.toString())
            }
            dimension="s"
            value={field.label}
          />
        );

      case "range":
        return (
          <>
            <Range
              // TODO Нет гарантий что не 0, 0
              value={field.min && field.max ? [field.min, field.max] : [0, 10]}
              minValue={field.min}
              maxValue={field.max}
              onChange={(e, range: [number, number]) => {
                handleFieldChange(field.id, {
                  min: range[0],
                  max: range[1],
                });
              }}
            />
          </>
        );

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
      <StyledFilterHeader>Фильтры</StyledFilterHeader>
      {activeFiltersCount > 0 && (
        <StyledFilterCount>{activeFiltersCount}</StyledFilterCount>
      )}

      <StyledFilterBody>
        {fields.map((field) => (
          <StyledFilterField
            key={field.id}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "8px",
            }}
          >
            <label
              style={{
                fontSize: "14px",
                fontWeight: 500,
                color: "#0D1F2C",
              }}
            >
              {field.label}
            </label>
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
