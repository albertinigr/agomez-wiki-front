import { Content } from "./content";
import { Image } from "./image";

export interface ArticleEssencial {
  title: string;
  extract: string;
  locale: string;
  timestamp: Date;
  thumbnail?: Image;
  wikibase_item: string;
  content_urls: { desktop: Content; mobile: Content };
}
