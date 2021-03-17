import React, {useEffect, useState} from "react";
import useSWR from "swr";
import {fetcher} from "@/lib/utils";
import Loading from "@/components/Loading";
import withAuth from "@/hocs/withAuth";
import {withStyles, makeStyles} from "@material-ui/core/styles";
import {Dialog, DialogContent, Divider, InputBase, Link as MuiLink} from '@material-ui/core';
import {
    Paper,
    TableRow,
    TableHead,
    TableContainer,
    TableCell,
    TableBody,
    Table, Button, Box, TablePagination, IconButton,
} from "@material-ui/core";
import DeleteIcon from '@material-ui/icons/Delete';
import BorderColorIcon from '@material-ui/icons/BorderColor';
import PostAddIcon from '@material-ui/icons/PostAdd';
import AddNeighborhood from "@/components/AddNeighborhood";
import EditNeighborhood from "@/components/EditNeighborhood";
import DeleteNeighborhood from "@/components/DeleteNeighborhood";
import SearchIcon from "@material-ui/icons/Search";

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

const useStyles = makeStyles((theme) => ({
    table: {
        minWidth: 600,
    },
    margin: {
        backgroundColor: "rgba(255,255,255,0.8)",
    },
    root3: {
        padding: "2px 4px",
        display: "flex",
        alignItems: "center",
        width: 400,
    },
    input: {
        marginLeft: theme.spacing(1),
        flex: 1,
    },
    iconButton: {
        padding: 10,
    },
}));

const styles = {
    title: {
        textAlign: 'center',
        color: 'white',
        textShadow: '2px 2px #262626',
    }
};

