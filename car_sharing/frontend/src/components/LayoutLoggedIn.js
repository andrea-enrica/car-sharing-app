import * as React from 'react';
import {useEffect, useState} from 'react';
import "../App.css";
import {styled, useTheme} from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Link from "@mui/material/Link";
import logo from '../images/Sharingry-logos_black-crop.png';
import AppFooter from "../components/AppFooter";
import {useHistory} from "react-router-dom";
import {useTranslation} from "react-i18next";
import SearchBar from "./SearchBar";

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginRight: drawerWidth,
    }),
}));

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

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-start',
}));

export default function LayoutLoggedIn({children}) {
    const theme = useTheme();
    const history = useHistory();
    const {t, i18n} = useTranslation();
    const [,setLanguage] =useState('');
    const [open, setOpen] = useState(false);
    const [isLogout, setIsLogout] = useState(false);

    useEffect(() => {
        i18n
            .changeLanguage(sessionStorage.getItem("state"))
            .then(() => setLanguage(sessionStorage.getItem("state")))
            .catch(err => console.log(err));
    },[i18n])

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const handleLogoutClick = () => {
        sessionStorage.removeItem('item');
        setIsLogout(true);
        window.location.href = '/home';
        return isLogout;
    }

    const handleClick = (name) => {
        if(name === 'My reservations' || name === 'Rezervarile mele')
        {
            history.push('/reservationTable');
        }
        else if(name === 'My cars' || name === 'Masinile mele')
        {
            history.push('/myCars');
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
                            sx={{fontSize: 16, color: 'black', '&:hover': {
                                    color: 'black'}
                                }}
                        >
                            <img src={logo} alt="logo"  width= "100px"/>
                        </Link>
                    </Typography>

                    <SearchBar/>
                    <Box sx={{flexGrow: 1}}/>

                    <Typography>
                        <Link
                            underline="none"
                            href="/addcar"
                        >
                            <BecomeHostButton onClick={() => {}}>
                                {t("become a host")}
                            </BecomeHostButton>
                        </Link>
                    </Typography>

                    <IconButton  color="inherit"
                                 aria-label="open drawer"
                                 edge="end"
                                 onClick={handleDrawerOpen}
                                 sx={{ ...(open && { display: 'none'}) }}
                    >
                        <Typography fontSize={16}>
                            {JSON.parse(sessionStorage.getItem('item'))['username']}
                        </Typography>
                    </IconButton>
                </Toolbar>
            </AppBar>

            <div>
            {children}
            </div>

            <Drawer
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                    },
                }}
                variant="persistent"
                anchor="right"
                open={open}
            >
                <DrawerHeader>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'rtl' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                    </IconButton>
                </DrawerHeader>
                <Divider />
                <List>
                    {[t("profile"), t("my cars"), t("my reservations")].map((text, index) => (
                        <ListItem button key={text} onClick={() => handleClick(text)}>
                            <ListItemText primary={text} />
                        </ListItem>
                    ))}
                </List>
                <Divider />
                <List>
                    <ListItem button primary={'Logout'} onClick={handleLogoutClick}>
                        <ListItemText primary={'Logout'} onClick={handleLogoutClick} />
                    </ListItem>
                </List>
            </Drawer>

            {/* app footer */}
            <AppFooter/>
        </div>
    );
}

