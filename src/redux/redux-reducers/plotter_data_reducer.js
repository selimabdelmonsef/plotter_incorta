const initState = { data: [], loading: false, error: null };

export default function PlotterDataReducer(state = initState, action) {

    switch (action.type) {
        case 'GET_PLOTTER_DATA':
            return {
                ...state,
                loading: true
            };
        case 'GET_PLOTTER_DATA_SUCCESS':
            return {
                loading: false,
                data: action.payload,
                error: null
            };
            case 'GET_PLOTTER_DATA_FAIL':
                return {
                    ...state,
                    loading: false,
                    error: action.payload
                };
        default: return state;
    }
}