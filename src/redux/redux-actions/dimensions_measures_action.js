import {GET_DIMENSION_MEASURE_DATA} from '../../constants/actions_constants'
export const _GetDimensionsMeasuresData = (payload) => {

    return {
        type: GET_DIMENSION_MEASURE_DATA,
        payload: payload
    }
}