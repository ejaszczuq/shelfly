import * as yup from "yup";

export const registerAccountSchema = () =>
  yup.object({
    email: yup.string().email().required("To pole jest wymagane"),
    password: yup.string().required("To pole jest wymagane")
  });
