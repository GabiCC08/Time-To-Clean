import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Link from 'next/link';
import Grid from "@material-ui/core/Grid";
import Image from "next/image";
import Routes from "../constants/routes";
import {Box, ButtonBase, Icon, Link as MuiLink} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    footer: {
        backgroundColor: "#262626",
        color: "#FFFFFF",
        alignItems: "center",
        padding: "40px",
    },
    logo: {
        padding: 8,
        [theme.breakpoints.up("sm")]: {
            display: "block",
        },
        "& a img": {
            maxHeight: 55,
        },
    },
}))

export default function Footer() {
    const classes = useStyles();
    return (
        <div className={classes.grow}>
            <footer className={classes.footer}>
                <Container>
                    <Box className={classes.logo} align="center">
                        <Link href={Routes.HOME}>
                            <MuiLink>
                                <Image src="/logo-claro.png" alt="" width={250} height={100}/>
                            </MuiLink>
                        </Link>
                    </Box>
                    <Grid container
                          spacing={4}
                          justify="space-around"
                          alignItems="center"
                    >
                        <Box margin={2}>
                            <ButtonBase href={Routes.ABOUT}>
                                <Typography align="center">Acerca de</Typography>
                            </ButtonBase>
                        </Box>
                        <Box margin={2}>
                            <ButtonBase href={Routes.PRIVACY}>
                                <Typography align="center">Privacidad</Typography>
                            </ButtonBase>
                        </Box>
                        <Grid
                            container
                            justify="center"
                            alignItems="center"
                        >
                            <Box margin={2}>
                                <ButtonBase href="https://www.facebook.com/ESFOT-EPN-UIO-163137570522102/" target="_blank">
                                    <Icon style={{fontSize: 40}}>facebook</Icon>
                                </ButtonBase>
                            </Box>
                            <Box margin={2}>
                                <ButtonBase href="https://mail.google.com" target="_blank">
                                    <Icon style={{fontSize: 40}}>email</Icon>
                                </ButtonBase>
                            </Box>
                        </Grid>
                        <Grid
                            container
                            justify="center"
                            alignItems="center"
                        >
                            <ButtonBase href={Routes.HOME}>
                                <Typography variant="body2" align="center">
                                    Copyright © TimeToClean {new Date().getFullYear()}
                                </Typography>
                            </ButtonBase>
                        </Grid>
                    </Grid>

                </Container>
            </footer>
        </div>
    );
}