import React, {useState} from "react";
import {alpha, styled} from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import {useHistory} from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import HighlightOffRoundedIcon from '@mui/icons-material/HighlightOffRounded';

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
    float: 'right',

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
            width: '25ch',
        },
    },
}));

const SearchBar = () => {
    const [searchKeyword, setSearchKeyword] = useState('');

    function handleChange(e) {
        setSearchKeyword(e.target.value);
    }

    function handleClick(searchKeyword) {
        setSearchKeyword("");
        history.push("/home",{searchKeyword:searchKeyword});
        window.location.reload();
    }

    const history= useHistory();
    const handleKeyPress = (e) =>{
        if (e.charCode == 13) {
            history.push("/home",{searchKeyword:searchKeyword});
            window.location.reload();
        }
    }

    return (
        <Search>
            <SearchIconWrapper>
                <SearchIcon/>
            </SearchIconWrapper>
            <StyledInputBase
                placeholder="Search…"
                inputProps={{'aria-label': 'search'}}
                onChange={(e) => handleChange(e)}
                onKeyPress={handleKeyPress}
            />

            <IconButton onClick={() => {
                handleClick(searchKeyword) }}
            >
                <HighlightOffRoundedIcon/>
            </IconButton>
        </Search>
    );
}

export default SearchBar;



