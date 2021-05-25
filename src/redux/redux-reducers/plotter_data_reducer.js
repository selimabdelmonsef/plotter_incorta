const initState = [];

export default function PlotterDataReducer(state = initState, action) {

    switch (action.type) {
        case 'GET_PLOTTER_DATA':
            return {
                ...state,
                data: action.data
            };
        default: return state;
    }
}