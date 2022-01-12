import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import facebookIcon from '../images/facebook.png';
import instagramIcon from '../images/instagram.png';
import twitterIcon from '../images/twitter.png';

function Copyright() {
    return (
        <React.Fragment>
            {'© '}
            <Link color="inherit" href="https://mui.com/">
                Car Sharing
            </Link>{' '}
            {new Date().getFullYear()}
        </React.Fragment>
    );
}

const iconStyle = {
    width: -48,
    height: -48,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    mr: 1,
    '&:hover': {
        bgcolor: 'dark',
    },
};

const LANGUAGES = [
    {
        code: 'en-US',
        name: 'English',
    },
    {
        code: 'ro',
        name: 'Romanian',
    },
];

export default function AppFooter() {
    return (
        <Typography
            component="footer"
            sx={{ display: 'flex', bgcolor: 'secondary.light' }}
        >
            <Container sx={{ my: 8, display: 'flex' }}>
                <Grid container spacing={5}>
                    <Grid item xs={6} sm={4} md={3}>
                        <Grid
                            container
                            direction="column"
                            justifyContent="flex-end"
                            spacing={2}
                            sx={{ height: 120 }}
                        >
                            <Grid item sx={{ display: 'flex' }}>
                                <Box component="a" href="#" sx={iconStyle}>
                                    <img
                                        src={facebookIcon}
                                        alt="Facebook"
                                    />
                                </Box>
                                <Box component="a" href="#" sx={iconStyle}
                                >
                                    <img
                                        src={instagramIcon}
                                        alt="Instagram"
                                    />
                                </Box>
                                <Box component="a" href="#" sx={iconStyle}
                                >
                                    <img
                                        src={twitterIcon}
                                        alt="Twitter"
                                    />
                                </Box>
                            </Grid>
                            <Grid item>
                                <Copyright />
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={6} sm={4} md={2}>
                        <Typography variant="h6" marked="left" gutterBottom>
                            Legal
                        </Typography>
                        <Box component="ul" sx={{ m: 0, listStyle: 'none', p: 0 }}>
                            <Box component="li" sx={{ py: 0.5 }}>
                                <Link href="#">Terms</Link>
                            </Box>
                            <Box component="li" sx={{ py: 0.5 }}>
                                <Link href="#">Privacy</Link>
                            </Box>
                        </Box>
                    </Grid>
                    <Grid item xs={6} sm={8} md={4}>
                        <Typography variant="h6" marked="left" gutterBottom>
                            Language
                        </Typography>
                        <TextField
                            select
                            size="medium"
                            variant="standard"
                            SelectProps={{
                                native: true,
                            }}
                            sx={{ mt: 1, width: 150 }}
                        >
                            {LANGUAGES.map((language) => (
                                <option value={language.code} key={language.code}>
                                    {language.name}
                                </option>
                            ))}
                        </TextField>
                    </Grid>
                    <Grid item>
                        <Typography variant="caption" sx={{ml: 2}}>
                            {'Icons made by '}
                            <Link href="https://www.freepik.com" rel="sponsored" title="Freepik">
                                Freepik
                            </Link>
                            {' from '}
                            <Link href="https://www.flaticon.com" rel="sponsored" title="Flaticon">
                                www.flaticon.com
                            </Link>
                        </Typography>
                    </Grid>
                </Grid>
            </Container>
        </Typography>
    );
}
