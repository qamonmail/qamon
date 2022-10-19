import * as Sentry from "@sentry/react";
import { BrowserTracing } from "@sentry/tracing";
import Head from "next/head";
import { createContext, FC, memo, PropsWithChildren, ReactNode, useEffect, useMemo, useState } from "react";
import type { AppProps } from "next/app";
import { ThemeProvider } from "next-themes";
import Router, { useRouter } from "next/router";
import { Reset } from "styled-reset";
import { IntlProvider } from "react-intl";
import NProgress from "nprogress";
import GlobalStyle from "../styles/GlobalStyle";
import ETheme from "../models/enums/ETheme";
import English from "../content/compiled-locales/en.json";
import Korean from "../content/compiled-locales/ko.json";
import "nprogress/nprogress.css";
import appConfig from "../app.config";
import { BrowserLocalStorage, YlideKeyStore } from "@ylide/sdk";
import SetNetwork from "../сonnectors/network";
import { MittProvider } from "react-mitt";
import useRedirect from "../hooks/useRedirect";
import ELanguage from "../models/enums/ELanguage";
import { useResponsive } from "ahooks";
import Preloader from "../components/Preloader";
import { useStore } from "../storeZ";
import { clearStorage } from "../common/lib";
import SetContracts from "../сonnectors/contracts";
import useLocalStorage from "../hooks/useLocalStorage";

interface QamonProviderProps {
  children: ReactNode;
}

Sentry.init({
  dsn: "https://fb69b456c93540769b5d71770a48c8d5@o1388311.ingest.sentry.io/6710615",
  integrations: [new BrowserTracing()],
  tracesSampleRate: 1.0,
});

NProgress.configure({ showSpinner: false });
Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

const themes = [ETheme.Theme1, ETheme.Theme2, ETheme.Theme3, ETheme.Theme4, ETheme.Theme5];
export const QamonContext = createContext<any>(null);
const QamonProvider: FC<PropsWithChildren<QamonProviderProps>> = ({ children }: any) => {
  const networkInitial = useStore((store) => store["@network/initial"]);
  const { readers } = useStore(store => store);
  const storage = useMemo(() => new BrowserLocalStorage(), []);
  const keystore = useMemo(
    () =>
      new YlideKeyStore(storage, {
        onPasswordRequest: async () => null,
        onDeriveRequest: async () => null,
      }),
    [storage],
  );

  useEffect(() => {
    if (readers?.length) {
      (
        async () => {
          const subscriber = await (
            readers[0] as any
          )?.ever?.subscribe("loggedOut");
          subscriber.on("data", () => {
            networkInitial();
            clearStorage();
            document.location.reload();
          });
        }
      )();
    }
  }, [readers, networkInitial]);

  return (
    <QamonContext.Provider
      value={{
        keystore,
      }}>
      {children}
    </QamonContext.Provider>
  );
};
QamonProvider.displayName = "QamonProvider";
const QamonApp = ({ Component, pageProps }: AppProps) => {
  const [isLg, setIsLg] = useState<boolean | null>(null);
  const { loading } = useStore(store => store);
  const { locale } = useRouter();
  const [, setCurrentLocale] = useLocalStorage<ELanguage | undefined>(appConfig.keys.settingsLocale, ELanguage.Korean);
  const messages = useMemo(() => {
    switch (locale) {
      case ELanguage.English:
        return English;

      case ELanguage.Korean:
      default:
        return Korean;
    }
  }, [locale]);
  const responsive = useResponsive();

  useRedirect();

  useEffect(() => {
    if (responsive) {
      setIsLg(responsive.lg);
    }
  }, [responsive]);


  useEffect(() => {
    (async () => {
      if(localStorage.getItem(appConfig.keys.settingsLocale) === "\"ko\""){
        setCurrentLocale(ELanguage.Korean)
      } else if(localStorage.getItem(appConfig.keys.settingsLocale) === "\"en\"") {
        setCurrentLocale(ELanguage.English)
      }
    })()
  }, [])
  return (
    <QamonProvider>
      <MittProvider />
      <SetContracts />
      <Reset />
      <GlobalStyle />
      <SetNetwork />
      <ThemeProvider defaultTheme={ETheme.Theme1} themes={themes} storageKey={appConfig.keys.settingsTheme}>
        <Head>
          <meta
            name="viewport"
            content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no" />
        </Head>
        <IntlProvider locale={locale || ELanguage.Korean} messages={messages} onError={() => null}>
          {isLg !== null && (
            <Component {...{ ...pageProps, isLg }} />
          )}
          {(
            loading ||
            (
              isLg === null
            )
          ) && (
              <Preloader size={200} />
            )}
        </IntlProvider>
      </ThemeProvider>
    </QamonProvider>
  );
};

export default memo(QamonApp);
