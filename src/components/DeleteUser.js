import React from "react";
import withAuth from "@/hocs/withAuth";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Box, Grid } from "@material-ui/core";
import api from "@/lib/api";
import { useForm } from "react-hook-form";
import {useSnackbar} from "notistack";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        "&:hover": {
            backgroundColor: "transparent",
        },
    },
    paper: {
        height: 140,
        width: 100,
    },
    root2: {
        minWidth: 275,
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


const DeleteUser = (props) => {
    const classes = useStyles();
    const { handleSubmit} = useForm();
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    const handleClick = (message, variant) => {
        enqueueSnackbar(message, {
            variant: variant,
            anchorOrigin: {
                vertical: 'top',
                horizontal: 'center',
            },
        });
    }

    const onSubmit = async () => {
        try {
            const response = await api.delete(`/users/${props.id}`);
            handleClick("Se ha eliminado con éxito el usuario", "success");
            props.onCancel();
            return response;
        } catch (error) {
            if (error.response) {
                console.log(error.response.data);
                return Promise.reject(error.response);
            } else if (error.request) {
                console.log(error.request);
            } else {
                console.log("Error", error.message);
            }
            console.log(error.config);
        }
    };

    return (
        <>
            <div>
                <h3>¿Está seguro que desea eliminar este usuario?</h3>
            </div>

            <form
                className={classes.root}
                noValidate
                autoComplete="off"
                onSubmit={handleSubmit(onSubmit)}
            >
                <Grid container>
                    <Box display="flex" justifyContent="center" m={1} p={1}>
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                        >
                            Sí
                        </Button>
                        <Button
                            onClick={props.onCancel}
                            variant="contained"
                            className={classes.button}
                        >
                            Cancelar
                        </Button>
                    </Box>
                </Grid>
            </form>
        </>
    );
};

export default withAuth(DeleteUser);