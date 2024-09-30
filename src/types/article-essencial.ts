import { Image } from "./image";

export interface ArticleEssencial {
  title: string;
  extract: string;
  locale: string;
  timestamp: Date;
  thumbnail?: Image;
  wikibase_item: string;
}
