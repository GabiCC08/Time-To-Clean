import React from 'react';
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";

const styles={
    Container:{
        padding:'85px',
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center center",
        backgroundSize: "cover",
        backgroundImage: `url(${"/fondo1.png"})`,
        textAlign:'justify'
    }
};

const Privacidad = () => {
    return (
        <div style={styles.Container}>
            <Container fixed>
                <Typography variant="h4" gutterBottom>POLÍTICA DE PRIVACIDAD</Typography>
                <Typography variant="body1" gutterBottom>
                    El presente Política de Privacidad establece los términos en que Time To Clean usa y protege la
                    información que es proporcionada por sus usuarios al momento de utilizar su sitio web. Esta compañía
                    está comprometida con la seguridad de los datos de sus usuarios. Sin embargo esta Política de
                    Privacidad puede cambiar con el tiempo o ser actualizada por lo que le recomendamos y enfatizamos
                    revisar continuamente esta página para asegurarse que está de acuerdo con dichos cambios.
                </Typography>
                <Typography variant="h5" gutterBottom>Uso de la información</Typography>
                <Typography variant="body1" gutterBottom>
                    La plataforma emplea la información con el fin de proporcionar una buena gestión laboral.
                    Time To Clean está altamente comprometido para cumplir con el compromiso de mantener su información
                    segura. Usamos los sistemas más avanzados y los actualizamos constantemente para asegurarnos que no
                    exista ningún acceso no autorizado.
                </Typography>
                <Typography variant="h5" gutterBottom>Cookies</Typography>
                <Typography variant="body1" gutterBottom>
                    Una cookie se refiere a un fichero que es enviado con la finalidad de solicitar permiso para
                    almacenarse en su ordenador, al aceptar dicho fichero se crea y la cookie sirve entonces para tener
                    información respecto al tráfico web, y también facilita las futuras visitas a una web recurrente.
                    Otra función que tienen las cookies es que con ellas las web pueden reconocerte individualmente y
                    por tanto brindarte el mejor servicio personalizado de su web.
                    Nuestro sitio web emplea las cookies. Usted puede eliminar las cookies en cualquier momento desde su
                    ordenador. Sin embargo las cookies ayudan a proporcionar un mejor servicio de los sitios web, estás
                    no dan acceso a información de su ordenador ni de usted, a menos de que usted así lo quiera y la
                    proporcione directamente. Puede cambiar la configuración de su ordenador para declinar las cookies.
                    Si se declinan es posible que no pueda utilizar algunos de nuestros servicios.
                </Typography>
                <Typography variant="h5" gutterBottom>Enlaces a Terceros </Typography>
                <Typography variant="body1" gutterBottom>
                    Este sitio web pudiera contener enlaces a otros sitios que pudieran ser de su interés. Una vez que
                    usted de clic en estos enlaces y abandone nuestra página, ya no tenemos control sobre al sitio al
                    que es redirigido y por lo tanto no somos responsables de los términos o privacidad ni de la
                    protección de sus datos en esos otros sitios terceros. Dichos sitios están sujetos a sus propias
                    políticas de privacidad por lo cual es recomendable que los consulte para confirmar que usted está
                    de acuerdo con estas.
                </Typography>
                <Typography variant="h5" gutterBottom>Control de su información personal</Typography>
                <Typography variant="body1" gutterBottom>
                    Esta compañía no venderá, cederá ni distribuirá la información personal que es recopilada sin su
                    consentimiento, salvo que sea requerido por un juez con un orden judicial.
                    Time To Clean se reserva el derecho de cambiar los términos de la presente Política de Privacidad en
                    cualquier momento.
                </Typography>
            </Container>
        </div>
    );
};
export default Privacidad;