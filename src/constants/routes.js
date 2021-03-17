const publicRoutes = {
  LOGIN: "/iniciar-sesion",
  NEIGHBORHOODS: "/barrios",
  NEIGHBORHOODS_ID: "/barrios/:id",
  ABOUT: "/acerca-de",
  PRIVACY: "/privacidad",

};

const privateRoutes = {
  HOME: "/",
    REGISTER: "/registro",
    USERS: "/usuarios",
    USERS_ID: `/usuario/:id`,
    MANAGEMENT: "/gestion",
};

const Routes = {
  ...publicRoutes,
  ...privateRoutes,
};

export default Routes;
