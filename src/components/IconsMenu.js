import React from "react";
import IconButton from "@material-ui/core/IconButton";
import AccountCircle from "@material-ui/icons/AccountCircle";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import MoreIcon from "@material-ui/icons/MoreVert";
import {makeStyles} from "@material-ui/core/styles";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import {useAuth} from "@/lib/auth";
import Link from "next/link";
import Routes from "../constants/routes";

const useStyles = makeStyles((theme) => ({
    sectionDesktop: {
        display: "none",
        [theme.breakpoints.up("md")]: {
            display: "flex",
        },
    },
    sectionMobile: {
        display: "flex",
        [theme.breakpoints.up("md")]: {
            display: "none",
        },
    },
}));

const IconsMenu = () => {
    const {logout, user} = useAuth();
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    const handleMenuAccountOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuAccountClose = () => {
        setAnchorEl(null);
        handleMobileMenuClose();
    };

    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };

    const handleMobileMenuOpen = (event) => {
        setMobileMoreAnchorEl(event.currentTarget);
    };

    const handleLogout = async () => {
        logout();
        handleMenuAccountClose();
    };

    const menuId = "account-menu";
    const renderMenuAccount = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{vertical: "top", horizontal: "right"}}
            id={menuId}
            keepMounted
            transformOrigin={{vertical: "top", horizontal: "right"}}
            open={isMenuOpen}
            onClose={handleMenuAccountClose}
        >
            <Link href={Routes.MANAGEMENT}>
                <MenuItem onClick={handleMenuAccountClose}>Mi cuenta</MenuItem>
            </Link>
            <MenuItem onClick={handleLogout}>Cerrar sesión</MenuItem>
        </Menu>
    );

    const mobileMenuId = "mobile-account-menu";
    const renderMobileMenu = (
        <Menu
            anchorEl={mobileMoreAnchorEl}
            anchorOrigin={{vertical: "top", horizontal: "right"}}
            id={mobileMenuId}
            keepMounted
            transformOrigin={{vertical: "top", horizontal: "right"}}
            open={isMobileMenuOpen}
            onClose={handleMobileMenuClose}
        >
            {user ? (
                <>
                    <Link href={Routes.MANAGEMENT}>
                        <MenuItem>
                            <IconButton
                                aria-label="account of current user"
                                aria-controls="primary-search-account-menu"
                                aria-haspopup="true"
                                color="inherit"
                            >
                                <AccountCircle/>
                            </IconButton>
                            <p>Mi cuenta</p>
                        </MenuItem>
                    </Link>
                    <MenuItem onClick={handleLogout}>
                        <IconButton
                            aria-label="account of current user"
                            aria-controls="primary-search-account-menu"
                            aria-haspopup="true"
                            color="inherit"
                        >
                            <ExitToAppIcon/>
                        </IconButton>
                        <p>Cerrar Sesión</p>
                    </MenuItem>
                </>
            ) : (
                <MenuItem>
                    <IconButton
                        aria-label="account of current user"
                        aria-controls="primary-search-account-menu"
                        aria-haspopup="true"
                        color="inherit"
                    >
                        <AccountCircle/>
                    </IconButton>
                    <Link href={Routes.LOGIN}>
                        <MenuItem>Iniciar sesión</MenuItem>
                    </Link>
                </MenuItem>
            )}
        </Menu>
    );

    return (
        <>
            <div className={classes.sectionDesktop}>
                {user ? (
                    <MenuItem onClick={handleMenuAccountOpen} id="account-menu-button">
                        <AccountCircle style={{marginRight: 5}}/> {user.name ? user.name : user.data.user.name}
                    </MenuItem>
                ) : (
                    <Link href={Routes.LOGIN}>
                        <MenuItem>Iniciar sesión</MenuItem>
                    </Link>
                )}
            </div>

            <div className={classes.sectionMobile}>
                <IconButton
                    aria-label="show more"
                    aria-controls={mobileMenuId}
                    aria-haspopup="true"
                    onClick={handleMobileMenuOpen}
                    color="inherit"
                    id="mobile-account-menu-button"
                >
                    <MoreIcon/>
                </IconButton>
            </div>
            {renderMenuAccount}
            {renderMobileMenu}
        </>
    );
};

export default IconsMenu;
