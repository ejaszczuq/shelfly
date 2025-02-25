import { get } from "env-var";

// eslint-disable-next-line @typescript-eslint/no-var-requires
export const APP_VERSION = require("../../package.json").version;

export class AppConfig {
  // App ==================================================================================
  static readonly AppStage = get("REACT_APP_STAGE").asEnum(["prod", "dev"]);

  // Firebase =============================================================================
  static readonly firebaseConfig = {
    apiKey: get("REACT_APP_FIREBASE_API_KEY").required().asString(),
    authDomain: get("REACT_APP_FIREBASE_AUTH_DOMAIN").required().asString(),
    projectId: get("REACT_APP_FIREBASE_PROJECT_ID").required().asString(),
    storageBucket: get("REACT_APP_FIREBASE_STORAGE_BUCKET").required().asString(),
    messagingSenderId: get("REACT_APP_FIREBASE_MESSAGING_SENDER_ID").required().asString(),
    appId: get("REACT_APP_FIREBASE_APP_ID").required().asString(),
    measurementId: get("REACT_APP_FIREBASE_MEASUREMENT_ID").asString()
  };

  // Other ================================================================================
  static readonly i18nDebugMode = get("REACT_APP_I18N_DEBUG_MODE").default("false").asBool();
}
