import React, {useEffect, useState} from "react";
import useSWR from "swr";
import {fetcher} from "@/lib/utils";
import Loading from "@/components/Loading";
import withAuth from "@/hocs/withAuth";
import {useForm} from "react-hook-form";
import {withStyles, makeStyles} from "@material-ui/core/styles";
import {
    Paper,
    TableRow,
    TableHead,
    TableContainer,
    TableCell,
    TableBody,
    Table,
    Button,
    Box,
    TablePagination,
    IconButton,
    DialogTitle,
    DialogContent,
    Dialog,
    InputBase,
    Divider
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import BorderColorIcon from "@material-ui/icons/BorderColor";
import PostAddIcon from "@material-ui/icons/PostAdd";
import DeleteUser from "@/components/DeleteUser";
import EditUser from "@/components/EditUser";
import AddUser from "@/components/AddUser";
import SearchIcon from "@material-ui/icons/Search";

const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
    },
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
        textAlign: 'center',
        color: 'white',
        textShadow: '2px 2px #262626',

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
    divider: {
        height: 28,
        margin: 4,
    },
}));

const TableUsers = () => {
    const classes = useStyles();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const {data, error, mutate} = useSWR(`/users?page=${page + 1}`, fetcher);
    const {data: usersAllData, error: e, mutate: m} = useSWR(
        `/users/all`,
        fetcher
    );
    const {register} = useForm();

    const [dataSearchUsers, setDataSearchUsers] = useState([]);
    const [wordSearch, setWordSearch] = useState("");
    const [valueIdUser, setValueIdUser] = useState(null);
    const [isDialogsVisibleEditUser, setIsDialogsVisibleEditUser] = useState(
        false
    );
    const [isDialogsVisibleAddUser, setIsDialogsVisibleAddUser] = useState(
        false
    );
    const [
        isDialogsVisibleDeleteUser,
        setIsDialogsVisibleDeleteUser,
    ] = useState(false);

    const handleClickOpenAddUser = () => {
        setIsDialogsVisibleAddUser(true);
    };

    const handleClickOpenEditUser = (id) => {
        setIsDialogsVisibleEditUser(true);
        setValueIdUser(id);
    };

    const handleClickDeleteUser = async (id) => {
        setIsDialogsVisibleDeleteUser(true);
        setValueIdUser(id);
    };
    const handleClickDeleteSearchUser = () => {
        setWordSearch("");

    };
    const handleChange = (event) => {
        setWordSearch(event.target.value);
    };

    useEffect(() => {
        if (usersAllData) {
            setDataSearchUsers([]);
            const listUsersData = [];
            usersAllData.data.map((user) => {
                user.name.toUpperCase().includes(wordSearch.toUpperCase())
                    ? listUsersData.push(user)
                    : "";
            });
            setDataSearchUsers(listUsersData);
        }
    }, [wordSearch]);

    const handleClose = () => {
        setIsDialogsVisibleAddUser(false);
        setIsDialogsVisibleEditUser(false);
        setIsDialogsVisibleDeleteUser(false);
        mutate();
    };
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    if (error) return <div>No se pudo cargar los conductores</div>;
    if (!data) return <Loading/>;


    return (
        <>
            <h1 className={classes.title}>Gestión de conductores</h1>
            <Box display="flex" justifyContent="flex-end" m={1} p={1}>
                <Button
                    variant="outlined"
                    size="large"
                    className={classes.margin}
                    endIcon={<PostAddIcon/>}
                    onClick={handleClickOpenAddUser}
                >
                    Agregar Usuario
                </Button>
            </Box>
            <Box display="flex" justifyContent="flex" m={1} p={1}>
                <form className={classes.root} noValidate autoComplete="off">
                    <Paper className={classes.root3}>
                        <InputBase
                            id="wordToSearch"
                            name="wordToSearch"
                            value={wordSearch}
                            className={classes.input}
                            placeholder="Ingrese el nombre del conductor"
                            inputRef={register}
                            onChange={handleChange}
                        />
                        <IconButton
                            onClick={handleClickDeleteSearchUser}
                            className={classes.iconButton}
                            aria-label="search"
                        >
                            <SearchIcon/>
                        </IconButton>
                        <Divider className={classes.divider} orientation="vertical"/>
                    </Paper>
                </form>
            </Box>

            {wordSearch !== "" ? (
                <div>
                    {dataSearchUsers ? (
                        <div>
                            <TableContainer component={Paper}>
                                <Table aria-label="customized table">
                                    <TableHead>
                                        <TableRow>
                                            <StyledTableCell align="center">Nombre</StyledTableCell>
                                            <StyledTableCell align="center">Correo</StyledTableCell>
                                            <StyledTableCell align="center">Celular</StyledTableCell>
                                            <StyledTableCell align="center">Camión</StyledTableCell>
                                            <StyledTableCell align="center">Tipo</StyledTableCell>
                                            <StyledTableCell align="center">Opciones</StyledTableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {dataSearchUsers.map((user) => (
                                            <StyledTableRow key={user.id}>
                                                <StyledTableCell align="center">
                                                    {user.name} {user.lastname}
                                                </StyledTableCell>
                                                <StyledTableCell align="center">
                                                    {user.email}
                                                </StyledTableCell>
                                                <StyledTableCell align="center">{user.cellphone}</StyledTableCell>
                                                <StyledTableCell align="center">
                                                    {user.truck === null ? "Sin camión" : user.truck}
                                                </StyledTableCell>
                                                <StyledTableCell align="center">
                                                    {user.type}
                                                </StyledTableCell>
                                                <StyledTableCell align="center">
                                                    {user.role === 'ROLE_DRIVER' ? <>
                                                            <IconButton
                                                                color="secondary"
                                                                aria-label="upload picture"
                                                                component="span"
                                                                onClick={() => handleClickOpenEditUser(user.id)}
                                                            >
                                                                <BorderColorIcon/>
                                                            </IconButton>
                                                            {user.truck === null ?
                                                                <IconButton
                                                                    color="dark"
                                                                    aria-label="upload picture"
                                                                    component="span"
                                                                    onClick={() => handleClickDeleteUser(user.id)}
                                                                >
                                                                    <DeleteIcon
                                                                    />
                                                                </IconButton>
                                                                : ""
                                                            }
                                                        </>
                                                        : ""
                                                    }
                                                </StyledTableCell>
                                            </StyledTableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </div>
                    ) : (
                        <Loading/>
                    )}
                </div>
            ) : (
                <div>
                    {data ? (
                        <div>
                            <TableContainer component={Paper}>
                                <Table aria-label="customized table">
                                    <TableHead>
                                        <TableRow>
                                            <StyledTableCell align="center">Nombre</StyledTableCell>
                                            <StyledTableCell align="center">Correo</StyledTableCell>
                                            <StyledTableCell align="center">Celular</StyledTableCell>
                                            <StyledTableCell align="center">Camión</StyledTableCell>
                                            <StyledTableCell align="center">Tipo</StyledTableCell>
                                            <StyledTableCell align="center">Opciones</StyledTableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {data.data.map((user) => (
                                            <StyledTableRow key={user.id}>
                                                <StyledTableCell align="center">
                                                    {user.name} {user.lastname}
                                                </StyledTableCell>
                                                <StyledTableCell align="center">
                                                    {user.email}
                                                </StyledTableCell>
                                                <StyledTableCell align="center">{user.cellphone}</StyledTableCell>
                                                <StyledTableCell align="center">
                                                    {user.truck === null ? "Sin camión" : user.truck}
                                                </StyledTableCell>
                                                <StyledTableCell align="center">
                                                    {user.type}
                                                </StyledTableCell>
                                                <StyledTableCell align="center">
                                                    {user.role === 'ROLE_DRIVER' ? <>
                                                            <IconButton
                                                                color="secondary"
                                                                aria-label="upload picture"
                                                                component="span"
                                                                onClick={() => handleClickOpenEditUser(user.id)}
                                                            >
                                                                <BorderColorIcon/>
                                                            </IconButton>
                                                            {user.truck === null ?
                                                                <IconButton
                                                                    color="dark"
                                                                    aria-label="upload picture"
                                                                    component="span"
                                                                    onClick={() => handleClickDeleteUser(user.id)}
                                                                >
                                                                    <DeleteIcon
                                                                    />
                                                                </IconButton>
                                                                : ""
                                                            }

                                                        </>
                                                        : ""
                                                    }
                                                </StyledTableCell>
                                            </StyledTableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </div>
                    ) : (
                        <Loading/>
                    )}
                </div>
            )}
            {wordSearch === "" ? (
                <TablePagination
                    rowsPerPageOptions={[10]}
                    component="div"
                    count={data.meta.total}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    className={classes.margin}
                    onChangePage={handleChangePage}
                />
            ) : (
                ""
            )}
            <Dialog
                open={isDialogsVisibleAddUser}
                onClose={handleClose}
                aria-labelledby="form-dialog-title"
                disableBackdropClick={true}
            >
                <DialogTitle id="form-dialog-title">Agrega un nuevo usuario</DialogTitle>
                <DialogContent>
                    <AddUser onCancel={handleClose}/>
                </DialogContent>
            </Dialog>

            <Dialog
                open={isDialogsVisibleEditUser}
                onClose={handleClose}
                aria-labelledby="form-dialog-title"
                disableBackdropClick={true}
            >
                {/*<DialogTitle id="form-dialog-title">*/}
                {/*    Editar información del conductor*/}
                {/*</DialogTitle>*/}
                <DialogContent>
                    <EditUser id={valueIdUser} onCancel={handleClose}/>
                </DialogContent>
            </Dialog>

            <Dialog
                open={isDialogsVisibleDeleteUser}
                onClose={handleClose}
                aria-labelledby="form-dialog-title"
                disableBackdropClick={true}
            >
                <DialogContent>
                    <DeleteUser id={valueIdUser} onCancel={handleClose}/>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default withAuth(TableUsers);