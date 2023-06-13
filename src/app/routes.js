import { lazy } from "react";

const Routes = [
  // DEFAULT PAGES
  {
    path: "/",
    component: lazy(() => import("pages/Home")),
    name: "Home",
  },
  /*
   ---------------------------------------------
    YOUR URL PAGES
   ---------------------------------------------
  */
  {
    path: "/login",
    component: lazy(() => import("pages/Login")),
    name: "Login",
  },
  {
    path: "/register",
    component: lazy(() => import("pages/Register")),
    name: "Register",
  },
  {
    path: "/profile",
    component: lazy(() => import("pages/Profile")),
    name: "Profile",
  },
  {
    path: "/site/:id",
    component: lazy(() => import("pages/Site")),
    name: "Site",
  },
  {
    path: "/manage/:id",
    component: lazy(() => import("pages/Edit")),
    name: "Manage",
  },
  {
    path: "/manage",
    component: lazy(() => import("pages/Manage")),
    name: "Manage",
  },
  /*
    ---------------------------------------------
    PLEASE KEEP PUT IT AT THE BOTTOM
    ---------------------------------------------
  */
  {
    path: "*",
    component: lazy(() => import("pages/404")),
    name: "Page not found",
  },
];

export default Routes;
