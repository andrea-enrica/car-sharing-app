import Container from "@mui/material/Container";
import React from 'react';
import {useTranslation} from "react-i18next";

export default function ReservationComplete() {
    const {t} = useTranslation();
    return(

        <Container component="section" sx={{
            marginBottom: '35%',
            marginTop:'15%',
            marginLeft:'30%',
            marginRight:'10%',
            fontSize: 15,
            color: "secondary"}}>
            <h2>{t("Your reservation was registered successfully!")}</h2>
            <h6>{t("email confirmation")}</h6>
        </Container>
    )
}
