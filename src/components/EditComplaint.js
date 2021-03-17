import React, {useEffect, useState} from "react";
import useSWR from "swr";
import {fetcher} from "@/lib/utils";
import Loading from "@/components/Loading";
import withAuth from "@/hocs/withAuth";
import {makeStyles} from "@material-ui/core/styles";
import {
    Button,
    Divider,
    FormControlLabel,
    Icon,
    Paper,
    Radio,
    RadioGroup,
    TextField
} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import {useForm} from "react-hook-form";
import api from "@/lib/api";
import {useSnackbar} from "notistack";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    control: {
        padding: theme.spacing(2),
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
    paper: {
        backgroundColor: 'rgba(112,125,136,0.10)',
        padding: '10px',
        marginBottom: '15px'
    }
};

const EditComplaint = (props) => {
    const classes = useStyles();
    const {register, handleSubmit} = useForm();
    const {data, error} = useSWR(`/complaints/${props.id}`, fetcher);
    if (error) return <div>No se pudo cargar queja</div>;
    if (!data) return (<Loading/>);
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

    const onSubmit = async (complaintData) => {
        // console.log("Datos a actualizar:", complaintData)
        try {
            const response = await api.put(`/complaints/${props.id}`, complaintData);
            console.log("Response:", response);
            props.onHandleCloseModal();
            handleClick("Cambios guardados.", "success");
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
    }

    return (
        <>
            <Grid
                container
                direction="row"
                justify="space-between"
                alignItems="center"
            >
                <div/>
                <h2>Detalle y edición</h2>
                <Icon color="secondary" onClick={props.onHandleCloseModal}>cancel</Icon>
            </Grid>
            <Grid
                container
                direction="row"
                justify="space-between"
                alignItems="center"
            >
                <h2>Queja n°{data.id}</h2>
                <i>Recibida: {(data.created_at).substr(0, 10)}</i>
            </Grid>
            <Paper elevation={0} style={styles.paper}>
                <Typography variant="body1" gutterBottom><b>Remitente:</b> {data.username}  &lt;<i>{data.email}</i>&gt;
                </Typography>
                <Divider/>
                <Typography variant="body1" gutterBottom>{data.complaint}</Typography>
            </Paper>
            <form className={classes.root}
                  noValidate
                  autoComplete="off"
                  onSubmit={handleSubmit(onSubmit)}
            >
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Typography variant="body1" gutterBottom>Estado de la queja:</Typography>
                        <RadioGroup row aria-label="position" name="state" defaultValue={data.state}>
                            <FormControlLabel inputRef={register} value="Atendida" control={<Radio color="secondary"/>}
                                              label="Atendida"/>
                            <FormControlLabel inputRef={register} value="En proceso"
                                              control={<Radio color="secondary"/>} label="En proceso"/>
                            <FormControlLabel inputRef={register} value="Pendiente" control={<Radio color="secondary"/>}
                                              label="Pendiente"/>
                        </RadioGroup>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="body1" gutterBottom>Observación:</Typography>
                        <TextField
                            id="outlined-multiline-static"
                            multiline
                            rows={4}
                            defaultValue={data.observation}
                            variant="outlined"
                            name="observation"
                            inputRef={register}
                            color="secondary"
                        />
                    </Grid>
                    <Grid
                        container
                        direction="row"
                        justify="space-evenly"
                        alignItems="flex-end"
                    >
                        <Button
                            type="submit"
                            variant="contained"
                            color="secondary"
                            className={classes.submit}
                            onClick={props.onHandleCloseModal}
                        >
                            Guardar Cambios
                        </Button>
                        <Button
                            variant="contained"
                            className={classes.button}
                            onClick={props.onHandleCloseModal}
                        >
                            Cancelar
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </>
    );
};

export default withAuth(EditComplaint);