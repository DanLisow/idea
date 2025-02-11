import { Segment } from "../../components/utils/Segment";
import { Input } from "../../components/Form/Input";
import { TextArea } from "../../components/Form/Textarea";
import { FormResult } from "../../components/Form/FormResult";
import { trpc } from "../../lib/trpc";
import { zCreateIdeaTrpcInput } from "@idea/backend/src/router/createIdea/input";
import { useForm } from "../../lib/form";
import { Button } from "../../components/Form/Button";

export const NewIdeaPage = () => {
  const createIdea = trpc.createIdea.useMutation();

  const { formik, formResultProps, buttonProps } = useForm({
    initialValues: {
      name: "",
      nick: "",
      description: "",
      text: "",
    },
    validationSchema: zCreateIdeaTrpcInput,
    resetOnSuccess: true,
    showValidationAlert: true,
    successMessage: "Успешно добавлено",
    onSubmit: async (values) => {
      await createIdea.mutateAsync(values);
    },
  });

  return (
    <Segment className="add-form" paddingTop>
      <h1>Добавить</h1>

      <form
        className="add-form__instance form"
        onSubmit={(event) => {
          event.preventDefault();

          formik.handleSubmit();
        }}
      >
        <Input label="Имя" name="name" formik={formik}></Input>
        <Input label="Ник" name="nick" formik={formik}></Input>
        <Input label="Короткое описание" name="description" formik={formik}></Input>
        <TextArea label="Текст" name="text" formik={formik}></TextArea>

        <Button {...buttonProps}>Добавить</Button>
        <FormResult {...formResultProps}></FormResult>
      </form>
    </Segment>
  );
};
