import { useNavigate } from "react-router-dom";
import { trpc } from "../../lib/trpc";
import { useEffect } from "react";
import Cookies from "js-cookie";
import { getSignInRoute } from "../../lib/routes";

export const SignOutPage = () => {
  const navigate = useNavigate();
  const trpcUtils = trpc.useUtils();

  useEffect(() => {
    Cookies.remove("token");

    trpcUtils.invalidate().then(() => {
      navigate(getSignInRoute(), { replace: true });
    });
  }, []);

  return <></>;
};
