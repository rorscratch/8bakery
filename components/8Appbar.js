import AppBar from '@mui/material/AppBar';
import React from "react";
import Image from 'next/image'
import Icon from '../public/8bake.png'
import Navbar from "react-bootstrap/Navbar";
import Button from '@mui/material/Button';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Popover from 'react-bootstrap/Popover'
import Card from "react-bootstrap/Card";
import MeowerMeow from "./test-component";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "./auth-provider";
import { useBalanceState } from "../hooks/use-balance-state";
import { useHash } from "../hooks/use-hash";
import Link from 'next/link';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import UnsyncImg from '../public/unsynced.png';
import Divider from '@mui/material/Divider';

export default function Appbar8(props){
    const avatarSize = 40;
    const { status, user, wallet, profileMetadata, isProfileMetadataLoaded } = useContext(AuthContext);
    var isPreview = props.isPreview;

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
/*         <Navbar>
            <Navbar.Collapse className="navbar justify-content-center">

                {(isProfileMetadataLoaded) ? (
                    <>
                        <Navbar.Text>
                            <Button variant="orange" size="sm" className="border-dark border-1">Inventory</Button>
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
                <MeowerMeow></MeowerMeow>
            </Navbar.Collapse>
        </Navbar> */
        <>
        <AppBar position="fixed" color='primary' enableColorOnDark>
        <Toolbar>
        <Box display='flex' flexGrow={1}>
            <Link href={"/"} sx={{ flexGrow: 1 }}>
                <Image className="clickableImage" src={Icon}></Image>
            </Link>
        </Box>
            {/* Inventory Button */}
            {(isProfileMetadataLoaded) ? (
                    <>
                        <Button sx={{padding: "4px 4px"}} color="secondary" variant="contained" className="border-dark border-1">Inventory</Button>
                        &nbsp;
                    </>
                ) : (<></>)}
            <Typography style={{ borderLeft: '0.2em solid #222034',  padding: '2em 0.5em', marginLeft: '1em',paddingRight: '.75em'}}></Typography>
            {/* Unsync Button */}
            {wallet.initialized && <Button sx={{padding: "4px 4px"}} color="secondary" variant="contained" size="sm"  className="border-dark border-1" onClick={logout}>unsync</Button>}
            {/* Sync Button */}
            
            {!wallet.address &&               
                <>
                    {<Button sx={{padding: "4px 4px"}} color="secondary" variant="contained" size="sm" className="border-dark border-1"  onClick={wallet.connect}>{wallet.loading ? "loading..." : "sync"}</Button>}
                </>
                }
            {/* Profile Data */}
            
            {wallet.address &&         
                <><Typography sx={{paddingLeft:"16px",paddingRight:"8px"}} variant="subtitle1" className="appbarLink">
                    {isProfileMetadataLoaded ? profileMetadata.alias : wallet.addressShortened }{" "}
                </Typography>
                
                <Image src={isProfileMetadataLoaded ? "https://services.tzkt.io/v1/avatars2/"+wallet.address : UnsyncImg } sx={{padding: "6px 6px"}} width={avatarSize}  height={avatarSize}  className="pixelImg"/></>
            }
            {!wallet.address &&         
                <><Typography sx={{paddingLeft:"16px",paddingRight:"8px"}} variant="subtitle1" className="appbarLink">
                    Unsynced 
                </Typography>
                
                <Image src={UnsyncImg} width={avatarSize} height={avatarSize}  className="pixelImg"/></>
            }
        
        </Toolbar>
        </AppBar>
        </>
    );
}