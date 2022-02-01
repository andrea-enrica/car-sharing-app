import Container from "@mui/material/Container";
import React from 'react';

export default function ReservationError() {
    return(
        <Container component="section" id = "reservation" sx={{marginBottom: '20%', marginTop: '15%', marginLeft:'30%', overflow:"hidden", padding:'0px', margin:'20%'}}>
            <h2>Something went wrong!</h2>
            <h6>Please try again.</h6>
        </Container>
    )
}
