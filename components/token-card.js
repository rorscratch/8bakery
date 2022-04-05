import { AuthContext } from "./auth-provider";
import Image from 'next/image'
import Button from "react-bootstrap/Button";
import { useEffect,useContext , useState } from "react";
import { Cpu } from "react-bootstrap-icons";
import Link from 'next/link'
import Typography from "@mui/material/Typography";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import UnsyncImg from '../public/unsynced.png';
import CardContent from '@mui/material/CardContent';
var TokenId = 0


export default function token(props){



    return(
        <Card sx={{bgcolor: '#44273b'}}>
            <CardContent >
                <Image src={UnsyncImg}  className="tokenImg" width="200" height="200"></Image>
                <Typography sx={{whiteSpace: "normal"}} color="#ffffff">
                    Guandanarian
                </Typography>
                <Typography color="#ffffff">Meow Card</Typography>
                <Typography color="#ffffff">Meow Card</Typography>
            </CardContent>
        </Card>
    )
}