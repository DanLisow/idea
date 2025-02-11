import { FormikProps } from "formik";

type Input = {
  label: string;
  name: string;
  type?: "text" | "password";
  formik: FormikProps<any>;
  autoComplete?: string;
};

export const Input = ({ autoComplete = "off", type = "text", ...props }: Input) => {
  const value = props.formik.values[props.name];
  const error = props.formik.errors[props.name] as string | undefined;
  const touched = props.formik.touched[props.name];

  return (
    <div className="form-input">
      <span className="form-input__label">{props.label}</span>
      <input
        type={type}
        name={props.name}
        autoComplete={autoComplete}
        value={value}
        onChange={(event) => {
          props.formik.setFieldValue(props.name, event.target.value);
        }}
        onBlur={() => {
          props.formik.setFieldTouched(props.name);
        }}
        disabled={props.formik.isSubmitting}
      />
      {touched && error && <span className="form-input__error">{error}</span>}
    </div>
  );
};
