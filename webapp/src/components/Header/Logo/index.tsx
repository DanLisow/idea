import { Link } from "react-router-dom";
import scss from "./index.module.scss";

type Props = {
  additionalClass?: string;
};

export const Logo = ({ additionalClass }: Props) => {
  return (
    <div className={`${scss.logo} ${additionalClass ?? ""}`}>
      <Link to="/" className={scss["logo-link"]}>
        IDEA
      </Link>
    </div>
  );
};
