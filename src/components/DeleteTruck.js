import React from "react";
import withAuth from "@/hocs/withAuth";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Box, Grid } from "@material-ui/core";
import api from "@/lib/api";
import { useForm } from "react-hook-form";
import { useSnackbar } from "notistack";
import Typography from "@material-ui/core/Typography";

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
  control: {
    padding: theme.spacing(2),
  },
  root2: {
    minWidth: 275,
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
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
  icon: {
    borderRadius: "50%",
    width: 16,
    height: 16,
    boxShadow:
      "inset 0 0 0 1px rgba(16,22,26,.2), inset 0 -1px 0 rgba(16,22,26,.1)",
    backgroundColor: "#f5f8fa",
    backgroundImage:
      "linear-gradient(180deg,hsla(0,0%,100%,.8),hsla(0,0%,100%,0))",
    "$root.Mui-focusVisible &": {
      outline: "2px auto rgba(19,124,189,.6)",
      outlineOffset: 2,
    },
    "input:hover ~ &": {
      backgroundColor: "#ebf1f5",
    },
    "input:disabled ~ &": {
      boxShadow: "none",
      background: "rgba(206,217,224,.5)",
    },
  },
  checkedIcon: {
    backgroundColor: "#137cbd",
    backgroundImage:
      "linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))",
    "&:before": {
      display: "flex",
      width: 16,
      height: 16,
      backgroundImage: "radial-gradient(#fff,#fff 28%,transparent 32%)",
      content: '""',
    },
    "input:hover ~ &": {
      backgroundColor: "#106ba3",
    },
  },
}));

const DeleteTruck = (props) => {
  const classes = useStyles();
  const { handleSubmit } = useForm();
  const { enqueueSnackbar } = useSnackbar();

  const handleClick = (message, variant) => {
    enqueueSnackbar(message, {
      variant: variant,
      anchorOrigin: {
        vertical: "top",
        horizontal: "center",
      },
    });
  };

  const onSubmit = async () => {
    try {
      const response = await api.delete(`/trucks/${props.id}`);
      handleClick("Se ha eliminado el camión con éxito", "success");
      props.onCancel();
      return response;
    } catch (error) {
      if (error.response) {
        handleClick("No se pudo eliminar el camión", "error");
        props.onHandleCloseModal();
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
      <Typography component={"span"}>
        <Box display="flex" justifyContent="center" m={1} p={1}>
          <h3>¿Está seguro que desea eliminar este camión?</h3>
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
        </Grid>
      </form>
    </>
  );
};

export default withAuth(DeleteTruck);
