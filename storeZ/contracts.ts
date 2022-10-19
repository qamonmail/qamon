import { Address, ProviderRpcClient, TvmException } from "everscale-inpage-provider";
import { IContractsEvents } from "../models/interfaces/IContractsEvents";
import { IContractsState } from "../models/interfaces/IContractsState";
import { TStoreSlice } from "../models/types/TStoreSlice";
import domainAbi from "../abi/domain.abi.json";

export const contractsModule: TStoreSlice<IContractsState & IContractsEvents> = (set, get) => (
  {
    ever: null,
    DeNSContract: null,
    "ever/contract/set": ever => {
      set({
        ever: ever
      });
    },
    "DeNS/contract/set": contract => {
      set({
        DeNSContract: contract
      });
    },
    "DeNS/contract/check": async (domenDeNS, collback) => {
      if (get().ever) {
        try {
          const addressesDeNS = await get().DeNSContract.methods.resolve({ answerId: 0, path: domenDeNS }).call();
          if (addressesDeNS.certificate._address) {
            try {
              const _ever = get().ever;
              const dePool = await new _ever.Contract(domainAbi, new Address(addressesDeNS.certificate._address));
              const output = await dePool.methods.query({ answerId: 0, key: 0 }).call();
              const result = await get().ever.unpackFromCell({
                structure: [{ name: "address", type: "address" }] as const,
                boc: output.value,
                allowPartial: true,
              });
              return collback(result.data.address._address);
            } catch (e) {
              return collback(e);
            }
          }
        } catch (e) {
          if (e) {
            console.error(e);
          }
        }
      }
    }
  }
);
