// components/Layout.js

import Header from "./Header";
import Appbar8 from "./8Appbar";
import Link from 'next/link'
import { Drawer } from "@mui/material";
import Button from "react-bootstrap/Button";
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import BottomNavbar from "./bottomappbar";


  const theme = createTheme({
  palette: {
    background: {
      default: '#000000'
    },
    primary: {
      light: '#705065',
      main: '#44273b',
      dark: '#1f0015',
      contrastText: '#fff',
    },
    secondary: {
      light: '#ffaaea',
      main: '#d679b8',
      dark: '#a34a88',
      contrastText: '#fff',
    }
  },
  typography: {
    h3: {
      fontSize: 63,
      fontWeight: 300,
      color: "#ffffff",
      letterSpacing: "0.0075em",
      verticalAlign: "middle",
      alignItems: "center",
      textAlign: "center"
    },
    button: {
      fontSize: 16,
      fontWeight: "bold",
      color: "#ffffff",
      letterSpacing: "0.0100em",
      verticalAlign: "middle",
      alignItems: "center",
      textTransform: "none",
      textAlign: "center"
    }
  },
  card: {
    borderRadius: 0,
    backgroundColor: '#705065',
    color: '#705065',
    boxShadow: "none"
   }
});



const Layout = props => (
  <div>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Appbar8/>
      <div>
        <div className="main">
          {props.children}
        </div>   
      </div>
      <BottomNavbar/>
    </ThemeProvider>
  </div>
);

export default Layout;