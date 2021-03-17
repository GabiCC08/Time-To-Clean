import React from "react";
import withAuth from "@/hocs/withAuth";
import Typography from "@material-ui/core/Typography";
import {
     Divider,
    Grid,
    List, ListItem, ListItemAvatar, ListItemText, makeStyles,
    Paper,
    Table,
    TableBody, TableCell,
    TableContainer,
    TableHead,
    TableRow
} from "@material-ui/core";
import useSWR from "swr";
import {fetcher} from "@/lib/utils";
import Loading from "@/components/Loading";
import PlaceIcon from "@material-ui/icons/Place";
import CalendarTodayIcon from "@material-ui/icons/CalendarToday";
import DriverInfoNotFound from "@/components/DriverInfoNotFound";
import {withStyles} from "@material-ui/core/styles";
import Link from "@material-ui/core/Link";

const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
    }
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
    root: {
        "&:nth-of-type(odd)": {
            backgroundColor: theme.palette.action.hover,
        },
    },
}))(TableRow);

const styles = {
    Container: {
        padding: '40px',
        background: 'linear-gradient(0deg, rgba(168,254,216,1) 0%, rgba(96,149,176,1) 100%)',
        textAlign: 'center'
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
    }
};

const useStyles = makeStyles((theme) => ({
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
    }
}));

const DriverInfoJob = ({user}) => {

    const classes = useStyles();
    const {data: truckUser, error} = useSWR(`/users/${user.id}/truck`, fetcher);
    const {data: neighborhoodData, error: error1} = useSWR(`/neighborhoods/all`, fetcher);
    if (error) {
        return <div><DriverInfoNotFound/></div>;
    }
    if (!truckUser) return <Loading/>;

    return (
        <>
            <div>
                <h1 style={styles.title}> Bienvenido {user.name} </h1>

                <Grid container>
                    <Grid item xs={12} md={6} sm={12} lg={6}>
                        <Paper style={styles.Paper} elevation={3}>
                            <h2> Información del camión </h2>
                            {
                                truckUser ?
                                    <List className={classes.root2}>
                                        <ListItem alignItems="flex-start">
                                            <ListItemAvatar>
                                                <PlaceIcon/>
                                            </ListItemAvatar>
                                            <ListItemText
                                                primary="Placa"
                                                secondary={
                                                    <React.Fragment>
                                                        <Typography
                                                            component="span"
                                                            variant="body2"
                                                            className={classes.inline}
                                                            color="textPrimary"
                                                        >
                                                            {truckUser.license_plate}
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
                                                primary="Tipo de camión"
                                                secondary={
                                                    <React.Fragment>
                                                        <Typography
                                                            component="span"
                                                            variant="body2"
                                                            className={classes.inline}
                                                            color="textPrimary"
                                                        >
                                                            {truckUser.type}
                                                        </Typography>
                                                    </React.Fragment>
                                                }
                                            />
                                        </ListItem>
                                    </List>
                                    :
                                    <div>
                                        No tienen camión asignado
                                    </div>
                            }
                        </Paper>
                    </Grid>

                    <Grid item xs={12} md={6} sm={12} lg={6}>
                        <Paper style={styles.Paper} elevation={3} >
                               <h2> Información de rutas </h2>
                            {
                                neighborhoodData ?
                                    <TableContainer component={Paper}>
                                        <Table aria-label="customized table">
                                            <TableHead>
                                                <TableRow>
                                                    <StyledTableCell align="center">Barrio</StyledTableCell>
                                                    <StyledTableCell align="center">horario</StyledTableCell>
                                                    <StyledTableCell align="center">Dias asignados</StyledTableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {neighborhoodData.data.map((neighborhood) => (
                                                    <>
                                                        {
                                                            truckUser.id === neighborhood.truck ?
                                                                <StyledTableRow key={neighborhood.id}>
                                                                    <StyledTableCell align="center">
                                                                        <Link
                                                                            href={neighborhood.link}
                                                                            color="secondary"
                                                                            target={"_blank"}>
                                                                            {neighborhood.name}
                                                                        </Link>
                                                                    </StyledTableCell>
                                                                    <StyledTableCell align="center">
                                                                        {neighborhood.start_time} - {neighborhood.end_time}
                                                                    </StyledTableCell>
                                                                    <StyledTableCell align="center">
                                                                        {neighborhood.days}
                                                                    </StyledTableCell>
                                                                </StyledTableRow>
                                                                : ""
                                                        }
                                                    </>

                                                ))}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                    :
                                    <div> No se ha podido cargar la información de los barrios</div>
                            }
                        </Paper>
                    </Grid>
                </Grid>

            </div>
        </>
    );
};

export default withAuth(DriverInfoJob);