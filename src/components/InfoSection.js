import React from 'react';
import Carousel from 'react-material-ui-carousel'
import Grid from "@material-ui/core/Grid";
import {Paper} from "@material-ui/core";
import Image from "next/image";

const InfoSection = () => {
    const styles = {
        container: {
            backgroundRepeat: "no-repeat",
            backgroundPosition: "right top",
            backgroundSize: "cover",
            backgroundAttachment: "fixed",
            backgroundImage: `url(${"/info-fondo.png"})`,
            padding: '40px'
        },
        row: {
            height: "400px",
        },
        paper: {
            padding: '15px',
            backgroundColor: 'rgba(0,0,0,0.05)',
            color: 'white',
            textShadow: '2px 2px #262626',
        },
        title: {
            margin: '0'
        }
    };

    function Item(props) {
        return (

            <div style={styles.container} elevation={3}>
                <Grid
                    style={styles.row}
                    container
                    direction="row"
                    justify="flex-end"
                    alignItems="flex-end"
                >
                    <Paper elevation={0} style={styles.paper}>
                        <Grid>
                            <h1 style={styles.title}>{props.item.name}</h1>
                        </Grid>
                    </Paper>
                    <Grid>
                        <Image src={props.item.icon} alt="" width="100" height="100"/>
                    </Grid>
                </Grid>
            </div>

        )
    }

    const items = [
        {
            name: "Recolección de residuos sólidos en Quito",
            icon: "/recycle-bin.png"
        }
        ,
        {
            name: "Reciclar es la forma más elevada de cultura",
            icon: "/reuse.png"
        }
    ]

    return (
        <Carousel>
            {
                items.map((item, i) => <Item key={i} item={item}/>)
            }
        </Carousel>
    )
}
export default InfoSection;
