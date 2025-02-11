export type FormResult = {
  type: string;
  children: React.ReactNode;
  hidden?: boolean;
};

export const FormResult = ({ type, children, hidden }: FormResult) => {
  if (hidden) {
    return null;
  }
  return <div className={`add-form__result form-${type}`}>{children}</div>;
};
