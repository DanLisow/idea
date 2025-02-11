import { type TrpcRouterOutput } from "@idea/backend/src/router";
import { getViewIdeaRoute, type EditIdeaRouteParams } from "../../lib/routes";
import { useNavigate, useParams } from "react-router-dom";
import { trpc } from "../../lib/trpc";
import { zUpdateIdeaTrpcInput } from "@idea/backend/src/router/updateIdea/input";
import { Segment } from "../../components/utils/Segment";
import { Input } from "../../components/Form/Input";
import { TextArea } from "../../components/Form/Textarea";
import { FormResult } from "../../components/Form/FormResult";
import { useForm } from "../../lib/form";
import { Button } from "../../components/Form/Button";
import { useMe } from "../../lib/ctx";

const EditIdeaComponent = ({ idea }: { idea: NonNullable<TrpcRouterOutput["getIdea"]["idea"]> }) => {
  const navigate = useNavigate();

  const updateIdea = trpc.updateIdea.useMutation();

  const { formik, formResultProps, buttonProps } = useForm({
    initialValues: {
      name: idea.name,
      nick: idea.nick,
      description: idea.description,
      text: idea.text,
    },
    showValidationAlert: true,
    resetOnSuccess: false,
    validationSchema: zUpdateIdeaTrpcInput.omit({ ideaId: true }),
    onSubmit: async (values) => {
      await updateIdea.mutateAsync({ ideaId: idea.id, ...values });

      navigate(getViewIdeaRoute({ ideaName: values.nick }));
    },
  });

  return (
    <Segment className="add-form" paddingTop>
      <h1>Редактировать {idea.name}</h1>

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

        <Button {...buttonProps}>Сохранить</Button>
        <FormResult {...formResultProps}></FormResult>
      </form>
    </Segment>
  );
};

export const EditIdeaPage = () => {
  const { ideaName } = useParams() as EditIdeaRouteParams;

  const getIdeaResult = trpc.getIdea.useQuery({
    ideaName,
  });

  const me = useMe();

  if (getIdeaResult.isLoading || getIdeaResult.isFetching) {
    return <span>Загрузка...</span>;
  }

  if (getIdeaResult.isError) {
    return <span>Ошибка: {getIdeaResult.error.message}</span>;
  }

  if (!getIdeaResult.data.idea) {
    return <span>Такой идеи не существует</span>;
  }

  const idea = getIdeaResult.data.idea;

  if (!me) {
    return <span>Только для авторизованных пользователей</span>;
  }

  if (me.id !== idea.authorId) {
    return <span>Вы не можете редактировать идею</span>;
  }

  return <EditIdeaComponent idea={idea}></EditIdeaComponent>;
};
