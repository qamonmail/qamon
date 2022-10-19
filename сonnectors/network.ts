import { EVMNetwork, EVM_NAMES } from "@ylide/ethereum";
import { everscaleBlockchainFactory, everscaleWalletFactory } from "@ylide/everscale";
import { AbstractWalletController, WalletControllerFactory, Ylide, YlideKeyPair, YlideKeyStore } from "@ylide/sdk";
import { useCallback, useContext, useEffect, useState } from "react";
import { QamonContext } from "../pages/_app";
import { useStore } from "../storeZ";
import { useMitt } from "react-mitt";
import EEventType from "../models/enums/EEventType";
import { clearStorage } from "../common/lib";
import { useRouter } from "next/router";

Ylide.registerBlockchainFactory(everscaleBlockchainFactory);
Ylide.registerWalletFactory(everscaleWalletFactory);

export default function SetNetwork() {
  const { keystore } = useContext(QamonContext);
  const [keys, setKeys] = useState<YlideKeyStore["keys"]>([]);
  const [wallets, setWallets] = useState<{ wallet: AbstractWalletController; factory: WalletControllerFactory }[]>([]);
  const { emitter } = useMitt();
  const { reload } = useRouter();
  const { accountsState, accountList, readers, savedPassword, ylide } = useStore((store) => store);
  const postAccountsState = useStore((store) => store["network/post/accountsState"]);
  const postReaders = useStore((store) => store["network/post/readers"]);
  const postWalletsList = useStore((store) => store["network/post/walletsList"]);
  const postAccountList = useStore((store) => store["network/post/accountList"]);
  const postYlide = useStore((store) => store["network/post/ylide"]);
  const networkInitial = useStore((store) => store["@network/initial"]);
  const postLoader = useStore((store) => store["network/post/loader"]);
  const handlePasswordRequest = useCallback(() => {
    if (savedPassword) {
      return savedPassword;
    }

    return new Promise(res => {
      emitter.emit(EEventType.ShowPasswordWindow);
      emitter.on(EEventType.GetPassword, (password: string) => {
        res(password);
      });
    });
  }, [savedPassword, emitter]);
  const handleDeriveRequest = useCallback(
    async (
      reason: string,
      blockchain: string,
      wallet: string,
      address: string,
      magicString: string,
    ) => {
      const state = accountsState && accountsState[address];

      if (!state) {
        return null;
      }

      try {
        return state.wallet?.wallet.signMagicString({ address, blockchain, publicKey: null }, magicString);
      } catch (err) {
        return null;
      }
    },
    [accountsState],
  );
  const generateKey = useCallback(
    async (wallet: string, address: string) => {
      try {
        const account = accountsState && accountsState[address];
        const password = await keystore.options.onPasswordRequest(
          `Generation key for ${address}`,
        );
        if (!password) {
          return;
        }
        await keystore.create(
          `Generation key for ${address}`,
          account && account.wallet?.factory.blockchainGroup,
          wallet,
          address,
          password,
        );
        await reload();
      } catch {
        clearStorage();
        await reload();
      }
    },
    [keystore, accountsState],
  );
  const publishKey = useCallback(
    async (wallet: string, address: string, key: Uint8Array) => {
      postLoader(true);
      const account = accountsState && accountsState[address];

      try {
        await account?.wallet!.wallet.attachPublicKey(
          { address, blockchain: "", publicKey: null },
          key,
          {
            address,
            network: EVMNetwork.ARBITRUM,
          },
        );
        postLoader(false);
        void reload();
      } catch {
        clearStorage();
        postLoader(false);
        void reload();
      }
    },
    [accountsState],
  );
  const state = accountsState && accountsState[accountList[0]?.address];

  useEffect(() => {
    if (accountList.length) {
      localStorage.setItem("accs", JSON.stringify(accountList));
    }
  }, [accountList]);
  useEffect(() => {
    postAccountList(localStorage.getItem("accs")
      ? JSON.parse(localStorage.getItem("accs")!)
      : []);
  }, [postAccountList]);
  useEffect(() => {
    if (!ylide) {
      return;
    }

    (
      async () => {
        const availableWallets = await Ylide.getAvailableWallets();
        setWallets(await Promise.all(
          availableWallets.map(async (w) => {
            return {
              factory: w,
              wallet: await ylide?.addWallet(
                w.blockchainGroup,
                w.wallet,
                {
                  dev: false,
                  onNetworkSwitchRequest: async (
                    reason: string,
                    currentNetwork: EVMNetwork | undefined,
                    needNetwork: EVMNetwork,
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
                  onConnected: async () => {
                    console.log("TEST");
                  },
                },
              ),
            };
          }),
        ));
      }
    )();
  }, [ylide]);
  useEffect(() => {
    if (!wallets.length) {
      return;
    }

    (
      async () => {
        const result: Record<string,
          {
            wallet: {
              wallet: AbstractWalletController;
              factory: WalletControllerFactory;
            } | null;
            localKey: YlideKeyPair | null;
            remoteKey: Uint8Array | null;
          }> = {};

        for (let acc of accountList) {
          const wallet = wallets.find(
            (w) => w.factory.wallet === acc.wallet,
          );
          result[acc.address] = {
            wallet: wallet || null,
            localKey:
              keys.find((k) => k.address === acc.address)?.key ||
              null,
            remoteKey:
              (
                await Promise.all(
                  readers.map(async (r) => {
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

        postAccountsState(result);
      }
    )();
  }, [postAccountsState, accountList, keys, readers, wallets]);
  useEffect(() => {
    (
      async () => {
        const list = Ylide.walletsList;
        const result: {
          factory: WalletControllerFactory;
          isAvailable: boolean;
        }[] = [];

        for (const { factory } of list) {
          const isAvailable = await factory.isWalletAvailable();
          result.push({
            factory,
            isAvailable,
          });
        }

        postWalletsList(result);
      }
    )();
  }, [postWalletsList]);
  useEffect(() => {
    keystore.options.onPasswordRequest = handlePasswordRequest;
    keystore.options.onDeriveRequest = handleDeriveRequest;
  }, [handlePasswordRequest, handleDeriveRequest, keystore]);
  useEffect(() => {
    (
      async () => {
        await keystore.init();

        const _ylide = new Ylide(keystore);
        const _readers = [
          await _ylide.addBlockchain("everscale", {
            endpoints: ["https://mainnet.evercloud.dev/d5e1eddde09d4cef8e93bd7d3143f95a/graphql"],
          }),
        ];

        postYlide(_ylide);
        postReaders(_readers);
        setKeys([...keystore.keys]);
      }
    )();
  }, [postYlide, keystore, postReaders]);
  useEffect(() => {
    if (!state) {
      return;
    }

    if (!state.localKey) {
      void generateKey(
        accountList[0].wallet,
        accountList[0].address,
      );
      return;
    }

    if (!state.remoteKey) {
      void publishKey(
        accountList[0].wallet,
        accountList[0].address,
        state.localKey!
          .publicKey,
      );
      return;
    }

    if (state?.remoteKey?.every((e, i) => state.localKey?.publicKey[i] === e)) {
      // Ready

      (
        async () => {
          try {
            await readers[0]?.ever?.requestPermissions({
              permissions: ["basic", "accountInteraction"],
            });
          } catch {
            networkInitial();
            clearStorage();
            await reload();
          }
        }
      )();
    } else {
      networkInitial();
      clearStorage();
      emitter.emit(EEventType.ShowIncorrectPassword);

      // Не удалять, для сены пароля метод ниже.
      // void publishKey(
      //   accountList[0].wallet,
      //   accountList[0].address,
      //   state.localKey?.publicKey,
      // );
    }
  }, [state, accountList, generateKey, publishKey]);

  return null;
};
