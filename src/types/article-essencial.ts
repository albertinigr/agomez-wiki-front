import { Image } from "./image";

export interface ArticleEssencial {
  title: string;
  extract: string;
  locale: string;
  thumbnail?: Image;
}
