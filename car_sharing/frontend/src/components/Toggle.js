import * as React from 'react';
import Stack from '@mui/material/Stack';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import EventBusyIcon from '@mui/icons-material/EventBusy';
import {useState} from "react";
import CarService from "../services/CarService";

export default function ToggleButtonNotEmpty({carToUpdate}) {
    const [availability, setAvailability] = useState("");

    const handleDevices = (event, newDevices) => {
        if (newDevices[0] === "available") {
            setAvailability(newDevices);

            carToUpdate.available = 'true';
            CarService.addCarRequest(carToUpdate).then(r => console.log(r));

        } else if(newDevices[0] === "unavailable") {
            setAvailability(newDevices);

            carToUpdate.available = 'false';
            CarService.addCarRequest(carToUpdate).then(r => console.log(r));
        }
    };

    return (
        <Stack direction="row" spacing={4}>
            <ToggleButtonGroup
                value={availability}
                onChange={handleDevices}
                aria-label="device"
            >
                <ToggleButton color="success" value="available" aria-label="Available">
                    <EventAvailableIcon color="success" />
                </ToggleButton>
                <ToggleButton color="error" value="unavailable" aria-label="Unavailable">
                    <EventBusyIcon color="error"/>
                </ToggleButton>
            </ToggleButtonGroup>
        </Stack>
    );
}