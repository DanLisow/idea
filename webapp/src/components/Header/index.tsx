import { Link } from "react-router-dom";
import { Container } from "../utils/Container";
import { Logo } from "./Logo";
import * as routes from "../../lib/routes";
import { useMe } from "../../lib/ctx";

export const Header = () => {
  const me = useMe();

  return (
    <header className="header">
      <Container>
        <div className="header__inner">
          <Logo additionalClass="header__logo"></Logo>
          <nav className="header__menu">
            <ul className="header__menu-list">
              <li className="header__menu-item">
                <Link to={routes.getAllIdeasRoute()}>Все идеи</Link>
              </li>

              {me ? (
                <>
                  <li className="header__menu-item">
                    <Link to={routes.getNewIdeaRoute()}>Добавить идею</Link>
                  </li>
                  <li className="header__menu-item">
                    <Link to={routes.getSignOutRoute()}>Выйти ({me.nick})</Link>
                  </li>
                </>
              ) : (
                <>
                  <li className="header__menu-item">
                    <Link to={routes.getSignUpRoute()}>Регистрация</Link>
                  </li>
                  <li className="header__menu-item">
                    <Link to={routes.getSignInRoute()}>Войти</Link>
                  </li>
                </>
              )}
            </ul>
          </nav>
        </div>
      </Container>
    </header>
  );
};
