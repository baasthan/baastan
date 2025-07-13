// utils/routeMatcher.ts
export function createRouteMatcher(routes: string[]) {
  const matchers = routes.map(
    (route) => new RegExp(`^${route.replace("*", ".*")}$`)
  );

  return (pathname: string) => {
    return matchers.some((matcher) => matcher.test(pathname));
  };
}
