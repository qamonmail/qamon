import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { routes } from "../consts/routes";
import { useStore } from "../storeZ";
import ELanguage from "../models/enums/ELanguage";
import appConfig from "../app.config";
import useLocalStorage from "./useLocalStorage";

const useRedirect = () => {
  const [auth, setAuth] = useState<boolean | undefined>();
  const [currentLocale, setCurrentLocale] = useLocalStorage<ELanguage | undefined>(appConfig.keys.settingsLocale, ELanguage.Korean);
  const { asPath, replace, push, locale } = useRouter();
  const { accountsState, accountList } = useStore(store => store);

  useEffect(() => {
    if (!currentLocale) {
      setCurrentLocale(ELanguage.Korean);

      if (locale !== ELanguage.Korean) {
        void replace(asPath, asPath, {
          locale: ELanguage.Korean,
        });
      }
    } else if (locale !== currentLocale) {
      void replace(asPath, asPath, {
        locale: ELanguage.Korean,
      });
    }
  }, [currentLocale]);
  useEffect(() => {
    if (accountsState !== null) {
      const state = accountsState[accountList[0]?.address];
      const authorized = !!state?.remoteKey?.every((e, i) => state.localKey?.publicKey[i] === e);
      setAuth(authorized);
    }
  }, [accountsState, accountList]);
  useEffect(() => {
    if (auth !== undefined) {
      switch (true) {
        case auth && [routes.main, routes.loginWallet, routes.registration].includes(asPath):
          void push(routes.inbox, routes.inbox, {
            locale: currentLocale,
          });
          break;

        case !auth && ![routes.main, routes.loginWallet, routes.registration].includes(asPath):
          void push(routes.main, routes.main, {
            locale: currentLocale,
          });
          break;
      }
    }
  }, [auth]);
};

export default useRedirect;
