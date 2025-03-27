import { useTranslation } from "react-i18next";
import * as yup from "yup";

export const loginSchema = () =>
{
  const {t} = useTranslation(["common"]);

  yup.object({
    email: yup.string().email().required(`${t("common:required")}`),
    password: yup.string().required(`${t("common:required")}`)
  });}
