import React, {useState} from "react";
import withAuth from "@/hocs/withAuth";
import useSWR from "swr";
import {fetcher} from "@/lib/utils";
import Loading from "@/components/Loading";
import {
    Button,
    Grid, Paper,
    TextField
} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import api from "@/lib/api";
import {useSnackbar} from "notistack";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from "yup";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    form: {
        width: "100%", // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 2, 2),
        backgroundColor: theme.palette.secondary.main,
    },
    button: {
        margin: theme.spacing(3, 2, 2),
        backgroundColor: theme.palette.cancel.main,
    },
}));

const styles = {
    Container: {
        padding: '40px',
        background: 'linear-gradient(0deg, rgba(168,254,216,1) 0%, rgba(96,149,176,1) 100%)',
        textAlign: 'center'
    },
    Paper: {
        backgroundColor: 'rgba(255,255,255)',
        margin: '10px',
        padding: '25px',
    },
    title: {
        textAlign: 'center',
        color: 'white',
        textShadow: '2px 2px #262626',
    }
};

const schema = yup.object().shape({
    name: yup
        .string()
        .required("Ingresa el nombre del conductor"),
    lastname: yup
        .string()
        .required("Ingresa el apellido del conductor"),
    email: yup
        .string()
        .email("Ingresa un correo válido")
        .required("Ingresa el correo electrónico del conductor"),
    birthdate: yup
        .date()
        .min ("1973-01-01","Ingresar una fecha válida")
        .max ("2002-01-01", "Ingresar una fecha válida")
        .required("Campo requerido"),
    cellphone: yup
        .string()
        .length(10,'Deben ser 10 dígitos')
        .required()
        .matches(/^[0-9]+$/, "Ingrese solo números, exactamente 10 dígitos")
        .max(10, 'Deben ser 10 dígitos')
});

const DriverInfoJob = ({user}) => {

    const classes = useStyles();
    const [checkValidate, setCheckValidate] = useState(true);
    const {data: userData, error, mutate} = useSWR(`/users/${user.id}`, fetcher);
    const {register, handleSubmit, errors} = useForm({
        resolver: yupResolver(schema),
    });


    const onSubmit = async (data) => {
        const userDataSend = {
            name: data.name,
            lastname: data.lastname,
            email: data.email,
            cellphone: data.cellphone,
        };
        try {
            const response = await api.put(`/users/${userData.id}`, userDataSend);
            handleClick("Se ha actualizado su información correctamente", "success");
            mutate();
            handleChangeCheck();
            return response;
        } catch (error) {
            if (error.response) {
                console.log(error.response.data.errors)
                return Promise.reject(error.response);
            } else if (error.request) {
                console.log(error.request);
            } else {
                console.log("Error", error.message);
            }
            console.log(error.config);
        }
    };

    const {enqueueSnackbar, closeSnackbar} = useSnackbar();
    const handleClick = (message, variant) => {
        enqueueSnackbar(message, {
            variant: variant,
            anchorOrigin: {
                vertical: 'top',
                horizontal: 'center',
            },
        });
    }

    const handleChangeCheck = () => {
        setCheckValidate(!checkValidate);
        mutate();
    }

    if (error) return <div>Algo ha ocurrido</div>;
    if (!userData) return <Loading/>;


    return (
        <>
            <div>
                <h1 style={styles.title}>Información del perfil</h1>

                <Grid container justify="center">

                    <Grid xs={12} sm={12} md={8} lg={8}>

                        <Paper style={styles.Paper} elevation={3}>
                            <form
                                className={classes.root}
                                noValidate
                                autoComplete="off"
                                onSubmit={handleSubmit(onSubmit)}
                            >
                                <Grid container spacing={1}>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            defaultValue={userData.name}
                                            id="name"
                                            name="name"
                                            label="Nombre"
                                            variant="outlined"
                                            required
                                            inputRef={register}
                                            color="secondary"
                                            margin="normal"
                                            error={!!errors.name}
                                            helperText={errors.name?.message}
                                            disabled={checkValidate ? true : false}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            defaultValue={userData.lastname}
                                            id="lastname"
                                            name="lastname"
                                            label="Apellido"
                                            variant="outlined"
                                            required
                                            inputRef={register}
                                            color="secondary"
                                            margin="normal"
                                            error={!!errors.lastname}
                                            helperText={errors.lastname?.message}
                                            disabled={checkValidate ? true : false}
                                        />
                                    </Grid>
                                    <Grid itm xs={12} sm={6}>
                                        <TextField
                                            defaultValue={userData.birthdate}
                                            id="birthdate"
                                            name="birthdate"
                                            label="Fecha de nacimiento"
                                            variant="outlined"
                                            required
                                            fullWidth
                                            inputRef={register}
                                            error={!!errors.birthdate}
                                            helperText={errors.birthdate?.message}
                                            margin="normal"
                                            color="secondary"
                                            type="date"
                                            disabled={checkValidate ? true : false}

                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}/>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            defaultValue={userData.cellphone}
                                            id="cellphone"
                                            label="Celular"
                                            name="cellphone"
                                            variant="outlined"
                                            margin="normal"
                                            required
                                            fullWidth
                                            color="secondary"
                                            inputRef={register}
                                            error={!!errors.cellphone}
                                            helperText={errors.cellphone?.message}
                                            disabled={checkValidate ? true : false}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            defaultValue={userData.email}
                                            id="email"
                                            name="email"
                                            label="Correo electrónico"
                                            variant="outlined"
                                            required
                                            inputRef={register}
                                            color="secondary"
                                            margin="normal"
                                            error={!!errors.email}
                                            helperText={errors.email?.message}
                                            disabled={checkValidate ? true : false}
                                        />
                                    </Grid>

                                </Grid>
                                <Grid
                                    container
                                    direction="row"
                                    justify="flex-end"
                                    alignItems="flex-end"
                                >
                                    {
                                        checkValidate ?
                                            <Button
                                                onClick={handleChangeCheck}
                                                variant="contained"
                                                color="primary"
                                                className={classes.submit}
                                            >
                                                Cambiar información
                                            </Button>
                                            :
                                            <div>
                                                <Button
                                                    type="submit"
                                                    variant="contained"
                                                    color="primary"
                                                    className={classes.submit}
                                                >
                                                    Actualizar datos
                                                </Button>
                                                <Button
                                                    onClick={handleChangeCheck}
                                                    variant="contained"
                                                    className={classes.button}>
                                                    Cancelar
                                                </Button>
                                            </div>
                                    }
                                </Grid>
                            </form>

                        </Paper>

                    </Grid>

                </Grid>
            </div>
        </>
    );
};

export default withAuth(DriverInfoJob);