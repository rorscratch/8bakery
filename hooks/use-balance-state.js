import { useState, useEffect } from "react";
import { TezosToolkit } from "@taquito/taquito";

const Tezos = new TezosToolkit("https://teznode.letzbake.com");

export function useBalanceState(address = "") {
  const [balance, setBalance] = useState(0);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadBalance(address);
  }, [address]);

  async function loadBalance(address) {
    console.log("loadBalance for address: ",address);
    if (!address || address==="") {
      return;
    }
    try {
      setLoading(true);
      const balance = await Tezos.tz.getBalance(address);
      console.log(balance);
      setBalance(balance / 10 ** 6);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  return { balance, error, loading };
}