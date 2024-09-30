"use client";
import { useGlobalContext } from "./GlobalContext";
import { IntlProvider } from "react-intl";
import * as translations from "../lang";

const messages: { [lang: string]: { [key: string]: string } } = {
  ...translations,
};

const registeredLocaleCodes = Object.keys(messages);

export const LanguageProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { locale } = useGlobalContext();
  const code = registeredLocaleCodes.includes(locale.code) ? locale.code : "en";
  return (
    <IntlProvider locale={locale.code} messages={messages[code]}>
      {children}
    </IntlProvider>
  );
};
