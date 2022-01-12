import Container from "@mui/material/Container";
import React from 'react';

export default function ReservationComplete()
{
    return(
        <Container component='section' id = "reservation" maxWidth="xs" sx={{marginBottom: '100px', marginTop: '100px'}}>
            <h2>
                Your reservation was registered successfully!
            </h2>
            <h6>
                You will received an confirmation email.
            </h6>
        </Container>
    )
}
