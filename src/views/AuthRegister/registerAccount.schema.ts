import { useTranslation } from "react-i18next";
import * as yup from "yup";

export const registerAccountSchema = () => {

  const {t} = useTranslation(["common", "auth"]);

  yup.object({
    email: yup.string()
      .email(`${t("auth:email.email")}`)
      .required(`${t("common:required")}`),
    password: yup.string()
      .required(`${t("common:required")}`)
      .min(8, `${t("auth:password.min")}`)
      .matches(/[A-Z]/, `${t("auth:password.matches.uppercase")}`)
      .matches(/[a-z]/, `${t("auth:password.matches.lowercase")}`)
      .matches(/[0-9]/, `${t("auth:password.matches.number")}`)
      .matches(/[@$!%*?&]/, `${t("auth:password.matches.specialChar")}`)
  });
}