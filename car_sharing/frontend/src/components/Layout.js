import React, {useEffect, useState} from 'react';
import {styled} from '@mui/material/styles';
import Toolbar from '@material-ui/core/Toolbar';
import {Typography} from "@mui/material";
import Box from '@mui/material/Box';
import Link from "@mui/material/Link";
import MuiAppBar from '@mui/material/AppBar';
import logo from '../images/Sharingry-logos_black-crop.png';
import AppFooter from "./AppFooter";
import SearchBar from "./SearchBar";
import '../assets/i18n/i18n';
import {useTranslation} from "react-i18next";

const AppBar = styled(MuiAppBar, {shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        flexGrow: 1,
    }),
);

const BecomeHostButton = styled('button')(({theme}) => ({
    fontFamily: 'Playfair+Display',
    backgroundColor: '#52ab98',
    color: 'white',
    '&:hover': {
        backgroundColor: "#2b6777"
    },
    height: 30,
    border: 'none',
    borderRadius: 5,
    marginRight: 10,
}));

const StyledLinks = styled('div')(({theme}) => ({
    marginRight: 10,
}));

const rightLink = {
    fontSize: 16,
    color: 'black',
    '&:hover': {
        backgroundColor: 'rgba(0,0,0,0.05)',
        color: 'black'
    }
};

export default function Layout({children}) {
    const {t, i18n} = useTranslation();
    const [open] = useState(false);
    const [currentLanguage,setLanguage] =useState('');

    useEffect(() => {
        i18n
            .changeLanguage(sessionStorage.getItem("state"))
            .then(() => setLanguage(sessionStorage.getItem("state")))
            .catch(err => console.log(err));
        console.log(sessionStorage.getItem("state"))
    },[])

    function handleBecomeHost() {
        if(JSON.parse(sessionStorage.getItem('item')) === null) {
            window.location.href ='/login';
        } else {
            window.location.href ='/addcar';
        }
    }

    return (
        <div>
            {/* app bar */}
            <AppBar position="fixed" elevation={0} open={open}>
                <Toolbar>
                    <Typography>
                        <Link
                            underline="none"
                            href="/home"
                            sx={{fontSize: 16,
                                color: 'black', '&:hover': {
                                    color: 'black'
                                    }
                                }}
                        >
                            <img src={logo} alt="logo"  width= "100px"/>
                        </Link>
                    </Typography>

                    <SearchBar/>
                    <Box sx={{flexGrow: 1}}/>

                    <Typography>
                        <BecomeHostButton onClick={() => { handleBecomeHost() }}>
                            {t("become a host")}
                        </BecomeHostButton>
                    </Typography>

                    <StyledLinks>
                        <Link
                            underline="none"
                            href="/login"
                            sx={rightLink}
                        >
                            {t("log in")}
                        </Link>
                    </StyledLinks>

                    <StyledLinks>
                        <Link
                            underline="none"
                            href="/signup"
                            sx={rightLink}
                        >
                            {t("sign up")}
                        </Link>
                    </StyledLinks>
                </Toolbar>
            </AppBar>

            <div>
                {children}
            </div>

            {/* app footer */}
            <AppFooter/>
        </div>
    );
}