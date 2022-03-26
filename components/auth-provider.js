import React from "react";
import { useState, createContext, useEffect } from "react";

import { useWallet } from "../hooks/use-wallet";
import { useBalanceState } from "../hooks/use-balance-state";
import { useBetween } from 'use-between';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {

    const [loggedIn, setLoggedIn] = useState(false);
    const [userDetails, setUserDetails] = useState([]);

    // profile metadata
    const [profileMetadata, setProfileMetadata] = useState({});
    const [isProfileMetadataLoaded, setIsProfileMetadataLoaded] = useState(false);

    const wallet = useWallet();

    useEffect(() => {
        setProfileMetadata({});
        setIsProfileMetadataLoaded(false);

        loadWallet(wallet.address);
    }, [wallet.address]);

    async function loadWallet(address) {

        if (!address || address === "") {
            return;
        }

        // get user profile metadata
        const url = 'https://api.tzkt.io/v1/accounts/' + address + '/metadata';
        console.log("Fetching account metadata from: ", url);

        const fetchData = async () => {
            try {
                const response = await fetch(url);
                console.log("response", response);
                const json = await response.json();

                setProfileMetadata(json);
                setIsProfileMetadataLoaded(true);

                console.log("ProfileMetadata", json);
                //setAdvice(json.slip.advice);
            } catch (error) {
                console.log("error, no profile metadata:", error);
            }
        };
        fetchData();
    }

    const login = value => {

        setLoggedIn(true);
        setUserDetails({
            name: "Alan",
            notifications: 3
        });
    }

    const logout = value => {

        setLoggedIn(false);
        setUserDetails([]);
    }

    const contextValue = {

        status: {

            loggedIn,
            login,
            logout
        },
        user: {

            userDetails,
            setUserDetails
        },
        profileMetadata,
        isProfileMetadataLoaded,

        wallet
    };

    return (
        <AuthContext.Provider value={ contextValue }>
            { children }
        </AuthContext.Provider>
    );
};

export default AuthProvider;