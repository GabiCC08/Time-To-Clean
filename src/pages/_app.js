import "@/styles/globals.css";
import {AuthProvider} from "@/lib/auth";
import Navigation from "@/components/Navigation";
import Head from "next/head";
import {CssBaseline, Grid, ThemeProvider} from "@material-ui/core";
import theme from "@/styles/theme";
import {Router} from "next/router";
import NProgress from "nprogress";
import Footer from "@/components/Footer";
import React from "react";
import {SnackbarProvider} from 'notistack';

Router.events.on("routeChangeStart", (url) => {
    console.log(`Loading: ${url}`);
    NProgress.start();
});
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

function App({Component, pageProps}) {
    return (
        <>
            <SnackbarProvider>
                <Head>
                    <title>Time to Clean</title>
                    <meta
                        name="viewport"
                        content="minimum-scale=1, initial-scale=1, width=device-width"
                    />
                    {/* Import CSS for nprogress */}
                    <link rel="stylesheet" type="text/css" href="/nprogress.css"/>
                    <link rel="icon" type="image/png" href="/trash-truck.png" sizes="16x16"/>
                </Head>
                <AuthProvider>
                    <ThemeProvider theme={theme}>
                        <CssBaseline/>
                        <Navigation/>
                        {/*<Container maxWidth="lg">*/}
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <Component {...pageProps} />
                            </Grid>
                        </Grid>
                        {/*</Container>*/}
                        <Footer/>
                    </ThemeProvider>
                </AuthProvider>
            </SnackbarProvider>
        </>
    );
}

export default App;