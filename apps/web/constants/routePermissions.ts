const ROUTE_PERMISSIONS_MAP = {
  "/dashboard": {
    resource: "dashboard",
    action: "select",
  },
  "/dashboard/survey": {
    resource: "dashboard.survey",
    action: "select",
  },
  "/dashboard/survey/new": {
    resource: "dashboard.survey",
    action: "insert",
  },
} as const;

export { ROUTE_PERMISSIONS_MAP };
