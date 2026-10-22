import {
  StyledAdditionalBlock,
  StyledBgBlock,
  StyledFilter,
  StyledFilterActions,
  StyledFilterActionsGroup,
  StyledFilterBody,
  StyledFilterField,
  StyledFilterHeader,
  StyledFilterTitle,
} from "./DynamicFilters.styled";
import { renderField } from "./RenderFields";
import { validate } from "../lib/validate";
import { FilterConfig, TFilterValue } from "../model/DynamicFilters.types";
import { ServiceCloseOutline } from "@admiral-ds/icons";
import {
  Button,
  ContentSwitcher,
  ContentSwitcherItem,
  IconButton,
  T,
} from "@admiral-ds/react-ui";
import { IRenderField } from "@features/dynamic-filters";
import { FC, useMemo, useState } from "react";
import { Form } from "react-final-form";

const getInitialValues = (
  fields: IRenderField[],
  filtersValue?: TFilterValue,
): TFilterValue =>
  fields.reduce<TFilterValue>((acc, field) => {
    acc[field.name] =
      filtersValue?.[field.name]?.toString() ?? field.defaultValue ?? null;
    return acc;
  }, {});

export const DynamicFilters: FC<FilterConfig> = ({
  onVariantChange,
  onApply,
  onReset,
  onCancel,
  isShowFilters = true,
  filtersValue,
  ...props
}) => {
  const variants = "variants" in props ? props.variants : undefined;
  const [selectedIndex, setSelectedIndex] = useState(0);
  const activeVariant = variants?.[selectedIndex];
  const fields = activeVariant?.fields ?? props.fields ?? [];

  const initialValues = useMemo(
    () => getInitialValues(fields, filtersValue),
    [fields, filtersValue],
  );

  const handleVariantChange = (index: number) => {
    const nextVariant = variants?.[index];
    if (!nextVariant || index === selectedIndex) return;

    setSelectedIndex(index);
    onVariantChange?.(nextVariant.label);
  };

  const onSubmit = (values) => {
    onApply?.(values, activeVariant?.label);
  };

  if (!isShowFilters) return null;

  return (
    <StyledBgBlock>
      <StyledAdditionalBlock>
        <Form<TFilterValue>
          key={activeVariant?.label ?? "fields"}
          initialValues={initialValues}
          onSubmit={onSubmit}
          validate={(values) => validate(values, fields)}
        >
          {({ handleSubmit, pristine, form }) => {
            return (
              <form onSubmit={handleSubmit}>
                <StyledFilter>
                  <StyledFilterHeader>
                    <StyledFilterTitle>
                      <T font="Header/H6">Фильтры</T>
                      {variants && variants.length > 1 && (
                        <ContentSwitcher dimension="s" appearance="primary">
                          {variants.map((variant, index) => (
                            <ContentSwitcherItem
                              key={variant.label}
                              type="button"
                              active={index === selectedIndex}
                              onClick={() => handleVariantChange(index)}
                            >
                              {variant.label}
                            </ContentSwitcherItem>
                          ))}
                        </ContentSwitcher>
                      )}
                    </StyledFilterTitle>

                    <IconButton
                      dimension="s"
                      type="button"
                      onClick={() => onCancel?.()}
                    >
                      <ServiceCloseOutline />
                    </IconButton>
                  </StyledFilterHeader>
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
                        onReset?.();
                      }}
                      appearance="secondary"
                      type="button"
                    >
                      Сбросить фильтр
                    </Button>
                    <StyledFilterActionsGroup>
                      <Button
                        dimension="s"
                        appearance="secondary"
                        type="button"
                        onClick={() => onCancel?.()}
                      >
                        Отмена
                      </Button>
                      <Button
                        disabled={pristine}
                        dimension="s"
                        type="submit"
                        appearance="primary"
                      >
                        Применить
                      </Button>
                    </StyledFilterActionsGroup>
                  </StyledFilterActions>
                </StyledFilter>
              </form>
            );
          }}
        </Form>
      </StyledAdditionalBlock>
    </StyledBgBlock>
  );
};
