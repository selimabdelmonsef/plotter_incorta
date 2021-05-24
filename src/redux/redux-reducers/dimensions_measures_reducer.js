const initState = [{ loading: true }];

export default function DimensionsMeasureReducer(state = initState, action) {

    switch (action.type) {
        case 'GET_DATA':
            return {
                ...state,
                data: action.data
            };
        default: return state;
    }
}