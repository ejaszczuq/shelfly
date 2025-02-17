import { resources as resourcesConfig } from "./resources";

declare module "react-i18next" {
  interface CustomTypeOptions {
    resources: (typeof resourcesConfig)[keyof typeof resourcesConfig];
  }
}
