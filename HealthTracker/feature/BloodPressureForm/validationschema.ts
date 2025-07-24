import { validationMessages } from "../../constants/validationMessages";
import * as yup from "yup";

export const validationSchema = yup.object().shape({
  sys: yup
    .number()
    .typeError(validationMessages.common.mustBeNumber)
    .required(validationMessages.sys.required)
    .positive(validationMessages.common.mustBePositive)
    .integer(validationMessages.common.mustBeInteger),

  dia: yup
    .number()
    .typeError(validationMessages.common.mustBeNumber)
    .required(validationMessages.dia.required)
    .positive(validationMessages.common.mustBePositive)
    .integer(validationMessages.common.mustBeInteger),

  ppm: yup
    .number()
    .typeError(validationMessages.common.mustBeNumber)
    .required(validationMessages.ppm.required)
    .positive(validationMessages.common.mustBePositive)
    .integer(validationMessages.common.mustBeInteger),
});
