import * as yup from "yup";

export const registerAccountSchema = () =>
  yup.object({
    email: yup.string()
      .email("Podaj poprawny adres email")
      .required("To pole jest wymagane"),
    password: yup.string()
      .required("To pole jest wymagane")
      .min(8, "Hasło musi mieć min. 8 znaków")
      .matches(/[A-Z]/, "Hasło musi zawierać min. jedną wielką literę")
      .matches(/[a-z]/, "Hasło musi zawierać min. jedną małą literę")
      .matches(/[0-9]/, "Hasło musi zawierać min. jedną cyfrę")
      .matches(/[@$!%*?&]/, "Wymagany min. jeden znak specjalny (@, $, !, %, *, ?, &)")
  });
