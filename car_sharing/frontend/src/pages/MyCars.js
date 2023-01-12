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
import {alpha, styled, Switch} from "@material-ui/core";

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
    },[id_user]);

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