import React  from "react";
import withAuth from "@/hocs/withAuth";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Image from "next/image";
import {Paper} from "@material-ui/core";

const styles = {
    Container: {
        padding: '40px',
        background: 'linear-gradient(0deg, rgba(168,254,216,1) 0%, rgba(96,149,176,1) 100%)',
        textAlign: 'center'
    },
    Paper: {
        backgroundColor: 'rgba(255,255,255)',
        margin: '10px',
        padding: '35px',
    },
    Title: {
        fontWeight: 'bold',
        color: 'white',
        textShadow: '2px 2px #262626',
    }
};

const DriverInfoNotFound = () => {


    return (
        <>
                <div style={styles.Container}>
                    <Typography variant="h4" gutterBottom style={styles.Title}>Ha ocurrido un error</Typography>
                    <Grid container direction="row"  alignItems="center">
                        <Grid item xs={12} sm={3}>
                            <Image src="/arrow.png" width={100} height={150}/>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Paper style={styles.Paper} elevation={3}>
                                <Typography variant="body1" gutterBottom>
                                    Es posible que el administrador de Time To Clean, todavía no le haya
                                    asignado un camión y por ende no tiene ruta asignada.
                                </Typography>
                            </Paper>
                        </Grid>
                        <Grid item xs={12} sm={3}>
                            <Image src="/teamwork.png" width={250} height={250}/>
                        </Grid>
                    </Grid>
                </div>
        </>
    );
};

export default withAuth(DriverInfoNotFound);