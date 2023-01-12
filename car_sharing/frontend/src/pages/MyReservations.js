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
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle';
import CarService from "../services/CarService";
import IconButton from "@mui/material/IconButton";
import ReservationService from "../services/ReservationService";

export default function MyReservations() {
    const id_user = JSON.parse(sessionStorage.getItem('item'))['id'];
    const [reservationDetails,setReservationDetails] = useState([]);
    const [carDetails,setCarDetails] = useState([]);
    let countReservations=0;

    async function getReservationDetails(id_user) {
        await ReservationService.getAllReservationsByUserId(id_user).then(res => {
            setReservationDetails(res.data);
        });
    }

    useEffect(() => {
        getReservationDetails(id_user).then();
    }, [])

    useEffect(() => {
        async function getCarDetails(idCar) {
            await CarService.cardSendIdRequest(idCar).then(response => {
                setCarDetails(carDetails => [...carDetails, response.data]);
            });
        }

        if (reservationDetails.length !== 0) {
            reservationDetails.map(reservation => {
                return getCarDetails(reservation.idCar);
            })
        }
    }, [reservationDetails])

    const handleClick = (row) => {
        if(row.status === "booked") {
            row.status = "returned";
            ReservationService.addReservationRequest(row).then(() => {
                getReservationDetails(id_user).then();
                carDetails.map((car) => {
                    if(car.idCar === row.idCar ) {
                        car.status = "returned";
                        CarService.addCarRequest(car).then(r => r);
                    }
                })
            });
        }
    }
    let color;

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
                            <TableCell align="center">Brand</TableCell>
                            <TableCell align="center">Model</TableCell>
                            <TableCell align="center">Address</TableCell>
                            <TableCell align="center">Start Date</TableCell>
                            <TableCell align="center">End Date</TableCell>
                            <TableCell align="center">Total price</TableCell>
                            <TableCell align="center">Status</TableCell>
                            <TableCell align="center">Return car</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {reservationDetails.map((row, index) => (
                                countReservations++,
                                <TableRow
                                    key={index}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell align="left" component="th" scope="row">{countReservations}</TableCell>
                                    {carDetails.map((car, indexCar) => {
                                        if(index === indexCar) {
                                            return (<TableCell align="center">{car.brand}</TableCell>)
                                        }
                                    })}
                                    {carDetails.map((car, indexCar) => {
                                        if(index === indexCar) {
                                            return (<TableCell align="center">{car.model}</TableCell>)
                                        }
                                    })}
                                    {carDetails.map((car, indexCar) => {
                                        if(index === indexCar) {
                                            return (<TableCell align="center">{car.city}, {car.address}</TableCell>)
                                        }
                                    })}
                                    <TableCell align="center">{row.start_date}</TableCell>
                                    <TableCell align="center">{row.end_date}</TableCell>
                                    <TableCell align="center">{row.total_reservation_price}</TableCell>
                                    <TableCell align="center" id="car-status">{row.status}</TableCell>
                                    <TableCell align="center" onClick={() => handleClick(row)} {...row.status === 'returned' ? color = '#e53935': color = '#96c267'}>{<IconButton style={{color: color}} onClick={() => {}}  >
                                        <ChangeCircleIcon/>
                                    </IconButton>}</TableCell>
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    );
}