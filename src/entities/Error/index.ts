import { ErrorSchema } from './model/types';
import { errorReducer } from './model/slice/ErrorSlice';
import { getError } from './model/selectors/getError/getError';

export {
    errorReducer,
    ErrorSchema,
    getError,
};
