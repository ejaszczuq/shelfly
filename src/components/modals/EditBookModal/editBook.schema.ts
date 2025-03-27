import { useTranslation } from "react-i18next";
import * as yup from "yup";

export const generateAddEditBookSchema = () => {
  const {t} = useTranslation(["common", "modals"]);

  return yup.object({
    title: yup.string().required(`${t("common:required")}`),
    author: yup.string().required(`${t("common:required")}`),
    year: yup
      .number()
      .required(`${t("common:required")}`)
      .max(new Date().getFullYear(), `${t("modals:inputs.year.max")} ${new Date().getFullYear()}`),
    genre: yup
      .mixed()
      .test("is-array-or-string", `${t("common:required")}`, (value) =>
        Array.isArray(value) ? value.length > 0 : typeof value === "string" && value.trim() !== ""
      ),
    description: yup.string().required(`${t("common:required")}`)
  });
};
