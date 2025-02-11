import { Segment } from "../../components/utils/Segment";
import { trpc } from "../../lib/trpc";
import { zSignInTrpcInput } from "@idea/backend/src/router/signIn/input";
import { Input } from "../../components/Form/Input";
import { FormResult } from "../../components/Form/FormResult";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { getAllIdeasRoute } from "../../lib/routes";
import { Button } from "../../components/Form/Button";
import { useForm } from "../../lib/form";

export const SignInPage = () => {
  const navigate = useNavigate();
  const trpcUtils = trpc.useUtils();

  const signIn = trpc.signIn.useMutation();

  const { formik, formResultProps, buttonProps } = useForm({
    initialValues: {
      nick: "",
      password: "",
    },
    validationSchema: zSignInTrpcInput,
    showValidationAlert: true,
    resetOnSuccess: false,
    onSubmit: async (values) => {
      const { token } = await signIn.mutateAsync(values);

      Cookies.set("token", token, { expires: 1000000 });
      trpcUtils.invalidate();

      navigate(getAllIdeasRoute());
    },
  });

  return (
    <Segment className="auth">
      <form
        className="auth__form form"
        onSubmit={(event) => {
          event.preventDefault();

          formik.handleSubmit();
        }}
      >
        <Input label="Ник" name="nick" formik={formik}></Input>
        <Input label="Пароль" name="password" type="password" formik={formik}></Input>

        <Button {...buttonProps}>Войти</Button>
        <FormResult {...formResultProps}></FormResult>
      </form>
    </Segment>
  );
};
