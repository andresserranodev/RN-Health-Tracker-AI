import * as yup from "yup";

export const validationSchema = yup.object().shape({
  sys: yup
    .number()
    .typeError("The value must be a number")
    .required("Systolic pressure is required")
    .positive("The value must be positive"),

  dia: yup
    .number()
    .typeError("The value must be a number")
    .required("Diastolic pressure is required")
    .positive("The value must be positive"),

  ppm: yup
    .number()
    .typeError("The value must be a number")
    .required("Pulse rate is required")
    .positive("The value must be positive")
    .integer("The value must be an integer"),
});
