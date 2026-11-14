import { SubmitError } from "./SskChange.styled";
import { Button, ModalProps, T } from "@admiral-ds/react-ui";
import { Modal } from "@features/modal";
import { getErrorMessage } from "@shared/api";
import { FORM_ERROR } from "final-form";
import { ReactNode } from "react";
import { Form } from "react-final-form";

interface ISskFormModalProps<T> {
  title: string;
  dimension: ModalProps["dimension"];
  submitText: string;
  initialValues: T;
  validate: (values: T) => object;
  onSubmit: (values: T) => Promise<void>;
  onClose: () => void;
  children: ReactNode;
}

export const SskFormModal = <T extends object>({
  title,
  dimension,
  submitText,
  initialValues,
  validate,
  onSubmit,
  onClose,
  children,
}: ISskFormModalProps<T>) => (
  <Form<T>
    initialValues={initialValues}
    validate={validate}
    onSubmit={async (values) => {
      try {
        await onSubmit(values);
      } catch (error) {
        return { [FORM_ERROR]: getErrorMessage(error) };
      }
    }}
  >
    {({ handleSubmit, submitting, hasValidationErrors, submitError, form }) => (
      <Modal
        isOpen
        onClose={onClose}
        dimension={dimension}
        title={title}
        closeOnOutsideClick={!submitting}
        closeOnEscapeKeyDown={!submitting}
        actions={
          <>
            <Button
              type="button"
              appearance="primary"
              dimension="m"
              loading={submitting}
              disabled={hasValidationErrors || submitting}
              onClick={() => form.submit()}
            >
              {submitText}
            </Button>
            <Button
              type="button"
              appearance="secondary"
              dimension="m"
              onClick={onClose}
              disabled={submitting}
            >
              Отмена
            </Button>
          </>
        }
      >
        <form onSubmit={handleSubmit}>
          {children}
          {submitError && (
            <SubmitError>
              <T font="Body/Body 2 Short" color="Error/Error 60 Main">
                {submitError}
              </T>
            </SubmitError>
          )}
        </form>
      </Modal>
    )}
  </Form>
);
