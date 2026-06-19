export const logFetch = ({
  url,
  method,
  status,
  headers,
  params,
  body,
  data,
}: {
  url: string;
  method: string;
  status: number;
  headers?: any;
  params?: any;
  body?: any;
  data?: any;
}) => {
  const statusIcon =
    status >= 200 && status < 300 ? "🟢" : status >= 400 ? "🔴" : "🟡";

  const methodColorMap: Record<string, string> = {
    GET: "\x1b[34m", // blue
    POST: "\x1b[33m", // yellow
    PUT: "\x1b[36m", // cyan
    PATCH: "\x1b[35m", // magenta
    DELETE: "\x1b[31m", // red
  };

  const reset = "\x1b[0m";
  const methodUpper = method.toUpperCase();
  const methodColor = methodColorMap[methodUpper] || "";

  console.groupCollapsed(
    `${statusIcon} ${methodColor}${methodUpper}${reset} ${url} → ${status}`,
  );

  if (headers) console.log("Headers:", headers);
  if (params) console.log("Params:", params);
  if (body) console.log("Body:", body);

  console.log("Response:");

  const MAX_ROWS = 10;

  if (Array.isArray(data)) {
    console.table(data.slice(0, MAX_ROWS));
  } else if (Array.isArray(data?.data)) {
    console.table(data.data.slice(0, MAX_ROWS));
  } else {
    console.dir(data, { depth: null, colors: true });
  }

  console.groupEnd();
};
