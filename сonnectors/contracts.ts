import { Address, ProviderRpcClient } from "everscale-inpage-provider";
import { useEffect } from "react";
import { useStore } from "../storeZ";
import rootAbi from "../abi/root.abi.json";

const ADDRESS_DATA_FABRIC = "0:a7d0694c025b61e1a4a846f1cf88980a5df8adf737d17ac58e35bf172c9fca29";

export default function SetContracts() {
  const { ever } = useStore((store) => store);
  const DeNSContractSet = useStore((store) => store["DeNS/contract/set"]);
  const everContractSet = useStore((store) => store["ever/contract/set"]);

  useEffect(() => {
    if (!ever) {
      everContractSet(new ProviderRpcClient());
    }
  }, [ever]);
  useEffect(() => {
    if (ever) {
      DeNSContractSet(new ever.Contract(rootAbi, new Address(ADDRESS_DATA_FABRIC)));
    }
  }, [ever])

  return null;
}
