import { type FormikHelpers, useFormik } from "formik";
import { useMemo, useState } from "react";
import { z } from "zod";
import { withZodSchema } from "formik-validator-zod";
import { type ButtonProps } from "../components/Form/Button";
import { FormResult } from "../components/Form/FormResult";

type UseFormType<TZodSchema extends z.ZodTypeAny> = {
  successMessage?: string | false;
  resetOnSuccess?: boolean;
  showValidationAlert?: boolean;
  initialValues: z.infer<TZodSchema>;
  validationSchema?: TZodSchema;
  onSubmit: (values: z.infer<TZodSchema>, actions: FormikHelpers<z.infer<TZodSchema>>) => Promise<any> | any;
};

export const useForm = <TZodSchema extends z.ZodTypeAny>({
  successMessage = false,
  resetOnSuccess = true,
  showValidationAlert = false,
  initialValues,
  validationSchema,
  onSubmit,
}: UseFormType<TZodSchema>) => {
  const [successMessageVisible, setSuccessMessageVisible] = useState<boolean>(false);
  const [submittingError, setSubmittingError] = useState<Error | null>(null);

  const formik = useFormik<z.infer<TZodSchema>>({
    initialValues: initialValues || ({} as any),
    ...(validationSchema && { validate: withZodSchema(validationSchema) }),
    onSubmit: async (values, formikHelpers) => {
      try {
        setSubmittingError(null);

        await onSubmit(values, formikHelpers);

        if (resetOnSuccess) {
          formik.resetForm();
        }

        setSuccessMessageVisible(true);

        setTimeout(() => {
          setSuccessMessageVisible(false);
        }, 3000);
      } catch (error: any) {
        setSubmittingError(error);
      }
    },
  });

  const formResultProps = useMemo<FormResult>(() => {
    if (submittingError) {
      return {
        type: "error",
        children: submittingError.message,
        hidden: false,
      };
    }

    if (showValidationAlert && !formik.isValid && !!formik.submitCount) {
      return {
        type: "error",
        children: "Заполнены не все поля",
        hidden: false,
      };
    }

    if (successMessageVisible && successMessage) {
      return {
        type: "success",
        children: successMessage,
        hidden: false,
      };
    }

    return {
      type: "success",
      children: null,
      hidden: true,
    };
  }, [submittingError, showValidationAlert, formik.isValid, formik.submitCount, successMessageVisible, successMessage]);

  const buttonProps = useMemo<Omit<ButtonProps, "children">>(() => {
    return {
      loading: formik.isSubmitting,
    };
  }, [formik.isSubmitting]);

  return {
    formik,
    formResultProps,
    buttonProps,
  };
};
