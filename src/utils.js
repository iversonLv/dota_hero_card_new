import { STRATZ_TOKEN, STRATZ_API } from "./config.js";

export // graphql fun
const getGraphqlData = async (query) => {
  let response = await fetch(STRATZ_API, {
    method: "post",
    body: query,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${STRATZ_TOKEN}`,
    },
  });
  let data = await response.json();
  return data;
};

export const formatText = (string, splitChart, slicePlacement) => {
  return string.split(splitChart).slice(slicePlacement);
};
