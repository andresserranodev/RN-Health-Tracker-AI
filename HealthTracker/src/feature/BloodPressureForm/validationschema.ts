import * as yup from 'yup';

import {validationMessages} from '../../constants/validationMessages';

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
