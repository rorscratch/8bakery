import { useState } from "react";
import { TezosToolkit } from "@taquito/taquito";
import { BeaconWallet } from "@taquito/beacon-wallet";

const Tezos = new TezosToolkit("https://teznode.letzbake.com");

function shortenTezosWalletAddress(address) {
    return address.substring(0, 5) + "..." + address.substring(address.length - 5, address.length);
}

export function useWallet() {
    const [initialized, setInit] = useState(false);
    const [address, setAddress] = useState("");
    const [addressShortened, setAddressShortened] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    function loginWithAddress(address) {
        const savedAddress = localStorage.getItem("syncedAddress");
        console.log("loginWithAddress:", savedAddress);

        setAddressShortened(shortenTezosWalletAddress(address));
        setAddress(address);
        setInit(true);
    }

    function logout() {
        console.log("logged out");

        setAddressShortened("");
        setAddress("");
        setInit(false);
    }

    async function connect() {

        setInit(false);
        setAddress("");
        setAddressShortened("");
        setError("");
        setLoading(false);

        try {
            const { address } = await initWallet();
            localStorage.setItem("syncedAddress", address);
            loginWithAddress(address);

        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    }

    async function initWallet() {
        const options = {
            name: "8Bakery"
        };

        const wallet = new BeaconWallet(options);
        const network = { type: "mainnet" };
        await wallet.requestPermissions({ network });
        Tezos.setWalletProvider(wallet);
        const address = await wallet.getPKH();
        return { address };
    }

    return { 
      initialized, 
      address,
      addressShortened,
      loginWithAddress,
      logout,
      error,
      loading,
      connect, 
      shortenTezosWalletAddress
    };
}