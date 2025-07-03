const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

const getCorsHeaders = (
  METHOD:
    | Array<"GET" | "POST" | "PUT" | "DELETE" | "OPTIONS">
    | "GET"
    | "POST"
    | "PUT"
    | "DELETE"
    | "OPTIONS"
) => {
  return {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": Array.isArray(METHOD)
      ? METHOD.join(",")
      : METHOD,
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
  };
};

export default getCorsHeaders;
