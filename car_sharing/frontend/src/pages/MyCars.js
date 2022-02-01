import * as React from 'react';
import {useEffect, useState} from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Container from "@mui/material/Container";
import CarService from "../services/CarService";
import {alpha, createMuiTheme, FormControlLabel, styled, Switch} from "@material-ui/core";
import {green, pink, teal} from "@material-ui/core/colors";

const Android12Switch = styled(Switch)(({ theme }) => ({
    padding: 8,
    '& .MuiSwitch-track': {
        borderRadius: 22 / 2,
        '&:before, &:after': {
            content: '""',
            position: 'absolute',
            top: '50%',
            transform: 'translateY(-50%)',
            width: 16,
            height: 16,
        },
        '&:before': {
            backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
                theme.palette.getContrastText(theme.palette.primary.main),
            )}" d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"/></svg>')`,
            left: 12,
        },
        '&:after': {
            backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
                theme.palette.getContrastText(theme.palette.primary.main),
            )}" d="M19,13H5V11H19V13Z" /></svg>')`,
            right: 12,
        },
    },
    '& .MuiSwitch-thumb': {
        boxShadow: 'none',
        width: 16,
        height: 16,
        margin: 2,
    },
}));

export default function MyCars() {
    const id_user = JSON.parse(sessionStorage.getItem('item'))['id'];
    const [rows,setRows] = useState([]);
    let countCars = 0;

    const getCars = async (id_user) => {
        return await CarService.getCarOfUser(id_user);
    }

    useEffect(() => {
        getCars(id_user).then(r => {
            setRows(r.data);
        })
    },[]);

    const handleVisibility = (row) => {
        if(row.available === "false") {
            row.available = "true";
            CarService.addCarRequest(row).then((r) => {
                console.log(r);
            });
        } else if(row.available === "true") {
            row.available = "false";
            CarService.addCarRequest(row).then((r) => {
                console.log(r);
            });
        }
    }
    const theme = createMuiTheme({
        overrides: {
            MuiSwitch: {
                switchBase: {
                    // Controls default (unchecked) color for the thumb
                    color: "#011"
                },
                colorSecondary: {
                    "&$checked": {
                        // Controls checked color for the thumb
                        color: "#011"
                    }
                },
                track: {
                    // Controls default (unchecked) color for the track
                    opacity: 0.2,
                    backgroundColor: "#011",
                    "$checked$checked + &": {
                        // Controls checked color for the track
                        opacity: 0.7,
                        backgroundColor: "#011"
                    }
                }
            }
        }
    });
    const GreenSwitch = styled(Switch)(({ theme }) => ({
        '& .MuiSwitch-switchBase.Mui-checked': {
            color: '#00796b',
            '&:hover': {
                backgroundColor: alpha('#00796b', theme.palette.action.hoverOpacity),
            },
        },
        '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
            backgroundColor: '#00796b',
        },
    }));

    const label = { inputProps: { 'aria-label': 'Switch demo' } };
    return (
        <Container  component="section" sx={{
            marginBottom: '35%',
            marginTop:'7%',
            marginLeft:'10%',
            marginRight:'10%',
            fontSize: 15,
            color: "secondary"}}>
            <TableContainer component={Paper}>
                <Table sx={{minWidth: '80%' }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="left">No. crt</TableCell>
                            <TableCell align="center">Model</TableCell>
                            <TableCell align="center">Brand</TableCell>
                            <TableCell align="center">Address</TableCell>
                            <TableCell align="center">Manufacturing year</TableCell>
                            <TableCell align="center">Number of seats</TableCell>
                            <TableCell align="center">Body type</TableCell>
                            <TableCell align="center">Driving License category</TableCell>
                            <TableCell align="center">Description</TableCell>
                            <TableCell align="center">Daily rental price</TableCell>
                            <TableCell align="center">Status</TableCell>
                            <TableCell align="center">Visible on website</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row, index) => (
                            countCars++,
                                () => {
                            if(!sessionStorage.getItem("available")) {
                                sessionStorage.setItem("visibility", JSON.stringify(row.available));
                                console.log(sessionStorage.getItem("visibility"));
                            }
                        },
                            <TableRow
                                key={index}
                                sx={{'&:last-child td, &:last-child th': {border: 0}}}
                            >
                                <TableCell align="left" component="th" scope="row">
                                    {countCars}
                                </TableCell>
                                <TableCell align="center">{row.model}</TableCell>
                                <TableCell align="center">{row.brand}</TableCell>
                                <TableCell align="center">{row.city}, {row.address}</TableCell>
                                <TableCell align="center">{row.man_year}</TableCell>
                                <TableCell align="center">{row.seats}</TableCell>
                                <TableCell align="center">{row.body_type}</TableCell>
                                <TableCell align="center">{row.driving_license_category}</TableCell>
                                <TableCell align="center">{row.description}</TableCell>
                                <TableCell align="center">{row.daily_rental_price}</TableCell>
                                <TableCell align="center">{row.status}</TableCell>
                                <TableCell align="center">
                                    <GreenSwitch {...label} defaultChecked = {row.available === "true"} onChange={() => handleVisibility(row)} />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    );
}