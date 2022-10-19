import { ProviderRpcClient } from "everscale-inpage-provider";

export interface IContractsEvents {
  "ever/contract/set": (ever: ProviderRpcClient) => void;
  "DeNS/contract/set": (contract: any | null) => void;
  "DeNS/contract/check": (domenDeNS: any, collback: (e: any) => void) => void;
}
