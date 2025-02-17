import { get } from "env-var";

// eslint-disable-next-line @typescript-eslint/no-var-requires
export const APP_VERSION = require("../../package.json").version;

export class AppConfig {
  // App ==================================================================================
  static readonly AppStage = get("REACT_APP_STAGE").asEnum(["prod", "dev"]);

  // Other ================================================================================
  static readonly i18nDebugMode = get("REACT_APP_I18N_DEBUG_MODE").default("false").asBool();
}
