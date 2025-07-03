const NETWORK_ERROR_CODES = {
  BAD_REQUEST: {
    body: { success: false, message: "Bad Payload !" },
    init: { status: 400 },
  },
  UNAUTHENTICATED: {
    body: { success: false, message: "User not authenticated" },
    init: { status: 401 },
  },
  UNAUTHORIZED: {
    body: { success: false, message: "User not authorized" },
    init: { status: 403 },
  },
  NOT_FOUND: {
    body: { success: false, message: "Resource not found" },
    init: { status: 404 },
  },
  INTERNAL_ERROR: {
    body: { success: false, message: "Operation unsuccessful" },
    init: { status: 500 },
  },
} as const;

const ERROR_CODES = {
  UNAUTHENTICATED: "User not logged in",
};

export { ERROR_CODES, NETWORK_ERROR_CODES };