const TableNeighborhoods = () => {

    const classes = useStyles();
    const [page, setPage] = useState(0);
    const {data: neighborhoodsPaginated, error, mutate} = useSWR(`/neighborhoods?page=${page + 1}`, fetcher);
    const {data: neighborhoodsAllData, error: error2, mutate: mutate2} = useSWR(`/neighborhoods/all`, fetcher);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [neighborhoodId, setNeighborhoodId] = useState(0);
    const [openAddNeighborhood, setOpenAddNeighborhood] = useState(false);
    const [openEditNeighborhood, setOpenEditNeighborhood] = useState(false);
    const [openDeleteNeighborhood, setOpenDeleteNeighborhood] = useState(false);

    const [wordSearch, setWordSearch] = useState("");
    const [dataSearchNeighborhood, setDataSearchNeighborhood] = useState([]);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChange = (event) => {
        setWordSearch(event.target.value);
    };
    const handleClickDeleteSearch = () => {
        setWordSearch("");
    };

    useEffect(() => {
        if (neighborhoodsAllData) {
            const listNeighborhoods = [];
            neighborhoodsAllData.data.map((neighborhood) => {
                neighborhood.name.toUpperCase().includes(wordSearch.toUpperCase())
                    ? listNeighborhoods.push(neighborhood)
                    : "";
            });
            setDataSearchNeighborhood(listNeighborhoods);
        }
    }, [wordSearch]);

    const handleOpenNewNeigbhorhood = () => {
        setOpenAddNeighborhood(!openAddNeighborhood);
        mutate();
    };

    const handleOpenEditNeigbhorhood = (id) => {
        setOpenEditNeighborhood(!openEditNeighborhood);
        setNeighborhoodId(id);
    };
    const handleCloseEditNeigbhorhood = () => {
        setOpenEditNeighborhood(false);
        mutate();
    };
    const handleOpenDeleteNeigbhorhood = (id) => {
        setOpenDeleteNeighborhood(!openDeleteNeighborhood);
        setNeighborhoodId(id);
    };
    const handleCloseDeleteNeigbhorhood = () => {
        setOpenDeleteNeighborhood(!openDeleteNeighborhood);
        mutate();
    };


    if (error || error2) return <div>No se pudo cargar los barrios</div>;
    if (!neighborhoodsPaginated) return <Loading/>;

    return (
        <>
            <h1 style={styles.title}>Gestión y asignación de barrios y frecuencias</h1>
            <Box display="flex" justifyContent="flex-end" m={1} p={1}>
                <Button
                    variant="outlined"
                    size="large"
                    className={classes.margin}
                    endIcon={<PostAddIcon/>}
                    onClick={handleOpenNewNeigbhorhood}>
                    Agregar Barrio
                </Button>
            </Box>

            <Box display="flex" justifyContent="flex" m={1} p={1}>
                <Paper className={classes.root3}>
                    <InputBase
                        id="wordToSearch"
                        name="wordToSearch"
                        value={wordSearch}
                        className={classes.input}
                        placeholder="Ingrese el nombre del barrio"
                        onChange={handleChange}
                    />
                    <Divider className={classes.divider} orientation="vertical"/>
                    <IconButton
                        onClick={handleClickDeleteSearch}
                        className={classes.iconButton}
                        aria-label="search"
                    >
                        <SearchIcon/>
                    </IconButton>
                </Paper>
            </Box>

            <div>
                {
                    wordSearch === "" ?
                        (
                            neighborhoodsPaginated ?
                                <div>
                                    <TableContainer component={Paper}>
                                        <Table aria-label="customized table">
                                            <TableHead>
                                                <TableRow>
                                                    <StyledTableCell align="center">Barrio</StyledTableCell>
                                                    <StyledTableCell align="center">Ubicación en mapa</StyledTableCell>
                                                    <StyledTableCell align="center">Horario</StyledTableCell>
                                                    <StyledTableCell align="center">Días asignados</StyledTableCell>
                                                    <StyledTableCell align="center">Camión</StyledTableCell>
                                                    <StyledTableCell align="center">Opción</StyledTableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {neighborhoodsPaginated.data.map((neighborhood) => (
                                                    <StyledTableRow key={neighborhood.id}>
                                                        <StyledTableCell align="center">
                                                            {neighborhood.name}
                                                        </StyledTableCell>
                                                        <StyledTableCell align="center">
                                                            <MuiLink href={neighborhood.link}
                                                                     target={"_blank"}
                                                                     color="secondary">
                                                                Ver mapa
                                                            </MuiLink>
                                                        </StyledTableCell>
                                                        <StyledTableCell align="center">
                                                            {neighborhood.start_time} - {neighborhood.end_time}
                                                        </StyledTableCell>
                                                        <StyledTableCell align="center">
                                                            {neighborhood.days}
                                                        </StyledTableCell>
                                                        <StyledTableCell align="center">
                                                            {neighborhood.truck ? neighborhood.truck.license_plate : "No tiene camión"}
                                                        </StyledTableCell>
                                                        <StyledTableCell align="left">
                                                            {neighborhood.complaint.data.length > 0 ?
                                                                <IconButton
                                                                    color="secondary"
                                                                    aria-label="upload picture"
                                                                    component="span"
                                                                    onClick={() => handleOpenEditNeigbhorhood(neighborhood.id)}>
                                                                    <BorderColorIcon/>
                                                                </IconButton>
                                                                :
                                                                <>
                                                                    <IconButton
                                                                        color="secondary"
                                                                        aria-label="upload picture"
                                                                        component="span"
                                                                        onClick={() => handleOpenEditNeigbhorhood(neighborhood.id)}>
                                                                        <BorderColorIcon/>
                                                                    </IconButton>
                                                                    <IconButton
                                                                        color="dark"
                                                                        aria-label="upload picture"
                                                                        component="span"
                                                                        onClick={() => handleOpenDeleteNeigbhorhood(neighborhood.id)}>
                                                                        <DeleteIcon/>
                                                                    </IconButton>
                                                                </>
                                                            }
                                                        </StyledTableCell>
                                                    </StyledTableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                    <TablePagination
                                        rowsPerPageOptions={[10]}
                                        component="div"
                                        count={neighborhoodsPaginated.meta.total}
                                        rowsPerPage={rowsPerPage}
                                        page={page}
                                        className={classes.margin}
                                        onChangePage={handleChangePage}
                                    />
                                </div>
                                :
                                <Loading/>
                        )

                        :

                        (
                            neighborhoodsAllData ?
                                <div>
                                    <TableContainer component={Paper}>
                                        <Table aria-label="customized table">
                                            <TableHead>
                                                <TableRow>
                                                    <StyledTableCell align="center">Barrio</StyledTableCell>
                                                    <StyledTableCell align="center">Ubicación en mapa</StyledTableCell>
                                                    <StyledTableCell align="center">horario</StyledTableCell>
                                                    <StyledTableCell align="center">Días asignados</StyledTableCell>
                                                    <StyledTableCell align="center">Camión</StyledTableCell>
                                                    <StyledTableCell align="center">Opción</StyledTableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {dataSearchNeighborhood.map((neighborhood) => (
                                                    <StyledTableRow key={neighborhood.id}>
                                                        <StyledTableCell align="center">
                                                            {neighborhood.name}
                                                        </StyledTableCell>
                                                        <StyledTableCell align="center">
                                                            <MuiLink href={neighborhood.link}
                                                                     target={"_blank"}
                                                                     color="secondary">
                                                                Ver mapa
                                                            </MuiLink>
                                                        </StyledTableCell>
                                                        <StyledTableCell align="center">
                                                            {neighborhood.start_time} - {neighborhood.end_time}
                                                        </StyledTableCell>
                                                        <StyledTableCell align="center">
                                                            {neighborhood.days}
                                                        </StyledTableCell>
                                                        <StyledTableCell align="center">
                                                            {neighborhood.truck ? neighborhood.truck.license_plate : "No tienen camión"}
                                                        </StyledTableCell>
                                                        <StyledTableCell align="center">
                                                            {neighborhood.complaint.data.length > 0 ?
                                                                <IconButton
                                                                    color="secondary"
                                                                    aria-label="upload picture"
                                                                    component="span"
                                                                    onClick={() => handleOpenEditNeigbhorhood(neighborhood.id)}>
                                                                    <BorderColorIcon/>
                                                                </IconButton>
                                                                :
                                                                <>
                                                                    <IconButton
                                                                        color="secondary"
                                                                        aria-label="upload picture"
                                                                        component="span"
                                                                        onClick={() => handleOpenEditNeigbhorhood(neighborhood.id)}>
                                                                        <BorderColorIcon/>
                                                                    </IconButton>
                                                                    <IconButton
                                                                        color="dark"
                                                                        aria-label="upload picture"
                                                                        component="span"
                                                                        onClick={() => handleOpenDeleteNeigbhorhood(neighborhood.id)}>
                                                                        <DeleteIcon/>
                                                                    </IconButton>
                                                                </>
                                                            }
                                                        </StyledTableCell>
                                                    </StyledTableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>

                                </div>
                                :
                                <Loading/>
                        )
                }

                <div>
                    <Dialog onClose={handleOpenNewNeigbhorhood} open={openAddNeighborhood}>
                        <DialogContent dividers>
                            <AddNeighborhood onHandleCloseModal={handleOpenNewNeigbhorhood}/>
                        </DialogContent>
                    </Dialog>
                    <Dialog onClose={handleCloseEditNeigbhorhood} open={openEditNeighborhood}>
                        <DialogContent dividers>
                            <EditNeighborhood
                                id={neighborhoodId}
                                onHandleCloseModal={handleCloseEditNeigbhorhood}/>
                        </DialogContent>
                    </Dialog>
                    <Dialog onClose={handleCloseDeleteNeigbhorhood} open={openDeleteNeighborhood}>
                        <DialogContent dividers>
                            <DeleteNeighborhood
                                id={neighborhoodId}
                                onHandleCloseModal={handleCloseDeleteNeigbhorhood}/>
                        </DialogContent>
                    </Dialog>
                </div>
            </div>
        </>
    );
};

export default withAuth(TableNeighborhoods);