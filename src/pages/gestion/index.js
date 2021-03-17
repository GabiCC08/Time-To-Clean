import React, {useEffect, useState} from "react";
import withAuth from "@/hocs/withAuth";
import {
    Grid,
    ListItem,
    ListItemAvatar,
    ListItemText,
    makeStyles,
} from "@material-ui/core";
import TableTrucks from "@/components/TableTrucks";
import TableNeighborhoods from "@/components/TableNeighborhoods";
import TableUsers from "@/components/TableUsers";
import TableComplaints from "@/components/TableComplaints";
import List from "@material-ui/core/List";
import Image from "next/image";
import {useAuth} from "@/lib/auth";
import DriverInfoProfile from "@/components/DriverInfoProfile";
import DriverInfoJob from "@/components/DriverInfoJob";
import Box from "@material-ui/core/Box";

const Management = () => {
    const {user} = useAuth();
    const [userData, setUserData] = useState("");
    const [showTrucks, setShowTrucks] = useState(false);
    const [showDrivers, setShowDrivers] = useState(true);
    const [showComplaints, setShowComplaints] = useState(false);
    const [showNeighborhoods, setShowNeighborhoods] = useState(false);

    const onVisibleTruck = () => {
        setShowTrucks(true);
        setShowDrivers(false);
        setShowComplaints(false);
        setShowNeighborhoods(false);
    };

    const onVisibleDriver = () => {
        setShowDrivers(true);
        setShowTrucks(false);
        setShowComplaints(false);
        setShowNeighborhoods(false);
    };

    const onVisibleComplaints = () => {
        setShowComplaints(true);
        setShowTrucks(false);
        setShowDrivers(false);
        setShowNeighborhoods(false);
    };

    const onVisibleNeighborhoods = () => {
        setShowNeighborhoods(true);
        setShowComplaints(false);
        setShowTrucks(false);
        setShowDrivers(false);
    };

    const useStyles = makeStyles((theme) => ({
        root: {
            width: "100%",
            maxWidth: 360,
            color: "#262626",
        },
    }));

    const styles = {
        container: {
            background: 'linear-gradient(0deg, rgba(168,304,216,1) 0%, rgba(96,149,176,1) 100%)',
            padding: "35px",
        },
    };
    const classes = useStyles();


    useEffect(() => {
        if (user.role) {
            // console.log("entra User directo", user);
            setUserData(user);
        } else {
            // console.log("entra user modficiado", user.data.user)
            setUserData(user.data.user);
        }
    }, []);


    return (
        <>
            {
                userData.role === "ROLE_SUPERADMIN" ? (
                    <Grid container>
                        <Grid xs={3}>
                            <List className={classes.root}>
                                <ListItem onClick={onVisibleDriver} button divider>
                                    <ListItemAvatar>
                                        <Image
                                            src="/volante-de-coche.png"
                                            alt=""
                                            width={30}
                                            height={30}
                                        />
                                    </ListItemAvatar>
                                    <ListItemText primary="Gestión de Conductores"/>
                                </ListItem>
                                <ListItem onClick={onVisibleTruck} button divider>
                                    <ListItemAvatar>
                                        <Image
                                            src="/delivery-truck.png"
                                            alt=""
                                            width={30}
                                            height={30}
                                        />
                                    </ListItemAvatar>
                                    <ListItemText primary="Gestión de Camiones"/>
                                </ListItem>
                                <ListItem onClick={onVisibleNeighborhoods} button divider>
                                    <ListItemAvatar>
                                        <Image
                                            src="/maps-and-flags.png"
                                            alt=""
                                            width={30}
                                            height={30}
                                        />
                                    </ListItemAvatar>
                                    <ListItemText primary="Gestión de Barrios y Frecuencias"/>
                                </ListItem>
                                <ListItem onClick={onVisibleComplaints} button divider>
                                    <ListItemAvatar>
                                        <Image
                                            src="/customer-satisfaction.png"
                                            alt=""
                                            width={30}
                                            height={30}
                                        />
                                    </ListItemAvatar>
                                    <ListItemText primary="Gestión de Quejas"/>
                                </ListItem>
                            </List>
                        </Grid>
                        <Grid xs={9} style={styles.container}>
                            {showTrucks ? (
                                <TableTrucks/>
                            ) : showDrivers ? (
                                <TableUsers/>
                            ) : showComplaints ? (
                                <TableComplaints/>
                            ) : showTrucks === false &&
                            showDrivers === false &&
                            showComplaints === false &&
                            showNeighborhoods ? (
                                <TableNeighborhoods/>
                            ) : (
                                "Cargando tablas"
                            )}
                        </Grid>
                    </Grid>
                ) : (
                    <Grid container>
                        <Grid xs={3} justify="center">
                            <List className={classes.root}>
                                <Grid
                                    container
                                    direction="row"
                                    justify="center"
                                    alignItems="center"
                                >
                                    <ListItemAvatar>
                                        <Image src="/driver.png" alt="" width={100} height={100}/>
                                    </ListItemAvatar>
                                </Grid>
                                <ListItem onClick={onVisibleDriver} button divider>
                                    <ListItemAvatar>
                                        <Image
                                            src="/volante-de-coche.png"
                                            alt=""
                                            width={30}
                                            height={30}
                                        />
                                    </ListItemAvatar>
                                    <ListItemText primary="DATOS DE PERFIL"/>
                                </ListItem>
                                <ListItem onClick={onVisibleTruck} button divider>
                                    <ListItemAvatar>
                                        <Image
                                            src="/delivery-truck.png"
                                            alt=""
                                            width={30}
                                            height={30}
                                        />
                                    </ListItemAvatar>
                                    <ListItemText primary="INFORMACIÓN DE TRABAJO"/>
                                </ListItem>
                            </List>
                        </Grid>
                        <Grid xs={9} style={styles.container}>
                            {showTrucks ? (
                                <DriverInfoJob user={userData}/>
                            ) : showDrivers ? (
                                <DriverInfoProfile user={userData}/>
                            ) : (
                                "Cargando Tablas"
                            )}
                        </Grid>
                    </Grid>
                )
            }
        </>
    );
};

export default withAuth(Management);
