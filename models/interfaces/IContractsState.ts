import { ProviderRpcClient } from "everscale-inpage-provider";

export interface IContractsState {
  ever: ProviderRpcClient | null;
  DeNSContract: any | null;
}
