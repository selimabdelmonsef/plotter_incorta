
import {GET_DIMENSION_MEASURE_DATA, GET_DATA_FAIL, GET_DATA_SUCCESS} from '../../constants/actions_constants'
const initState = { data: [], loading: false, error: null };

export default function DimensionsMeasureReducer(state = initState, action) {

    switch (action.type) {
        case GET_DIMENSION_MEASURE_DATA:
            return {
                ...state,
                loading: true
            };
        case GET_DATA_SUCCESS:
            return {
                loading: false,
                data: action.payload,
                error: null
            };
            case GET_DATA_FAIL:
                return {
                    loading: false,
                    error: action.payload
                };
        default: return state;
    }
}