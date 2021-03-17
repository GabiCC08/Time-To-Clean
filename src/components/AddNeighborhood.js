import React, { useEffect, useState } from "react";
import withAuth from "@/hocs/withAuth";
import { makeStyles } from "@material-ui/core/styles";
import {
  Button,
  Grid,
  Checkbox,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  FormLabel,
  TextField,
  FormControl,
} from "@material-ui/core";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import api from "@/lib/api";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { useSnackbar } from "notistack";
import useSWR from "swr";
import { fetcher } from "@/lib/utils";
import Loading from "@/components/Loading";

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
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
}));

const moment = require("moment");

const schema = yup.object().shape({
  start_time: yup.string().required("Seleccione la hora de inicio"),
  end_time: yup
    .string()
    .required("Seleccione la hora de fin")
    .test(
      "is-greater",
      "Debe ser posterior a la hora de Inicio",
      function (value) {
        const { start_time } = this.parent;
        return moment(value, "HH:mm").isSameOrAfter(
          moment(start_time, "HH:mm")
        );
      }
    ),
  name: yup.string().required("Ingrese el nombre del barrio"),
  link: yup
    .string()
    .url("Ingrese una dirección URL válida")
    .required("Ingrese la dirección URL de google Maps del barrio"),
});

const AddNeighborhood = (props) => {
  const classes = useStyles();
  const { data: trucksData, error } = useSWR(`/trucks/filter/working`, fetcher);
  const [truck, setTruck] = useState("");
  const [checkValidate, setCheckValidate] = useState(true);
  const [state, setState] = useState({
    Lunes: false,
    Martes: false,
    Miércoles: false,
    Jueves: false,
    Viernes: false,
    Sábado: false,
    Domingo: false,
  });
  const { register, handleSubmit, control, errors } = useForm({
    resolver: yupResolver(schema),
  });
  const { Lunes, Martes, Miércoles, Jueves, Viernes, Sábado, Domingo } = state;
  const errorCheck =
    [Lunes, Martes, Miércoles, Jueves, Viernes, Sábado, Domingo].filter(
      (v) => v
    ).length < 1;

  useEffect(() => {
    let check = false;
    for (let $i in state) {
      if (state[$i] === true) {
        check = true;
        break;
      }
    }
    if (check) {
      setCheckValidate(true);
    } else {
      setCheckValidate(false);
    }
  }, [state]);

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  const handleChangeSelect = (event) => {
    setTruck(event.target.value);
  };

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const handleClick = (message, variant) => {
    enqueueSnackbar(message, {
      variant: variant,
      anchorOrigin: {
        vertical: "top",
        horizontal: "center",
      },
    });
  };

  const Error = (errorCode) => {
    if (errorCode) {
      if (errorCode.name && errorCode.name[0] === "validation.unique") {
        handleClick("Ya existe un barrio registrado con este nombre", "error");
      }
    } else {
      handleClick(errorCode, "error");
    }
  };

  const onSubmit = async (data) => {
    let day = "";
    for (let $i in state) {
      if (state[$i] === true) {
        day += $i + " ";
      }
    }
    let id = "";
    if (truck === "") {
      id = null;
    } else {
      id = truck;
    }
    data.start_time += ":00";
    data.end_time += ":00";
    const neighborhoodData = {
      ...data,
      days: day,
      truck_id: id,
    };
    try {
      const response = await api.post("/neighborhoods", neighborhoodData);
      handleClick("Se ha registrado con éxito el barrio", "success");
      props.onHandleCloseModal();
      return response;
    } catch (error) {
      if (error.response) {
        console.log("Error", error.response.data);
        Error(error.response.data.errors);
        return Promise.reject(error.response);
      } else if (error.request) {
        console.log(error.request);
      } else {
        console.log("Error", error.message);
      }
      console.log(error.config);
    }
  };

  if (error) return <div>algo ha ocurrido</div>;
  if (!trucksData) return <Loading />;

  return (
    <>
      <div>
        <div>
          <h2>Agrega un nuevo barrio </h2>
        </div>

        <form
          className={classes.root}
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Grid container>
            <Grid xs={12}>
              <TextField
                id="name"
                name="name"
                label="Nombre del barrio"
                variant="outlined"
                required
                inputRef={register}
                color="secondary"
                margin="normal"
                error={!!errors.name}
                helperText={errors.name?.message}
              />
              <TextField
                id="neighborhoodlink"
                name="link"
                label="Enlace de google maps"
                variant="outlined"
                required
                inputRef={register}
                color="secondary"
                margin="normal"
                error={!!errors.link}
                helperText={errors.link?.message}
              />
            </Grid>

            <FormControl
              required
              error={errorCheck}
              component="fieldset"
              className={classes.formControl}
            >
              <FormLabel component="legend">
                Escoja los días ha asignar
              </FormLabel>
              <FormGroup>
                <Box flexDirection="row-reverse" m={1} p={1}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={Lunes}
                        onChange={handleChange}
                        name="Lunes"
                      />
                    }
                    label="Lunes"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={Martes}
                        onChange={handleChange}
                        name="Martes"
                      />
                    }
                    label="Martes"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={Miércoles}
                        onChange={handleChange}
                        name="Miércoles"
                      />
                    }
                    label="Miércoles"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={Jueves}
                        onChange={handleChange}
                        name="Jueves"
                      />
                    }
                    label="Jueves"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={Viernes}
                        onChange={handleChange}
                        name="Viernes"
                      />
                    }
                    label="Viernes"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={Sábado}
                        onChange={handleChange}
                        name="Sábado"
                      />
                    }
                    label="Sábado"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={Domingo}
                        onChange={handleChange}
                        name="Domingo"
                      />
                    }
                    label="Domingo"
                  />
                </Box>
              </FormGroup>

              <FormHelperText>Seleccione por lo menos un día</FormHelperText>
              <Box display="flex" justifyContent="center" m={1} p={1}>
                <TextField
                  id="start_time"
                  name="start_time"
                  label="Hora de inicio"
                  type="time"
                  defaultValue="07:30"
                  required
                  inputRef={register}
                  color="secondary"
                  margin="normal"
                  error={!!errors.start_time}
                  helperText={errors.start_time?.message}
                  className={classes.textField}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  inputProps={{
                    step: 300, // 5 min
                  }}
                />

                <TextField
                  id="emd_time"
                  name="end_time"
                  label="Hora de fin"
                  type="time"
                  defaultValue="15:00"
                  required
                  inputRef={register}
                  color="secondary"
                  margin="normal"
                  error={!!errors.end_time}
                  helperText={errors.end_time?.message}
                  className={classes.textField}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  inputProps={{
                    step: 300, // 5 min
                  }}
                />
              </Box>
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <TextField
              id="outlined-select-currency-native"
              select
              label="Camión"
              color="secondary"
              margin="normal"
              value={truck}
              onChange={handleChangeSelect}
              SelectProps={{
                native: true,
              }}
              helperText="Seleccione un camión ha asignar o puede editarlo despues"
            >
              <option aria-label="None" value="" />
              {trucksData ? (
                trucksData.data.map((truck) => (
                  <option value={truck.id} key={truck.id}>
                    {truck.license_plate}
                  </option>
                ))
              ) : (
                <Typography> No hay camiones disponibles </Typography>
              )}
            </TextField>
          </Grid>

          <Box display="flex" justifyContent="center" m={1} p={1}>
            {checkValidate ? (
              <Button
                type="submit"
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Crear
              </Button>
            ) : (
              <Button
                variant="contained"
                color="primary"
                disabled
                className={classes.submit}
              >
                Crear
              </Button>
            )}

            <Button
              onClick={props.onHandleCloseModal}
              variant="contained"
              className={classes.button}
            >
              Cancelar
            </Button>
          </Box>
        </form>
      </div>
    </>
  );
};

export default withAuth(AddNeighborhood);
