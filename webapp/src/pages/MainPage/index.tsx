import { Link } from "react-router-dom";
import { Segment } from "../../components/utils/Segment";
import * as routes from "../../lib/routes";

export const MainPage = () => {
  return (
    <Segment className="main">
      <div className="main__block">
        <div className="main__content">
          <h1 className="main__title">Пример задания</h1>
          <p className="main__text">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit in repudiandae eum obcaecati, eaque eos repellat quos? Molestias,
            optio adipisci quod aspernatur itaque corrupti aliquam. Perspiciatis quae ullam aliquid hic.
          </p>
          <Link to={routes.getAllIdeasRoute()} className="main__link">
            Чекнуть
          </Link>
        </div>
        <div className="main__img">
          <img src="/main.jpg" alt="" />
        </div>
      </div>
    </Segment>
  );
};
