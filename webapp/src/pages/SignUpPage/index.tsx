import { Segment } from "../../components/utils/Segment";
import { trpc } from "../../lib/trpc";
import { z } from "zod";
import { zSignUpTrpcInput } from "@idea/backend/src/router/signUp/input";
import { Input } from "../../components/Form/Input";
import { FormResult } from "../../components/Form/FormResult";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { getAllIdeasRoute } from "../../lib/routes";
import { useForm } from "../../lib/form";
import { Button } from "../../components/Form/Button";

export const SignUpPage = () => {
  const navigate = useNavigate();
  const trpcUtils = trpc.useUtils();

  const { formik, formResultProps, buttonProps } = useForm({
    initialValues: {
      nick: "",
      password: "",
      passwordAgain: "",
    },
    validationSchema: zSignUpTrpcInput
      .extend({
        passwordAgain: z.string().min(1),
      })
      .superRefine((value, ctx) => {
        if (value.password !== value.passwordAgain) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Пароли не совпадают",
            path: ["passwordAgain"],
          });
        }
      }),
    showValidationAlert: true,
    resetOnSuccess: false,
    onSubmit: async (values) => {
      const { token } = await signUp.mutateAsync(values);

      Cookies.set("token", token, { expires: 1000000 });
      trpcUtils.invalidate();

      navigate(getAllIdeasRoute());
    },
  });

  const signUp = trpc.signUp.useMutation();

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
        <Input label="Повторите пароль" name="passwordAgain" type="password" formik={formik}></Input>

        <Button {...buttonProps}>Зарегистрироваться</Button>
        <FormResult {...formResultProps}></FormResult>
      </form>
    </Segment>
  );
};
