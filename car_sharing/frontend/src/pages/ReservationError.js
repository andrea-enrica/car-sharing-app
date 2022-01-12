import Container from "@mui/material/Container";
import React from 'react';

export default function ReservationError()
{
    return(
        <Container component='section' id = "reservation" maxWidth="xs" sx={{marginBottom: '100px', marginTop: '100px'}}>
            <h2>
                Something went wrong!
            </h2>
            <h6>
                Please try again.
            </h6>
        </Container>
    )
}
