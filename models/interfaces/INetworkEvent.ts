import {
  AbstractBlockchainController,
  AbstractWalletController,
  WalletControllerFactory,
  Ylide,
  YlideKeyPair, YlideKeyStore
} from "@ylide/sdk";
import { Url } from "url";

export interface INetworkEvent {
  "@network/initial": () => void;
  "network/post/password": (savedPassword: string) => void;
  "network/post/accountsState": (accountsState: Record<string,
    {
      localKey: YlideKeyPair | null;
      remoteKey: Uint8Array | null;
      wallet: {
        wallet: AbstractWalletController;
        factory: WalletControllerFactory;
      } | null;
    }>) => void;
  "network/create/walletsList": () => void;
  "network/connect/accountList": (factory: WalletControllerFactory, push: (url: string, as?: Url | undefined, options?: {
    shallow?: boolean;
    locale?: string | false;
    scroll?: boolean;
    unstable_skipClientCache?: boolean;
  } | undefined) => Promise<boolean>) => void;
  "network/connect/availableWallets": () => void;
  "network/create/accountsState": () => void;
  "network/post/accountList": (accountList: Array<{ wallet: string; address: string }>) => void;
  "network/post/ylide": (ylide: Ylide) => void;
  "network/post/readers": (readers: Array<AbstractBlockchainController>) => void;
  "network/post/keys": (keys: YlideKeyStore["keys"]) => void;
  "network/post/walletsList": (walletsList: Array<{ factory: WalletControllerFactory; isAvailable: boolean }>) => void;
  "network/post/loader": (loading: boolean) => void;
}
