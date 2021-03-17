import React from 'react';
import {makeStyles, useTheme} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from "@material-ui/core/Grid";
import Routes from "../constants/routes";
import {ButtonBase, Icon, Paper} from "@material-ui/core";

const styles = {
    Container: {
        backgroundColor: "#262626",
        padding: '45px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        color: 'white'
    },
};

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        margin: '25px',
        maxWidth: 500,
    },
    image: {
        width: 250,
    },
    img: {
        margin: 'auto',
        display: 'block',
        maxWidth: '100%',
        maxHeight: '100%',
    },
}));


const OptionSection = () => {

    const classes = useStyles();
    const theme = useTheme();

    return (
        <div style={styles.Container}>
            <Typography component="h1" variant="h4">
                Servicios
            </Typography>
            <Grid container direction="row" justify="space-around" alignItems="center">
                <Paper className={classes.paper}>
                    <Grid container spacing={2}>
                        <Grid item>
                            <ButtonBase className={classes.image} href={Routes.NEIGHBORHOODS}>
                                <img className={classes.img} alt="" src="/horarios.jpg"/>
                            </ButtonBase>
                        </Grid>
                        <Grid item xs={12} sm container>
                            <Grid item xs container direction="column" spacing={2}>
                                <Grid item xs>
                                    <Typography gutterBottom variant="subtitle1">
                                        Consulta el horario de recolección de residuos de tu barrio
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        Sector y frecuencia
                                    </Typography>
                                </Grid>
                            </Grid>
                            <Grid item>
                                <ButtonBase href={Routes.NEIGHBORHOODS}>
                                    <Icon style={{fontSize: 30}}>add_circle</Icon>
                                </ButtonBase>
                            </Grid>
                        </Grid>
                    </Grid>
                </Paper>
                <Paper className={classes.paper}>
                    <Grid container spacing={2}>
                        <Grid item>
                            <ButtonBase className={classes.image} href={Routes.MANAGEMENT}>
                                <img className={classes.img} alt="" src="/gestion.jpg"/>
                            </ButtonBase>
                        </Grid>
                        <Grid item xs={12} sm container >
                            <Grid item xs container direction="column" spacing={2}>
                                <Grid item xs>
                                    <Typography gutterBottom variant="subtitle1">
                                        Sistema de gestión de recolectores
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        Solo para personal de la organización
                                    </Typography>
                                </Grid>
                            </Grid>
                            <Grid item>
                                <ButtonBase href={Routes.MANAGEMENT}>
                                    <Icon style={{fontSize: 30}}>add_circle</Icon>
                                </ButtonBase>
                            </Grid>
                        </Grid>
                    </Grid>
                </Paper>
            </Grid>
        </div>
    )
}
export default OptionSection;