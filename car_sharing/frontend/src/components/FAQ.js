import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Container from "@mui/material/Container";
import {useTranslation} from "react-i18next";

export default function SimpleAccordion() {
  const {t, i18n} = useTranslation();

  return (
      <Container component="section" sx={{  mt: 2, mb: 4, mr: 20, ml: 20}}      position={"relative"}
                 style={{left:"10%"}}>
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
              {t("got any questions")}
            </Typography>
          <Typography variant="subtitle1" sx={{ my: 3 }}>
            {t("we are here to help")}
          </Typography>
          <Accordion  style={{width: "400px"}} sx={{mb:1}}>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
            >
              <Typography sx={{fontWeight:500}}>{t("question1")}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                {t("answer1")}
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion style={{width: "400px"}} sx={{mb:1}}>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2a-content"
                id="panel2a-header"
            >
              <Typography sx={{fontWeight:500}}>{t("question2")}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                {t("answer2")}
              </Typography>
            </AccordionDetails>
          </Accordion >
          <Accordion style={{width: "400px"}} sx={{mb:1}}>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2a-content"
                id="panel2a-header"
            >
              <Typography sx={{fontWeight:500}}>{t("question3")}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                {t("answer3")}
              </Typography>
            </AccordionDetails>
          </Accordion >
          <Accordion style={{width: "400px"}} sx={{mb:1}}>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2a-content"
                id="panel2a-header"
            >
              <Typography sx={{fontWeight:500}}>{t("question4")}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                {t("answer4")}
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion style={{width: "400px"}} sx={{mb:1}}>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2a-content"
                id="panel2a-header"
            >
              <Typography sx={{fontWeight:500}}>{t("question5")}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                {t("answer5")}
              </Typography>
            </AccordionDetails>
          </Accordion>

          <Accordion style={{width: "400px"}} sx={{mb:1}}>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2a-content"
                id="panel2a-header"
            >
              <Typography sx={{fontWeight:500}}>{t("question6")}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                {t("answer6")}
              </Typography>
            </AccordionDetails>
          </Accordion>

          <Accordion style={{width: "400px"}} sx={{mb:1}}>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2a-content"
                id="panel2a-header"
            >
              <Typography sx={{fontWeight:500}}>{t("question7")}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                {t("answer7")}
              </Typography>
            </AccordionDetails>
          </Accordion>
        </Container>
      </Container>
  );
}