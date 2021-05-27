import {GET_PLOTTER_DATA} from '../../constants/actions_constants'
export const _GetPlotterData = (payload) => {

    return {
        type: GET_PLOTTER_DATA,
        payload: payload
    }
 
}