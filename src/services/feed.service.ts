import { FEED, TRANSLATE_FEED } from "./endpoints";

const fetchFeeds = async ({
  locale = "en",
  date = new Date().toISOString().split("T")[0].replace(/-/g, "/"),
  page = 0,
  size = 5,
}: {
  locale: string;
  date: string;
  page: number;
  size: number;
}) => {
  return fetch(
    `${FEED}?locale=${locale}&date=${date}&page=${page}&size=${size}`
  ).then((response) => response.json());
};

const translateFeeds = async ({
  locale = "en",
  target = "es",
  date = new Date().toISOString().split("T")[0].replace(/-/g, "/"),
  page = 0,
  size = 5,
}: {
  locale: string;
  target: string;
  date: string;
  page: number;
  size: number;
}) => {
  return fetch(
    `${TRANSLATE_FEED}/${target}?locale=${locale}&date=${date}&page=${page}&size=${size}`
  ).then((response) => response.json());
};

export { fetchFeeds, translateFeeds };
