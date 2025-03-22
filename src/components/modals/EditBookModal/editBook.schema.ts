import * as yup from "yup";

export const generateAddEditBookSchema = () => {
  return yup.object({
    title: yup.string().required("To pole jest wymagane"),
    author: yup.string().required("To pole jest wymagane"),
    year: yup
      .number()
      .required("To pole jest wymagane")
      .min(1000, "Rok musi być większy niż 1000")
      .max(new Date().getFullYear(), `Rok nie może być większy niż ${new Date().getFullYear()}`),
    genre: yup
      .mixed()
      .test("is-array-or-string", "To pole jest wymagane", (value) =>
        Array.isArray(value) ? value.length > 0 : typeof value === "string" && value.trim() !== ""
      ),
    description: yup.string().required("To pole jest wymagane")
  });
};
