/* eslint-disable @typescript-eslint/no-unused-vars */

import i18n from "i18next";

declare module "i18next" {
  interface CustomTypeOptions {
    returnNull: false;
  }
}
