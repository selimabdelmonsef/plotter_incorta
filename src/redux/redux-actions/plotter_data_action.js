import Axios from 'axios';
import { api } from '../../constants/apis.js';
import { dimensionValue, measureValue } from "../../components/plotter_page/plotter_page"


export const _GetPlotterData = () => async (dispatch) => {
    console.log("DD", dimensionValue);
    console.log("DD", measureValue);
    await Axios.post(api.postPlotterData_api, {
        // "measures": `["${measureValue}"]`,
        // "measures": ["Revenue"],
        // "dimension": dimensionValue
        // "dimension": "Year"
        "measures": ["Revenue"],
        "dimension": "Year"

    }).then(response => {
        // console.log(response.data);
        dispatch({
            type: "GET_PLOTTER_DATA",
            data: response.data,
        });
    }).catch(error => {
        console.log(error);
    });
}