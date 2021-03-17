import React from "react";
import useSWR from "swr";
import clsx from "clsx";
import { fetcher } from "@/lib/utils";
import Loading from "@/components/Loading";
import withAuth from "@/hocs/withAuth";
import { makeStyles } from "@material-ui/core/styles";
import {
  FormControl,
  Button,
  Box,
  Grid,
  RadioGroup,
  FormControlLabel,
  Radio,
  Icon,
  Paper,
  Divider,
} from "@material-ui/core";
import api from "@/lib/api";
import translateMessage from "../constants/messages";
import { useForm } from "react-hook-form";
import { useSnackbar } from "notistack";

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

const styles = {
  paper: {
    backgroundColor: "rgba(112,125,136,0.10)",
    padding: "10px",
    marginBottom: "15px",
  },
};

function StyledRadio(props) {
  const classes = useStyles();
  return (
    <Radio
      className={classes.root}
      disableRipple
      color="default"
      checkedIcon={<span className={clsx(classes.icon, classes.checkedIcon)} />}
      icon={<span className={classes.icon} />}
      {...props}
    />
  );
}

const EditTruck = (props) => {
  const classes = useStyles();

  const { register, handleSubmit } = useForm();
  const { data: truckData, error: error1, mutate: mutate1 } = useSWR(
    `/trucks/${props.id}`,
    fetcher
  );
  const { data: neighborhoodData, error: error2, mutate: mutate2 } = useSWR(
    `/trucks/${props.id}/neighborhoods`,
    fetcher
  );

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

  if (error1) return <div>No se pudo cargar el camión</div>;
  if (!truckData) return <Loading />;

  const onSubmit = async (data) => {
    data.working === "Disponible"
      ? ""
      : neighborhoodData.data.map((neigborhood) =>
          handleDeleteNeighborhood(neigborhood)
        );

    const truckData1 = {
      license_plate: truckData.license_plate,
      type: data.type,
      working: data.working === "Disponible" ? true : false,
      user_id:
        truckData.user === null
          ? null
          : data.working === "Disponible"
          ? truckData.user.id
          : null,
    };
    try {
      const response = await api.put(`/trucks/${truckData.id}`, truckData1);
      handleClick("Se ha editado los datos del camión con éxito.", "success");
      mutate1();
      mutate2();
      props.onCancel();
      return response;
    } catch (error) {
      if (error.response) {
        handleClick("No se pudo editar el camión.", "error");
        props.onCancel();
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

  const handleDeleteNeighborhood = async (data) => {
    const neighborhoodData = {
      days: data.days,
      end_time: data.end_time,
      id: data.id,
      link: data.link,
      name: data.name,
      start_time: data.start_time,
      truck_id: null,
    };

    try {
      const response = await api.put(
        `/neighborhoods/${data.id}`,
        neighborhoodData
      );

      return response;
    } catch (error) {
      if (error.response) {
        alert(translateMessage(error.response.data.error));
        props.onCancel();
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
      <Grid
        container
        direction="row"
        justify="space-between"
        alignItems="center"
      >
        <div />
        <h2>Detalle y edición del camión</h2>
        <Icon color="secondary" onClick={props.onCancel}>
          cancel
        </Icon>
      </Grid>
      <Paper elevation={0} style={styles.paper}>
        <Grid
          container
          spacing={2}
          justify="space-evenly"
          alignItems="flex-start"
        >
          <Grid item xs={12} sm={6}>
            <h3>Placa: {truckData.license_plate}</h3>
            <h3>
              Conductor:{" "}
              {truckData.user === null ? "Sin conductor" : truckData.user.name}
            </h3>
          </Grid>
          {truckData.working ? (
            <Grid item xs={12} sm={6}>
              <h3>Barrios del Camión</h3>
              <ul>
                {neighborhoodData
                  ? neighborhoodData.data.map((neighborhood) => (
                      <li>{neighborhood.name}</li>
                    ))
                  : "Sin barrios"}
              </ul>
            </Grid>
          ) : (
            ""
          )}
        </Grid>
      </Paper>
      <form
        className={classes.root}
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Grid container>
          <Grid xs={12} spacing={2}>
            <h3>Estado del camión</h3>
            <FormControl component="fieldset">
              <RadioGroup
                defaultValue={
                  truckData.working ? "Disponible" : "No Disponible"
                }
                aria-label="gender"
                name="working"
              >
                <Box display="flex" justifyContent="center" m={1} p={1}>
                  <FormControlLabel
                    value="Disponible"
                    control={<StyledRadio />}
                    label="Disponible"
                    inputRef={register}
                  />
                  <FormControlLabel
                    value="No Disponible"
                    control={<StyledRadio />}
                    label="No Disponible"
                    inputRef={register}
                  />
                </Box>
              </RadioGroup>
            </FormControl>
          </Grid>
          <Grid xs={12} spacing={2}>
            <h3>Tipo de camión</h3>

            <FormControl component="fieldset">
              <RadioGroup
                defaultValue={
                  truckData.type === "Automático" ? "Automático" : "Manual"
                }
                aria-label="gender"
                name="type"
              >
                <Box display="flex" justifyContent="center" m={1} p={1}>
                  <FormControlLabel
                    value="Automático"
                    control={<StyledRadio />}
                    label="Automático"
                    inputRef={register}
                  />
                  <FormControlLabel
                    value="Manual"
                    control={<StyledRadio />}
                    label="Manual"
                    inputRef={register}
                  />
                </Box>
              </RadioGroup>
            </FormControl>
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
              color="primary"
              className={classes.submit}
            >
              Guardar cambios
            </Button>
            <Button
              onClick={props.onCancel}
              variant="contained"
              className={classes.button}
            >
              Cancelar
            </Button>
          </Grid>
        </Grid>
      </form>
    </>
  );
};

export default withAuth(EditTruck);
