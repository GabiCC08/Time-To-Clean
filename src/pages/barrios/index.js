import React, {useState} from 'react';
import useSWR from "swr";
import {fetcher} from "@/lib/utils";
import Loading from "../../components/Loading";
import {
    Box, Divider,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    makeStyles, Paper,
    Typography
} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Link from "next/link";
import PlaceIcon from '@material-ui/icons/Place';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import WatchLaterIcon from '@material-ui/icons/WatchLater';
import Routes from "../../constants/routes";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";

const styles = {
    container: {
        background: 'linear-gradient(0deg, rgba(168,304,216,1) 0%, rgba(96,149,176,1) 100%)',
        padding: "35px",
    },
    Paper: {
        backgroundColor: 'rgba(255,255,255)',
        margin: '10px',
        padding: '35px',
    },
    title:{
        textAlign:'center',
        color:'white',
        textShadow: '2px 2px #262626',
    },
    responsive : {
        width: "100%",
        height: "auto",
    }
};

const useStyles = makeStyles((theme) => ({
    button: {
        margin: theme.spacing(3, 2, 2),
        backgroundColor: theme.palette.cancel.main,
    },
    button2: {
        margin: theme.spacing(3, 2, 2),
        backgroundColor: theme.palette.secondary.main,
    },
    root: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    margin: {
        margin: theme.spacing(1),
    },
    root2: {
        width: '100%',
        maxWidth: '36ch',
        backgroundColor: theme.palette.background.paper,
    },
    inline: {
        display: 'inline',
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    }
}));


const Neighborhoods = () => {

    const classes = useStyles();
    const {data, error} = useSWR(`/neighborhoods/all`, fetcher);
    const [name, setName] = useState({
        id: "",
        neighborhood: ""
    });
    const [neighborhoodID, setNeighborhoodID] = useState([{
        id: "",
        name: "",
        start_time: "",
        end_time: "",
        days: "",
        link: ""
    }]);

    if (error) return <div>No se pudo cargar la informacion de los usuarios</div>;
    if (!data) return <Loading/>;

    const handleChange = event => {
        const number = event.target.value;
        setName({
            ...name,
            id: number ? number : "",
            neighborhood: number ? data.data[number].name : "",
        });
        number ?
            setNeighborhoodID({
                ...neighborhoodID,
                id: data.data[number].id,
                name: data.data[number].name,
                start_time: data.data[number].start_time,
                end_time: data.data[number].end_time,
                days: data.data[number].days,
                link: data.data[number].link
            })
            : setNeighborhoodID("");
    };


    return (
        <>
            <div>
                <Grid style={styles.container} justify={"center"}>
                    <div>
                        <Box display="flex" justifyContent="center" m={1} p={1}>
                            <h1 style={styles.title} >Encuentra la información sobre tu sector de manera fácil y rápida</h1>
                        </Box>
                    </div>
                    <Grid container justify="center">
                        <Paper style={styles.Paper} elevation={3}>
                            <Grid item xs={12}  justify={"center"}>
                                <p>Seleccione el barrio que desee consultar sus horarios</p>
                                <TextField
                                    id="outlined-select-currency-native"
                                    select
                                    label="Barrio"
                                    color="secondary"
                                    margin="normal"
                                    value={name.id}
                                    onChange={handleChange}
                                    SelectProps={{
                                        native: true,
                                    }}
                                    helperText="Por favor selecciona un barrio de la lista"
                                >
                                    <option aria-label="None" value=""/>
                                    {
                                        data.data.map((neighborhood, index) => {
                                                return (
                                                    <option value={index}>
                                                        {neighborhood.name}
                                                    </option>
                                                )
                                            }
                                        )
                                    }
                                </TextField>
                            </Grid>
                            <Grid item xs={12} justify={"center"}>
                                {
                                    name.neighborhood !== "" ?
                                        <div>
                                            <List className={classes.root2}>
                                                <ListItem alignItems="flex-start">
                                                    <ListItemAvatar>
                                                        <PlaceIcon/>
                                                    </ListItemAvatar>
                                                    <ListItemText
                                                        primary="Barrio"
                                                        secondary={
                                                            <React.Fragment>
                                                                <Typography
                                                                    component="span"
                                                                    variant="body2"
                                                                    className={classes.inline}
                                                                    color="textPrimary"
                                                                >
                                                                    {neighborhoodID.name}
                                                                </Typography>
                                                            </React.Fragment>
                                                        }
                                                    />
                                                </ListItem>
                                                <Divider variant="inset" component="li"/>
                                                <ListItem alignItems="flex-start">
                                                    <ListItemAvatar>
                                                        <WatchLaterIcon/>
                                                    </ListItemAvatar>
                                                    <ListItemText
                                                        primary="Horario de recoleción"
                                                        secondary={
                                                            <React.Fragment>
                                                                <Typography
                                                                    component="span"
                                                                    variant="body2"
                                                                    className={classes.inline}
                                                                    color="textPrimary"
                                                                >
                                                                    {neighborhoodID.start_time} - {neighborhoodID.end_time}
                                                                </Typography>
                                                            </React.Fragment>
                                                        }
                                                    />
                                                </ListItem>
                                                <Divider variant="inset" component="li"/>
                                                <ListItem alignItems="flex-start">
                                                    <ListItemAvatar>
                                                        <CalendarTodayIcon/>
                                                    </ListItemAvatar>
                                                    <ListItemText
                                                        primary="Días de recoleción"
                                                        secondary={
                                                            <React.Fragment>
                                                                <Typography
                                                                    component="span"
                                                                    variant="body2"
                                                                    className={classes.inline}
                                                                    color="textPrimary"
                                                                >
                                                                    {neighborhoodID.days}
                                                                </Typography>
                                                            </React.Fragment>
                                                        }
                                                    />
                                                </ListItem>
                                            </List>
                                            <Box display="flex" justifyContent="center" m={1} p={1}>
                                                <Button className={classes.button2} href={neighborhoodID.link}
                                                        target={"_blank"}>
                                                    Ir a Google Maps
                                                </Button>
                                            </Box>

                                        </div>
                                        :
                                        <div>
                                            <Box display="flex" justifyContent="center" m={1} p={1}>
                                                <img style={styles.responsive} src="recoleccion.jpg" alt="recolector"/>
                                            </Box>
                                        </div>
                                }
                            </Grid>
                        </Paper>
                    </Grid>

                    <Grid>
                        <Box display="flex" justifyContent="center" m={1} p={1}>
                            <Link href={Routes.HOME}>
                                <Button variant="contained" color="secondary" className={classes.button2}>
                                    Menú Principal
                                </Button>
                            </Link>
                        </Box>
                    </Grid>
                </Grid>
            </div>
        </>

    );
};

export default Neighborhoods;
