import React, {useState} from "react";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from "yup";
import Button from "@material-ui/core/Button";
import {makeStyles} from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Image from "next/image";
import api from "@/lib/api";
import useSWR from "swr";
import {fetcher} from "@/lib/utils";
import Loading from "@/components/Loading";
import Box from "@material-ui/core/Box";
import {useSnackbar} from "notistack";

const schema = yup.object().shape({
    username: yup.string().required("Este campo es obligatorio"),
    email: yup.string().email("Ingrese un correo válido").required("Este campo es obligatorio"),
    complaint: yup.string().required("Este campo es obligatorio")
});

const useStyles = makeStyles((theme) => ({

    container: {
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center center",
        backgroundSize: "cover",
        backgroundAttachment: "fixed",
        backgroundImage: `url(${"/fondo1.png"})`,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '35px'
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
        backgroundColor: theme.palette.secondary.main,
    },
}));

const styles = {
    box: {
        backgroundColor: 'rgba(255,255,255,0.8)',
        borderRadius: '5px'
    }
}

const FormSection = () => {

    const {register, handleSubmit, errors} = useForm({
        resolver: yupResolver(schema),
    });
    const classes = useStyles();

    const [name, setName] = useState({
        id: "",
        neighborhood: ""
    });
    const [id, setId] = useState("");
    const {data, error} = useSWR(`/neighborhoods/all`, fetcher);
    if (error) return <div>No se pudieron cargar los barrios</div>;
    if (!data) return <Loading/>;

    const {enqueueSnackbar, closeSnackbar} = useSnackbar();
    const handleClick = (message, variant) => {
        enqueueSnackbar(message, {
            variant: variant,
            anchorOrigin: {
                vertical: "top",
                horizontal: "center",
            },
        });
    };

    console.log("Lista de barrios", data)

    const onSubmit = async (data) => {
        const complaintData = {...data, neighborhood_id: name.id}
        // console.log("Formulario:", complaintData);
        try {
            const response = await api.post(`/complaints`, complaintData);
            console.log("Response:", response);
            handleClick("Enviado", "success");
            return response;
        } catch (error) {
            if (error.response) {
                console.log("error", error.response.data.errors);
                Error(error.response.data.errors)
                return Promise.reject(error.response);
            } else if (error.request) {
                console.log(error.request);
            } else {
                console.log("Error", error.message);
            }
            console.log(error.config);
        }
    };

    const handleChange = (event) => {
        const neighborhood_id = event.target.value;
        let neighborhood_name=""
        data.data.map((neighborhood) => {
            neighborhood.id===neighborhood_id ? neighborhood_name=neighborhood.name: ""
        })

        setName({
            id: neighborhood_id,
            neighborhood: neighborhood_name
        });
    };

    return (
        <>
            <div className={classes.container}>
                <Typography component="h1" variant="h4">
                    Buzón de quejas
                </Typography><br/>
                <Grid container direction="row" justify="space-around" alignItems="center">
                    <Box m={5}>
                        <Image src="/mailbox.png" alt="" width={250} height={250}/>
                    </Box>
                    <div>
                        <Typography variant="body1"> Si tienes alguna queja o recomendación acerca del servicio de
                            recolección de residuos solidos en Quito, ayúdanos llenando el siguiente formulario.
                        </Typography>
                        <form className={classes.form} noValidate onSubmit={handleSubmit(onSubmit)}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <div style={styles.box}>
                                        <TextField
                                            className={classes.margin}
                                            name="username"
                                            variant="outlined"
                                            required
                                            inputRef={register}
                                            fullWidth
                                            id="name"
                                            label="Nombre"
                                            color="secondary"
                                            error={!!errors.username}
                                            helperText={errors.username?.message}
                                        />
                                    </div>
                                </Grid>
                                <Grid item xs={12}>
                                    <div style={styles.box}>
                                        <TextField
                                            className={classes.margin}
                                            variant="outlined"
                                            required
                                            fullWidth
                                            id="email"
                                            inputRef={register}
                                            label="Correo Electrónico"
                                            name="email"
                                            autoComplete="email"
                                            color="secondary"
                                            error={!!errors.email}
                                            helperText={errors.email?.message}
                                        />
                                    </div>
                                </Grid>
                                <Grid item xs={12}>
                                    <div style={styles.box}>
                                        <TextField
                                            id="outlined-select-currency-native"
                                            select
                                            label="Barrio"
                                            required
                                            value={name.id}
                                            onChange={handleChange}
                                            SelectProps={{
                                                native: true,
                                            }}
                                            variant="outlined"
                                            color="secondary"
                                            helperText="Por favor, selecciona un barrio"
                                        >
                                            <option aria-label="None" value=""/>
                                            {
                                                data.data.map((neighborhood, index) => {
                                                        return (
                                                            <option key={index} value={neighborhood.id}>
                                                                {neighborhood.name}
                                                            </option>
                                                        )
                                                    }
                                                )
                                            }
                                        </TextField>
                                    </div>
                                </Grid>
                                <Grid item xs={12}>
                                    <div style={styles.box}>
                                        <TextField
                                            variant="outlined"
                                            multiline
                                            rows={5}
                                            required
                                            fullWidth
                                            id="complaint"
                                            inputRef={register}
                                            label="Queja"
                                            name="complaint"
                                            color="secondary"
                                            error={!!errors.complaint}
                                            helperText={errors.complaint?.message}
                                        />
                                    </div>
                                </Grid>
                            </Grid>
                            <Button onSubmit={handleSubmit(onSubmit)}
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    className={classes.submit}
                            >
                                Enviar
                            </Button>
                        </form>
                    </div>
                </Grid>
            </div>
        </>
    );
}

export default FormSection;

