const getRouteParams = <T extends Record<string, boolean>>(object: T) => {
  return Object.keys(object).reduce((acc, key) => {
    return {
      ...acc,
      [key]: `:${key}`,
    };
  }, {}) as Record<keyof T, string>;
};

export const getMainPage = () => "/";
export const getAllIdeasRoute = () => "/ideas";

export const viewIdeaRouteParams = getRouteParams({ ideaName: true });
export type ViewIdeaRouteParams = typeof viewIdeaRouteParams;
export const getViewIdeaRoute = ({ ideaName }: ViewIdeaRouteParams) => {
  return `/ideas/${ideaName}`;
};

export const getNewIdeaRoute = () => "/ideas/new";
export const getSignUpRoute = () => "/sign-up";
export const getSignInRoute = () => "/sign-in";
export const getSignOutRoute = () => "/sign-out";

export const editIdeaRouteParams = getRouteParams({ ideaName: true });
export type EditIdeaRouteParams = typeof editIdeaRouteParams;
export const getEditIdeaRoute = ({ ideaName }: EditIdeaRouteParams) => {
  return `/ideas/${ideaName}/edit`;
};
