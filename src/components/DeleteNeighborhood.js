import React from "react";
import withAuth from "@/hocs/withAuth";
import {makeStyles} from "@material-ui/core/styles";
import {Button, Box, Grid} from "@material-ui/core";
import api from "@/lib/api";
import {useForm} from "react-hook-form";
import {useSnackbar} from "notistack";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        "&:hover": {
            backgroundColor: "transparent",
        },
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

const DeleteNeighborhood = (props) => {
    const classes = useStyles();
    const {handleSubmit, errors} = useForm();

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

    const Error = (errorCode) => {
        if (errorCode) {
            if (errorCode.message.includes("SQLSTATE[23000]: Integrity constraint violation:")) {
                handleClick("Se han registrado quejas en este barrio, no se puede eliminar", "warning");
            }
        } else {
            handleClick(errorCode, "error");
        }
    }

    const onSubmit = async () => {
        try {
            const response = await api.delete(`/neighborhoods/${props.id}`);
            handleClick("Se ha eliminado el barrio con éxito", "success");
            props.onHandleCloseModal();
            return response;
        } catch (error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.log(error.response.data);
                Error(error.response.data);
                props.onHandleCloseModal();
                return Promise.reject(error.response);
                // return error.response;
            } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                // http.ClientRequest in node.js
                console.log(error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.log("Error", error.message);
            }
            console.log(error.config);
        }
    };

    return (
        <>
            <Typography component={'span'}>
                <Box display="flex" justifyContent="center" m={1} p={1}>
                    <h3>¿Está seguro que desea eliminar este barrio?</h3>
                </Box>
            </Typography>

            <form
                className={classes.root}
                noValidate
                autoComplete="off"
                onSubmit={handleSubmit(onSubmit)}
            >
                <Grid
                    container
                    direction="row"
                    justify="space-evenly"
                    alignItems="flex-end"
                >
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        className={classes.submit}>
                        Sí
                    </Button>
                    <Button
                        onClick={props.onHandleCloseModal}
                        variant="contained"
                        className={classes.button}>
                        Cancelar
                    </Button>
                </Grid>
            </form>
        </>
    );
};

export default withAuth(DeleteNeighborhood);
