import {
  AbstractBlockchainController,
  AbstractWalletController,
  WalletControllerFactory,
  Ylide,
  YlideKeyPair, YlideKeyStore
} from "@ylide/sdk";

export interface INetworkState {
  savedPassword: string | null;
  walletsList: Array<{ factory: WalletControllerFactory; isAvailable: boolean }>;
  accountList: Array<{ wallet: string; address: string, publicKey: Uint8Array}>;
  ylide: Ylide | null;
  wallets: Array<{ wallet: AbstractWalletController; factory: WalletControllerFactory }>;
  accountsState: Record<string,
    {
      localKey: YlideKeyPair | null;
      remoteKey: Uint8Array | null;
      wallet: {
        wallet: AbstractWalletController;
        factory: WalletControllerFactory;
      } | null;
    }> | null;
  readers: Array<AbstractBlockchainController & {ever?: any}>;
  keys: YlideKeyStore["keys"];
  recipient: string;
  loading: boolean;
}
