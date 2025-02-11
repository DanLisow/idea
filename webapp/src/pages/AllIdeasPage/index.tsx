import * as routes from "../../lib/routes";
import { trpc } from "../../lib/trpc";
import { Link } from "react-router-dom";
import { Segment } from "../../components/utils/Segment";

export const AllIdeasPage = () => {
  const { data, error, isLoading, isFetching, isError } = trpc.getIdeas.useQuery();

  if (isLoading || isFetching) {
    return <span>Загрузка...</span>;
  }

  if (isError) {
    return <span>Ошибка: {error.message}</span>;
  }

  if (data.ideas.length === 0) {
    return <span>Ничего не найдено</span>;
  }

  return (
    <Segment className="idea-list">
      <div className="idea-list__items">
        {data?.ideas.map((item) => {
          return (
            <div key={item.nick} className="idea-card idea-list__item">
              <p className="idea-card__name">{item.name}</p>
              <p className="idea-card__description">{item.description}</p>
              <Link to={routes.getViewIdeaRoute({ ideaName: item.nick })} className="idea-card__link button">
                Перейти
              </Link>
            </div>
          );
        })}
      </div>
    </Segment>
  );
};
