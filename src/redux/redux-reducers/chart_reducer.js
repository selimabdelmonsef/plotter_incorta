const initState = [{chartHasData:false}];

export default function ChartReducer(state = initState, action) {

    switch (action.type) {
        case "CHART_DATA":
            return {
                ...state,
                data: action.data
            };
        default: return state;
    }
}