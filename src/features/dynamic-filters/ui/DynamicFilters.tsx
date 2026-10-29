import {
  StyledAdditionalBlock,
  StyledBgBlock,
  StyledFilter,
  StyledFilterActions,
  StyledFilterActionsGroup,
  StyledFilterBody,
  StyledFilterError,
  StyledFilterField,
  StyledFilterHeader,
  StyledFilterTitle,
} from "./DynamicFilters.styled";
import { renderField } from "./RenderFields";
import { validate } from "../lib/validate";
import { FilterConfig, TFilterValue } from "../model/DynamicFilters.types";
import { IRenderField } from "../model/RenderFields.types";
import { ServiceCloseOutline } from "@admiral-ds/icons";
import {
  Button,
  ContentSwitcher,
  ContentSwitcherItem,
  IconButton,
  T,
} from "@admiral-ds/react-ui";
import { getErrorMessage } from "@shared/api";
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

const getVariantIndex = (
  variants: readonly { label: string }[] | undefined,
  variant?: string,
) => {
  if (!variants?.length || !variant) return 0;

  const index = variants.findIndex((item) => item.label === variant);
  return index >= 0 ? index : 0;
};

export const DynamicFilters: FC<FilterConfig> = ({
  onVariantChange,
  onApply,
  onReset,
  onCancel,
  isShowFilters = true,
  filtersValue,
  variant,
  ...props
}) => {
  const variants = "variants" in props ? props.variants : undefined;
  const [selectedIndex, setSelectedIndex] = useState(() =>
    getVariantIndex(variants, variant),
  );
  const [applyError, setApplyError] = useState<string | null>(null);
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
    setApplyError(null);
    onVariantChange?.(nextVariant.label);
  };

  const onSubmit = async (values: TFilterValue) => {
    setApplyError(null);
    try {
      await onApply?.(values, activeVariant?.label);
    } catch (error) {
      setApplyError(getErrorMessage(error));
    }
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
          {({ handleSubmit, pristine, submitting, form }) => {
            return (
              <form onSubmit={handleSubmit}>
                <StyledFilter>
                  <StyledFilterHeader>
                    <StyledFilterTitle>
                      <T font="Header/H6">Фильтры</T>
                      {variants && variants.length > 1 && (
                        <ContentSwitcher dimension="s" appearance="primary">
                          {variants.map((item, index) => (
                            <ContentSwitcherItem
                              key={item.label}
                              type="button"
                              active={index === selectedIndex}
                              onClick={() => handleVariantChange(index)}
                            >
                              {item.label}
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

                  {applyError && (
                    <StyledFilterError>
                      <T font="Body/Body 2 Short" color="Error/Error 60 Main">
                        {applyError}
                      </T>
                    </StyledFilterError>
                  )}

                  <StyledFilterActions>
                    <Button
                      dimension="s"
                      onClick={() => {
                        form.reset();
                        setApplyError(null);
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
                        loading={submitting}
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
