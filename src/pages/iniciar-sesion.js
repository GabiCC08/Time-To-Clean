import {useAuth} from '../lib/auth';
import React from "react";
import withoutAuth from "../hocs/withoutAuth";
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from "yup";
import {useForm} from "react-hook-form";
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {Paper} from "@material-ui/core";
import {useSnackbar} from "notistack";
import translateMessage from "../constants/messages";

const schema = yup.object().shape({
    email: yup.string().email("Ingrese un email válido").required("El campo email es obligatorio"),
    password: yup.string().required("Ingrese su clave").min(6, "La clave debe tener al menos 6 caracteres"),
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
        padding:'60px'
    },
    paper: {
        padding: '35px',
    },
};

const login = () => {
    const {login} = useAuth();
    const {register, handleSubmit, errors} = useForm({resolver: yupResolver(schema)});
    const classes = useStyles();
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    const onSubmit = async (data) => {
        try {
            const userData = await login(data);
        } catch (error) {
            if (error.response) {
                enqueueSnackbar(translateMessage(error.response.data.error), { variant: "error",  anchorOrigin: {
                        vertical: 'top',
                        horizontal: 'center',
                    },});
            } else if (error.request) {
                console.log(error.request);
            } else {
                console.log('Error', error.message);
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
                            <strong>Inicie Sesión</strong>
                            <div>Solo personal autorizado</div>
                        </Typography>
                        <form className={classes.form} noValidate onSubmit={handleSubmit(onSubmit)}>
                            <TextField
                                id="email"
                                name="email"
                                label="Correo electrónico"
                                inputRef={register}
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                autoComplete="email"
                                color="secondary"
                                autoFocus
                                error={!!errors.email}
                                helperText={errors.email?.message}
                            />
                            <TextField
                                variant="outlined"
                                margin="normal"
                                inputRef={register}
                                required
                                fullWidth
                                name="password"
                                label="Contraseña"
                                color="secondary"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                error={!!errors.password}
                                helperText={errors.password?.message}
                            />
                            <Button onSubmit={handleSubmit(onSubmit)}
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    className={classes.submit}
                            >
                                Ingresar
                            </Button>
                            <Grid container>
                                <Grid item>
                                    <Link href="/olvide-mi-clave" color="dark">
                                        <strong>¿Olvidaste tu contraseña?</strong>
                                    </Link>
                                </Grid>
                            </Grid>
                        </form>
                    </Paper>
                </Container>
            </div>
        </>
    );
};
export default withoutAuth(login);