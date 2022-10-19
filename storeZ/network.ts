import { EVMNetwork, EVM_NAMES } from "@ylide/ethereum";
import {
  AbstractWalletController,
  WalletControllerFactory,
  Ylide,
  YlideKeyPair,
} from "@ylide/sdk";
import { TStoreSlice } from "../models/types/TStoreSlice";
import { INetworkState } from "../models/interfaces/INetworkState";
import { INetworkEvent } from "../models/interfaces/INetworkEvent";
import { intl } from "../common/intl";
import appConfig from "../app.config";
import ELanguage from "../models/enums/ELanguage";
import { routes } from "../consts/routes";

export const networkModule: TStoreSlice<INetworkState & INetworkEvent> = (set, get) => (
  {
    accountsState: null,
    savedPassword: null,
    walletsList: [],
    accountList: [],
    ylide: null,
    wallets: [],
    readers: [],
    keys: [],
    recipient: "",
    loading: false,
    "network/post/loader": (loading) => {
      set({
        loading: loading,
      });
    },
    "@network/initial": () => {
      set({
        accountsState: null,
        savedPassword: null,
        // walletsList: [],
        accountList: [],
        // ylide: null,
        // wallets: [],
        // readers: [],
        keys: [],
        recipient: "",
      });
    },
    "network/post/password": (savedPassword) => {
      set({
        savedPassword: savedPassword,
      });
    },
    "network/post/accountsState": (accountsState) => {
      set({
        accountsState: accountsState,
      });
    },
    "network/create/walletsList": async () => {
      const list = Ylide.walletsList;
      const walletsList: {
        factory: WalletControllerFactory;
        isAvailable: boolean;
      }[] = [];

      for (const { factory } of list) {
        walletsList.push({
          factory,
          isAvailable: await factory.isWalletAvailable(),
        });
      }

      set({
        walletsList: walletsList,
      });
    },
    "network/connect/accountList": async (factory, push) => {
      const locale = localStorage.getItem(appConfig.keys.settingsLocale) || ELanguage.Korean;
      const tempWallet = await factory.create({
        onNetworkSwitchRequest: () => {
        },
      });
      const newAcc = await tempWallet.requestAuthentication();

      // BAG Инкапсулировать
      const blockchain = get().ylide?.blockchains[0];
      const verAddress = blockchain && newAcc && await blockchain.extractPublicKeyFromAddress(newAcc.address);

      if (get().savedPassword || verAddress) {
        if (!newAcc) {
          alert(intl(locale).formatMessage({
            id: "auth-was-rejected",
            defaultMessage: "Auth was rejected",
          }));
          return;
        }

        const exists = get().accountList.some((a: any) => a.address === newAcc.address);

        if (exists) {
          alert(intl(locale).formatMessage({
            id: "already-registered",
            defaultMessage: "Already registered",
          }));
          return;
        }

        set({
          accountList: get().accountList.concat([
            {
              wallet: factory.wallet,
              address: newAcc.address,
              publicKey: newAcc.publicKey,
            },
          ]),
        });
      } else {
        await push(routes.registration);
      }
    },
    "network/connect/availableWallets": async () => {
      if (!get().ylide) {
        return;
      }

      const availableWallets = await Ylide.getAvailableWallets();

      set({
        wallets: await Promise.all(
          availableWallets.map(async (w) => {
            return {
              factory: w,
              wallet: await get().ylide!.addWallet(
                w.blockchainGroup,
                w.wallet,
                {
                  dev: false,
                  endpoints: ["https://mainnet.evercloud.dev/d5e1eddde09d4cef8e93bd7d3143f95a/graphql"],
                  onNetworkSwitchRequest: async (
                    reason: string,
                    currentNetwork: EVMNetwork | undefined,
                    needNetwork: EVMNetwork,
                    needChainId: number,
                  ) => {
                    alert(
                      "Wrong network (" +
                      (
                        currentNetwork
                          ? EVM_NAMES[currentNetwork]
                          : "undefined"
                      ) +
                      "), switch to " +
                      EVM_NAMES[needNetwork],
                    );
                  },
                },
              ),
            };
          }),
        ),
      });
    },
    "network/create/accountsState": async () => {
      if (!get().wallets.length) {
        return;
      }

      const result: Record<string,
        {
          wallet: {
            wallet: AbstractWalletController;
            factory: WalletControllerFactory;
          } | null;
          localKey: YlideKeyPair | null;
          remoteKey: Uint8Array | null;
        }> = {};

      for (let acc of get().accountList) {
        const wallet = get().wallets.find(
          (w: any) => w.factory.wallet === acc.wallet,
        );
        result[acc.address] = {
          wallet: wallet || null,
          localKey:
            get().keys.find((k: any) => k.address === acc.address)?.key ||
            null,
          remoteKey:
            (
              await Promise.all(
                get().readers.map(async (r: any) => {
                  if (!r.isAddressValid(acc.address)) {
                    return null;
                  }
                  const c =
                    await r.extractPublicKeyFromAddress(
                      acc.address,
                    );
                  if (c) {
                    return c.bytes;
                  } else {
                    return null;
                  }
                }),
              )
            ).find((t) => !!t) || null,
        };
      }

      set({
        accountsState: result,
      });
    },
    "network/post/accountList": (accountList) => {
      set({
        accountList: accountList,
      });
    },
    "network/post/ylide": (ylide) => {
      set({
        ylide: ylide,
      });
    },
    "network/post/readers": (readers) => {
      set({
        readers: readers,
      });
    },
    "network/post/keys": (keys) => {
      set({
        keys: keys,
      });
    },
    "network/post/walletsList": (walletsList) => {
      set({
        walletsList: walletsList,
      });
    },
  }
);
