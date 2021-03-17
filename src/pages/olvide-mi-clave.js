import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import {Button, Paper, TextField} from "@material-ui/core";
import * as yup from "yup";
import { makeStyles } from "@material-ui/core/styles";
import { useAuth } from "@/lib/auth";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useSnackbar } from "notistack";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";

const schema = yup.object().shape({
    email: yup
        .string()
        .email("Ingresa un correo válido")
        .required("Ingresa tu correo electrónico"),
});

const useStyles = makeStyles((theme) => ({
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
        backgroundColor: theme.palette.secondary.main,
    },
}));
const styles = {
    Container: {
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center center",
        backgroundSize: "cover",
        backgroundImage: `url(${"/fondo-login.png"})`,
        padding:'80px'
    },
    paper: {
        padding: '35px',
    },
};
const SendPasswordResetEmailPage = () => {
    const { sendPasswordResetEmail } = useAuth();
    const { enqueueSnackbar } = useSnackbar();
    const handleClick = (message, variant) => {
        enqueueSnackbar(message, {
            variant: variant,
            anchorOrigin: {
                vertical: 'top',
                horizontal: 'center',
            },
        });
    }
    const classes = useStyles();
    const [loading, setLoading] = useState(false);
    const { register, handleSubmit, errors } = useForm({
        resolver: yupResolver(schema),
    });

    const onSendEmail = async ({ email }) => {
        setLoading(true);
        try {
            await sendPasswordResetEmail(email);
            setLoading(false);
            handleClick("Te hemos enviado un correo con instrucciones para restablecer tu contraseña.", "success");
        } catch (error) {
            setLoading(false);
            if (error.response) {
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
                enqueueSnackbar(error.response.data.status, { variant: "error" });

                return error.response;
            } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                // http.ClientRequest in node.js
                console.log(error.request);
                enqueueSnackbar("Ocurrió un error al realizar la petición.", {
                    variant: "error",
                });
            } else {
                // Something happened in setting up the request that triggered an Error
                console.log("Error", error.message);
                enqueueSnackbar("Ocurrió un error desconocido :(", {
                    variant: "error",
                });
            }
            console.log(error.config);
        }
    };

    return (
        <>
            <div style={styles.Container}>
                <Container component="main" maxWidth="xs">
                    <CssBaseline/>
                    <Paper elevation={3} style={styles.paper}>
                        <Grid item xs={false} sm={4} md={7} className={classes.image}/>
                            <Typography component="h1" variant="h5" align="center">
                                <strong>Recuperar contraseña</strong>
                            </Typography><br/>
                        <form className={classes.form}
                            noValidate
                            autoComplete="off"
                            onSubmit={handleSubmit(onSendEmail)}
                        >
                            <Grid container spacing={2} justify="center" alignItems="center">
                                <Grid xs={12} item>
                                    <TextField
                                        id="email"
                                        name="email"
                                        type="email"
                                        label="Correo electrónico"
                                        inputRef={register}
                                        color="secondary"
                                        autoComplete="email"
                                        error={!!errors.email}
                                        helperText={errors.email?.message}
                                    />
                                </Grid>

                                <Grid xs={12} item className={classes.buttonWrapper}>
                                    <Button
                                        type="submit"
                                        fullWidth
                                        variant="contained"
                                        color="primary"
                                        className={classes.submit}
                                        disabled={loading}
                                    >
                                        Enviar
                                    </Button>
                                </Grid>
                            </Grid>
                        </form>
                    </Paper>
                </Container>
            </div>
        </>
    );
};

export default SendPasswordResetEmailPage;