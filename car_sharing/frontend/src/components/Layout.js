import React, {useState} from 'react';
import {alpha, styled} from '@mui/material/styles';
import Toolbar from '@material-ui/core/Toolbar';
import {Typography} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import Box from '@mui/material/Box';
import Link from "@mui/material/Link";
import MuiAppBar from '@mui/material/AppBar';
import InputBase from "@mui/material/InputBase";
import logo from '../images/carz.png';
import AppFooter from "./AppFooter";

const AppBar = styled(MuiAppBar, {shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        flexGrow: 1,
    }),
);

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
    color: 'black',
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
    const [open] = useState(false);
    const [searchKeyword, setSearchKeyword] = useState('');

    function onChange(e) {
        setSearchKeyword(e.target.value);
        console.log(searchKeyword);
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
                            onChange={onChange}
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

                    <StyledLinks>
                        <Link
                            underline="none"
                            href="/login"
                            sx={rightLink}
                        >
                            {'Log In'}
                        </Link>
                    </StyledLinks>

                    <StyledLinks>
                        <Link
                            underline="none"
                            href="/signup"
                            sx={rightLink}
                        >
                            {'Sign Up'}
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
    )
}