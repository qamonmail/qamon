import { createIntl, createIntlCache, IntlShape } from "react-intl";
import English from "../content/compiled-locales/en.json";
import Korean from "../content/compiled-locales/ko.json";
import ELanguage from "../models/enums/ELanguage";

export const intl = (locale?: string): IntlShape => {
  const cache = createIntlCache();

  switch (locale) {
    case ELanguage.English:
      return createIntl({
        locale: ELanguage.English,
        defaultLocale: ELanguage.English,
        messages: English
      }, cache);

    case ELanguage.Korean:
    default:
      return createIntl({
        locale: ELanguage.Korean,
        defaultLocale: ELanguage.Korean,
        messages: Korean
      }, cache);
  }
};
