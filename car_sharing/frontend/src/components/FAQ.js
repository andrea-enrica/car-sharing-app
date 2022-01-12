import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Container from "@mui/material/Container";

export default function SimpleAccordion() {
  return (
      <Container component="section" sx={{  mt: 2, mb: 4, mr: 20, ml: 20}}>
        <Container
            component="section"
            sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', my: 9,
              border: '4px solid #c8d8e4',
              borderRadius: 0,
              height: 'auto',
              py: 2,
              px: 5}}
        >
            <Typography variant="h4" component="span" sx={{fontFamily: 'B', borderBottom: '10px solid #c8d8e4'}}>
              Got any questions?
            </Typography>
          <Typography variant="subtitle1" sx={{ my: 3 }}>
            We are here to help. Check this out or get in touch!
          </Typography>
          <Accordion  style={{width: "400px"}} sx={{mb:1}}>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
            >
              <Typography sx={{fontWeight:500}}>What do I need to book a car on our site?</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                To book a car, you must create an account, be 18 years old or older , have a valid driver’s license, and get approved to drive on our site. When you’re booking your first trip, you’ll go through a quick approval process by entering your driver’s license and some other information. In most cases, you’ll get approved immediately, and you’ll be set for all future road trips, day trips, and business trips!
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion style={{width: "400px"}} sx={{mb:1}}>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2a-content"
                id="panel2a-header"
            >
              <Typography sx={{fontWeight:500}}>Can other people drive a car that I booked??</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                Yes, multiple guests can drive the car you book  as long as they are all approved to drive. The primary driver (whoever booked the car) can add additional drivers with no fees or additional charges. Only the primary driver can request to add drivers; We host cannot do it for you. We encourage you to request to add additional drivers before your trip starts, though guests in Romania can request to add a driver while a trip is in progress.

                To speed up the process, have your additional driver create an account account and get approved to drive before you request to add them.
              </Typography>
            </AccordionDetails>
          </Accordion >
          <Accordion style={{width: "400px"}} sx={{mb:1}}>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2a-content"
                id="panel2a-header"
            >
              <Typography sx={{fontWeight:500}}>What is the cancellation policy?</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                You can cancel and get a full refund up to 24 hours before your trip starts. If you book a trip with less than 24 hours’ notice, you have one hour after booking to cancel free of charge. If you cancel after the free cancellation period ends, you will be charged a small cancellation fee.

                In the rare event a host cancels, you’ll be notified immediately so you can book another car, or we’ll help you find one. Your refund can be temporarily held to expedite rebooking, or the funds can be returned to your bank account — your choice.
              </Typography>
            </AccordionDetails>
          </Accordion >
          <Accordion style={{width: "400px"}} sx={{mb:1}}>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2a-content"
                id="panel2a-header"
            >
              <Typography sx={{fontWeight:500}}>What happens if I have an accident?</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                If there’s an emergency or an issue with the car, call our emergency roadside assistance provider, available 24/7. We’ll make sure you’re safe, then help you get back on your way.
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion style={{width: "400px"}} sx={{mb:1}}>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2a-content"
                id="panel2a-header"
            >
              <Typography sx={{fontWeight:500}}>Can I get my car delivered to me?</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                Yes, many hosts offer delivery to travel hubs like airports, train stations, and hotels, or to custom delivery locations. There are cars available here at convenient locations near hundreds of airports. Skip the rental counter and have your car delivered for pickup and return at your hotel or vacation rental, or nearby location, to save time and hassle on your weekend getaway or family vacation. Some hosts offer free delivery, while others set their own delivery fee.
              </Typography>
            </AccordionDetails>
          </Accordion>

          <Accordion style={{width: "400px"}} sx={{mb:1}}>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2a-content"
                id="panel2a-header"
            >
              <Typography sx={{fontWeight:500}}>How do I get discounts when booking a car?</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                Many hosts offer discounted prices for weekly and monthly trips, as well as “early bird” discounts for trips booked a week or more in advance. Get the best deals and lowest rates possible on everything from cars to SUVs by booking longer trips, at least a week in advance. Commercial Hosts may also offer weekly car rental and monthly car rental deals.
              </Typography>
            </AccordionDetails>
          </Accordion>

          <Accordion style={{width: "400px"}} sx={{mb:1}}>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2a-content"
                id="panel2a-header"
            >
              <Typography sx={{fontWeight:500}}>What are the cleaning and safety policies ?</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                Under the enhanced cleaning policy, hosts are required to clean and disinfect their vehicles thoroughly before every trip, so you can feel safe and comfortable behind the wheel. Our hosts have access to training materials on enhanced safety measures and cleaning practices to help prevent the spread of COVID-19 or other viruses.
              </Typography>
            </AccordionDetails>
          </Accordion>
        </Container>
      </Container>
  );
}