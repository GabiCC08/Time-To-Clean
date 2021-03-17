import React from 'react';
import {Paper} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Image from "next/image";
import Typography from "@material-ui/core/Typography";

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

const AcercaDe = () => {
    return (
        <div style={styles.Container}>
            <Typography variant="h4" gutterBottom style={styles.Title}>¿Quiénes somos?</Typography>
            <Grid container direction="row" justify="space-around" alignItems="center">
                <Grid item xs={12} sm={3}>
                    <Image src="/arrow.png" width={100} height={150}/>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Paper style={styles.Paper} elevation={3}>
                        <Typography variant="body1" gutterBottom>
                            Time To Clean nace como una idea de proyecto de Desarrollo de Aplicaciones Web en el año 2020,
                            creada por Brenda, Carlos, Eddy y Gabriela, estudiantes de la Escuela de Formación de
                            Tecnólogos de la EPN.<br/> La información que proporciona esta plataforma se presenta de
                            manera intuitiva para que la gestión y comunicación entre personal del servicio y
                            ciudadanos sea fluida y actualizada.
                        </Typography>
                    </Paper>
                </Grid>
                <Grid item xs={12} sm={3}>
                    <Image src="/teamwork.png" width={250} height={250}/>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Image src="/eco.png" width={300} height={300}/>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Paper style={styles.Paper} elevation={3}>
                        <Typography variant="h4" gutterBottom>Misión</Typography>
                        <Typography variant="body1" gutterBottom>
                            Brindar y garantizar los servicios de aseo y
                            recolección de residuos sólidos ordinarios en Quito, mediante la aplicación de procesos
                            eficientes y controlados, contribuyendo a mejorar la cultura ambiental y la calidad de
                            vida de la ciudadanía.
                        </Typography>
                    </Paper>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Paper style={styles.Paper} elevation={3}>
                        <Typography variant="h4" gutterBottom>Visión</Typography>
                        <Typography variant="body1" gutterBottom>
                            Para el 2025, Time To Clean será reconocida por facilitar el control del servicio de aseo
                            en Quito, aplicando métodos innovadores que integren a cada ciudadano para reducir la
                            cantidad de residuos mediante la promoción de la responsabilidad individual y corporativa.
                        </Typography>
                    </Paper>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Image src="/team.png" width={350} height={350}/>
                </Grid>
            </Grid>
        </div>
    );
};
export default AcercaDe;