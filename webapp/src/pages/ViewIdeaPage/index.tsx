import { Link, useParams } from "react-router-dom";
import { getEditIdeaRoute, type ViewIdeaRouteParams } from "../../lib/routes";
import { trpc } from "../../lib/trpc";
import { Segment } from "../../components/utils/Segment";
import { format } from "date-fns/format";
import { useMe } from "../../lib/ctx";

export const ViewIdeaPage = () => {
  const { ideaName } = useParams() as ViewIdeaRouteParams;

  const getIdeaResult = trpc.getIdea.useQuery({ ideaName });
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

  const data = getIdeaResult.data.idea;

  return (
    <Segment className="idea" paddingTop>
      <div className="idea__info">
        <h1 className="idea__title">{data.name}</h1>
        <p className="idea__author">
          Автор: <span>{data.author.nick}</span>
        </p>
        <p className="idea__date">{format(data.createdAt, "yyyy-MM-dd")}</p>
        <p className="idea__description">{data.description}</p>
        <div dangerouslySetInnerHTML={{ __html: data.text }} className="idea__content" />

        {me?.id === data.authorId && (
          <div className="idea__actions">
            <Link to={getEditIdeaRoute({ ideaName: data.nick })} className="idea__button edit">
              Редактировать
            </Link>
            <button className="idea__button remove">Удалить</button>
          </div>
        )}
      </div>
    </Segment>
  );
};
