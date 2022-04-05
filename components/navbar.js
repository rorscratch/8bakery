import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Popover from 'react-bootstrap/Popover'
import Card from "react-bootstrap/Card";
import MeowerMeow from "./test-component";
import { useContext, useEffect, useState } from "react";

import { AuthContext } from "./auth-provider";
import { useBalanceState } from "../hooks/use-balance-state";
import { useHash } from "../hooks/use-hash";

const popover = (
    <Popover id="popover-positioned-bottom">
        <Card>
            <Card.Body>
                <Card.Text>
                    <p><strong>ISLANDERS</strong> is a visual inventory for your ISLANDER-related godots on <a href="https://www.8bidou.com/inventory/?addr=tz1XqJ9e6NdouxdGvm2V3aknwFnGL6Kinu6A" target="_blank">8bidou</a>.</p>
                    <p><strong>ISLANDER</strong> is an idle crafting game made in PICO-8. You can play the game on <a href="https://teia.art/objkt/452112" target="_blank" >Teia</a>.</p>
                    Created and maintained by <a href="https://twitter.com/CarsonKompon" target="_blank">@CarsonKompon</a>, powered by <a href="https://tezostaquito.io/" target="_blank">taquito</a> and <a href="https://api.tzkt.io/" target="_blank">tzkt.io</a>
                </Card.Text>
            </Card.Body>
        </Card>
    </Popover>
);

export default function MyNavbar(props){

    const { status, user, wallet, profileMetadata, isProfileMetadataLoaded } = useContext(AuthContext);
    var isPreview = props.isPreview;

    const [snackbarVisible, setSnackbarVisible] = useState(false);

    const shareClick = () => {
        console.log(wallet);
        navigator.clipboard.writeText("https://" + window.location.hostname + "?wallet=" + wallet.address);
        setSnackbarVisible(true);
    };

    const snackbarClose = () => {
        setSnackbarVisible(false);
    };

    const {
        balance,
        error: balanceError,
        loading: balanceLoading,
    } = useBalanceState(wallet.address);

    const [hash, setHash] = useHash();

    function logout() {
        localStorage.clear();
        wallet.logout();
    }

    useEffect(_ => {
        if (typeof window !== "undefined") {
            const savedAddress = typeof window !== "undefined" ? localStorage.getItem("syncedAddress") : null;
            //console.log("localStorage", localStorage);

            if (savedAddress != null) {
                wallet.loginWithAddress(savedAddress);
            }
        }
    }, []);

    return (
        <Navbar>
            <Navbar.Collapse className="navbar justify-content-center">

                {(isProfileMetadataLoaded && !isPreview) ? (
                    <>
                        <Navbar.Text>
                            <Button onClick={shareClick} variant="orange" size="sm" className="border-dark border-1">Inventory</Button>
                        </Navbar.Text>
                        &nbsp;
                    </>
                ) : (<></>)}

                {!wallet.address &&               
                <Navbar.Text>
                    {<Button variant="kitty" size="sm" className="border-dark border-1" onClick={wallet.connect}>{wallet.loading ? "loading..." : "sync"}</Button>}
                </Navbar.Text>
                }

                <Navbar.Text>
                    {wallet.initialized && <Button variant="blue" size="sm"  className="border-dark border-1" onClick={logout}>unsync</Button>}
                </Navbar.Text>

                &nbsp; 

                <Navbar.Text>
                    <OverlayTrigger trigger="click" rootClose placement="bottom" overlay={popover}>
                        <Button variant="green" size="sm" className="border-dark border-1">?</Button>
                    </OverlayTrigger>
                </Navbar.Text>
                <MeowerMeow></MeowerMeow>
            </Navbar.Collapse>
        </Navbar>
    );
}