import { defineEventHandler, getQuery } from "h3";

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const response = await fetch("https://external-api.com/data", {
    method: "GET",
    headers: {
      Authorization: "Bearer your_token",
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw createError({
      statusCode: response.status,
      statusMessage: response.statusText,
    });
  }

  const data = await response.json();
  return data;
});
