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
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import { styled } from "@mui/material/styles";
import { fontSize } from '@mui/system';

export default function BottomNavbar(){

    useEffect(_ => {

    }, []);

    return (
        <>
{/*             <BottomNavigation sx={{
                bgcolor: '#44273b',
                "& .MuiBottomNavigationAction-root, .Mui-selected, svg": {
                    color: "#007A78",
                    fontSize: 100
                  }
                }} showLabels color='primary'>
                <BottomNavigationAction label="meow"></BottomNavigationAction>
            </BottomNavigation> */}
            <div className="bottomNav">
            <Box display='flex' flexGrow={1}>
                <Typography color="#ffffff">MEOW</Typography>
            </Box>
            <Typography>MEOW</Typography>
            </div>
        </>
    );
}