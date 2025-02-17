import { Path } from "./common/Paths";

export const PATHS = {
  main: new Path({
    path: "/",
    pathName: "Home"
  }),
  notFound: new Path({
    path: "/*"
  })
} as const;
