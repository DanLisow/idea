import { useEffect, useState } from "react";
import css from "./index.module.scss";

export const Loader = () => {
  const [visible, setVisible] = useState<boolean>(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`${css.loader} ${visible ? "" : `${css.hidden}`}`} id="loader">
      <div className={`${css.img}`}>
        <img src="/loader.jpg" alt="" />
      </div>
    </div>
  );
};
