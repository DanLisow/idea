import { BrowserRouter, Route, Routes } from "react-router-dom";
import { TrpcProvider } from "./lib/trpc";
import { AllIdeasPage } from "./pages/AllIdeasPage";
import { MainPage } from "./pages/MainPage";
import { Layout } from "./components/Layout";
import { ViewIdeaPage } from "./pages/ViewIdeaPage";
import * as routes from "./lib/routes";
import "./styles/style.scss";
import { NewIdeaPage } from "./pages/NewIdeaPage";
import { SignUpPage } from "./pages/SignUpPage";
import { SignInPage } from "./pages/SignInPage";
import { SignOutPage } from "./pages/SignOutPage";
import { EditIdeaPage } from "./pages/EditIdeaPage";
import { AppContextProvider } from "./lib/ctx";
import { Loader } from "./components/utils/Loader";

export const App = () => {
  return (
    <TrpcProvider>
      <AppContextProvider>
        <BrowserRouter>
          <Routes>
            <Route path={routes.getSignOutRoute()} element={<SignOutPage></SignOutPage>}></Route>
            <Route element={<Layout></Layout>}>
              <Route path={routes.getMainPage()} element={<MainPage></MainPage>}></Route>
              <Route path={routes.getSignUpRoute()} element={<SignUpPage></SignUpPage>}></Route>
              <Route path={routes.getSignInRoute()} element={<SignInPage></SignInPage>}></Route>
              <Route path={routes.getAllIdeasRoute()} element={<AllIdeasPage></AllIdeasPage>}></Route>
              <Route path={routes.getViewIdeaRoute(routes.viewIdeaRouteParams)} element={<ViewIdeaPage></ViewIdeaPage>}></Route>
              <Route path={routes.getNewIdeaRoute()} element={<NewIdeaPage></NewIdeaPage>}></Route>
              <Route path={routes.getEditIdeaRoute(routes.editIdeaRouteParams)} element={<EditIdeaPage></EditIdeaPage>}></Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </AppContextProvider>
    </TrpcProvider>
  );
};
