import * as React from 'react';
import "../App.css";
import {alpha, styled, useTheme} from '@mui/material/styles';
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
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";
import {useState} from "react";
import logo from '../images/carz.png';
import AppFooter from "../components/AppFooter";
import {useHistory} from "react-router-dom";

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

const Search = styled('div')(({theme}) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.black, 0.05),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
    }
}));

const SearchIconWrapper = styled('div')(({theme}) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({theme}) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
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
    const [open, setOpen] = useState(false);
    const [isLogout, setIsLogout] = useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const handleLogoutClick = () => {
        localStorage.removeItem('item');
        setIsLogout(true);
        window.location.href = '/home';
        return isLogout;
    }
    const history = useHistory()
    const handleClick = (name) => {


        if(name === 'My Reservations')
        {
            history.push('/reservationTable')
        }
        else if(name === 'My Cars')
        {

            history.push('/myCars',)

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
                                    color: 'black'
                                } }}
                        >
                            <img src={logo} alt="logo"  width= "70px"
                                 height= "50px"
                            />
                        </Link>
                    </Typography>
                    <Search>
                        <SearchIconWrapper>
                            <SearchIcon/>
                        </SearchIconWrapper>
                        <StyledInputBase
                            placeholder="Search…"
                            inputProps={{'aria-label': 'search'}}
                        />
                    </Search>

                    <Box sx={{flexGrow: 1}}/>

                    <Typography>
                        <Link
                            underline="none"
                            href="/addcar"
                        >
                            <BecomeHostButton onClick={() => {}}>
                                Become a host
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
                            {JSON.parse(localStorage.getItem('item'))['username']}
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
                    {['Profile', 'My Cars', 'My Reservations'].map((text, index) => (
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

