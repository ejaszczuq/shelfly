import { Path } from "./common/Paths";

export const PATHS = {
  auth: new Path({
    path: "/auth",
    pathName: "Auth"
  }),
  authLogin: new Path({
    path: "/auth/login",
    pathName: "Login"
  }),
  authRegister: new Path({
    path: "/auth/register",
    pathName: "Register"
  }),

  main: new Path({
    path: "/",
    pathName: "Home"
  }),
  notFound: new Path({
    path: "/*"
  })
} as const;
