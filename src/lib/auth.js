import React, { useState, useEffect, useContext, createContext } from "react";
import api from "./api";
import cookie from "js-cookie";
import translateMessage from '../constants/messages';
import {useSnackbar} from "notistack";
const authContext = createContext(null);

export function AuthProvider({ children }) {
    const auth = useAuthProvider();
    return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export const useAuth = () => {
    const context = useContext(authContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return useContext(authContext);
};

function useAuthProvider() {
    const [user, setUser] = useState(null);

    const handleUser = (user) => {
        if (user) {
            setUser(user);
            cookie.set("auth", true, {
                expires: 1, // dia
            });

            return user;
        } else {
            setUser(false);
            cookie.remove("auth");
            return false;
        }
    };
    const { enqueueSnackbar } = useSnackbar();
    async function register(data) {
        try {
            const response = await api.post("/register", data);
            console.log("rersponse", response);
            return response;
        } catch (error) {
            if (error.response) {
                enqueueSnackbar(error.response.data, { variant: "error",  anchorOrigin: {
                        vertical: 'top',
                        horizontal: 'center',
                    },});
                console.log(error.response.data);
                return Promise.reject(error.response);
            } else if (error.request) {
                console.log(error.request);
            } else {
                console.log("Error", error.message);
            }
            console.log(error.config);
        }
    }

    async function login(data) {
        try {
            const response = await api.post("/login", data);
            handleUser(response.data.user);
            return response;
        } catch (error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                enqueueSnackbar(translateMessage(error.response.data.error), { variant: "error",  anchorOrigin: {
                        vertical: 'top',
                        horizontal: 'center',
                    },});
                console.log('errorers', error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
                return error.response;
            } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                // http.ClientRequest in node.js
                console.log(error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.log("Error", error.message);
            }
            console.log(error.config);
        }
    }

    async function logout() {
        try {
            const response = await api.post("/logout");
            handleUser(false);
            return response;
        } catch (error) {}
    }

     const sendPasswordResetEmail = async (email) => {
        await api.post("forgot-password",{email});
     };

    const confirmPasswordReset = async (
        email,
        password,
        password_confirmation,
        token
    ) => {
        // try {
        await api.post("/reset-password", {
            email,
            password,
            password_confirmation,
            token,
        });
    };

    async function getAuthenticatedUser() {
        try {
            const response = await api.get("/user");
            handleUser(response.data);
            return response;
        } catch (error) {
            handleUser(false);
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.log(error.response.data);
                return error.response;
            } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                // http.ClientRequest in node.js
                console.log(error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.log("Error", error.message);
            }
            console.log(error.config);
        }
    }

    useEffect(() => {
        try {
            getAuthenticatedUser();
        } catch (error) {
            console.log("NO USER");
        }


    }, []);

    return {
        user,
        register,
        login,
        logout,
        sendPasswordResetEmail,
        confirmPasswordReset
    };
}