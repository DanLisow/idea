import { type TrpcRouterOutput } from "@idea/backend/src/router";
import { createContext, useContext, useMemo } from "react";
import { trpc } from "./trpc";
import { Loader } from "../components/utils/Loader";

export type AppContext = {
  me: TrpcRouterOutput["getMe"]["me"];
};

export const AppReactContext = createContext<AppContext>({
  me: null,
});

export const AppContextProvider = ({ children }: { children: React.ReactNode }) => {
  const { data, error, isLoading, isFetching, isError } = trpc.getMe.useQuery();

  return (
    <AppReactContext.Provider
      value={{
        me: data?.me ?? null,
      }}
    >
      {isFetching || isLoading ? <p>Загрузка...</p> : isError ? <p>Ошибка {error.message}</p> : children}
    </AppReactContext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(AppReactContext);
};

export const useMe = () => {
  const { me } = useAppContext();
  return me;
};
