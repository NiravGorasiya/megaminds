const HTTP_CODE = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  INTERNAL_SERVER_ERROR: 500,
};

const HTTP_MESSAGE = {
  ALREADY_EXIST_WITH(module: string, field: string) {
    return `${module} already exist with this ${field}!`;
  },
  CREATED(module: string) {
    return `${module} created successfully!`;
  },
  SOMETHING_WRONG() {
    return `Something went wrong!`;
  },
  INVALID_CREDENTAILS() {
    return `Invalid username or password!`;
  },
  ENVIRONMENT() {
    return `Environment variable JWT_SECRET is not defined!`;
  },
  LOGIN_SUCCESS() {
    return `Login Successfully!`;
  },
  UNAUTHORIZED() {
    return `Unauthorized!`;
  }
};

const RESPONSE_TYPE = {
  SUCCESS: "success",
  ERROR: "error",
};

export { HTTP_MESSAGE, HTTP_CODE, RESPONSE_TYPE };
