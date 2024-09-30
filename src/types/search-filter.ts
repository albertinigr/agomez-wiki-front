import { Locale } from "./locale";

export interface SearchFilter {
  date: string;
  target: Locale | null;
  page: number;
  size: number;
}
