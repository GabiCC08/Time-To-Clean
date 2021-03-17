import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import {Button, Paper, TextField} from "@material-ui/core";
import * as yup from "yup";
import { makeStyles } from "@material-ui/core/styles";
import { useAuth } from "@/lib/auth";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/router";
import translateMessage from '../../constants/messages';
import { useSnackbar } from "notistack";
import Routes from "../../constants/routes";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";

const schema = yup.object().shape({
    email: yup
        .string()
        .email("Ingresa un correo válido")
        .required("Ingresa tu correo electrónico"),
    password: yup
        .string()
        .required("Ingresa la contraseña")
        .min(6, "La contraseña debe tener al menos 6 caracteres"),
    password_confirmation: yup
        .string()
        .oneOf([yup.ref("password"), null], "Las contraseñas no coinciden")
        .required("Campo requerido")
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
        padding:'40px'
    },
    paper: {
        padding: '35px',
    },
};

const ResetPasswordPage = () => {
    const router = useRouter();
    const { token } = router.query;
    const { confirmPasswordReset } = useAuth();
    const classes = useStyles();
    const [loading, setLoading] = useState(false);
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
    const { register, handleSubmit, errors } = useForm({
        resolver: yupResolver(schema),
    });

    const onResetPassword = async ({
                                       email,
                                       password,
                                       password_confirmation,
                                   }) => {
        try {
            setLoading(true);
            await confirmPasswordReset(email, password, password_confirmation, token);
            setLoading(false);
            handleClick("Tu contraseña se ha restablecido correctamente, puedes iniciar sesión", "success");
            router.push(Routes.LOGIN);
        } catch (error) {
            setLoading(false);
            if (error.response) {
                enqueueSnackbar(translateMessage(error.response.data.status), { variant: "error",anchorOrigin: {
                        vertical: 'top',
                        horizontal: 'center',
                    } });
                return error.response;
            } else if (error.request) {
                enqueueSnackbar("Ocurrió un error al realizar la petición.", {
                    variant: "error", anchorOrigin: {
                        vertical: 'top',
                        horizontal: 'center',
                    }
                });
            } else {
                enqueueSnackbar("Ocurrió un error desconocido :(", {
                    variant: "error",anchorOrigin: {
                        vertical: 'top',
                        horizontal: 'center',
                    }
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
                            <strong>Ingrese su nueva contraseña</strong>
                        </Typography>
                        <form className={classes.form} noValidate onSubmit={handleSubmit(onResetPassword)}>
                            <Grid container spacing={2} justify="center" alignItems="center">
                                <Grid xs={12} item>
                                    <TextField
                                        id="email"
                                        name="email"
                                        type="email"
                                        label="Correo electrónico"
                                        color="secondary"
                                        inputRef={register}
                                        autoComplete="email"
                                        error={!!errors.email}
                                        helperText={errors.email?.message}
                                    />
                                </Grid>
                            </Grid>
                            <Grid container spacing={2} justify="center" alignItems="center">
                                <Grid xs={12} item>
                                    <TextField
                                        id="password"
                                        name="password"
                                        type="password"
                                        label="Contraseña"
                                        color="secondary"
                                        inputRef={register}
                                        error={!!errors.password}
                                        helperText={errors.password?.message}
                                    />
                                </Grid>
                            </Grid>
                            <Grid container spacing={2} justify="center" alignItems="center">
                                <Grid xs={12} item>
                                    <TextField
                                        id="password_confirmation"
                                        name="password_confirmation"
                                        color="secondary"
                                        type="password"
                                        label="Confirmar contraseña"
                                        inputRef={register}
                                        error={!!errors.password_confirmation}
                                        helperText={errors.password_confirmation?.message}
                                    />
                                </Grid>
                            </Grid>
                            <Grid container spacing={2} justify="center" alignItems="center">
                                <Grid xs={12} item className={classes.buttonWrapper}>
                                    <Button
                                        name="submit"
                                        variant="contained"
                                        type="submit"
                                        color="primary"
                                        disabled={loading}
                                        fullWidth
                                        className={classes.submit}
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

export default ResetPasswordPage;