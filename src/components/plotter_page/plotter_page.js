import React, { Component } from 'react';
import Table from 'react-bootstrap/Table';
import styles from './plotter_page.module.css'
import { connect } from "react-redux";
import { _GetDimensionsMeasuresData } from "../../redux/redux-actions/dimensions_measures_action";
import {_GetPlotterData} from "../../redux/redux-actions/plotter_data_action";
import Chart from '../../sharedpreferences/chart/chart'
class PlotterPage extends React.Component {
    async componentDidMount() {
        await this.props.GetDimensionsMeasuresData();
    }
    render() {
        return (
            <div>
                <div>
                    <Table bordered>
                        {/* <Table className="table-borderless"> */}
                        <caption>
                            Plotter
                        </caption>
                        <Chart></Chart>
                        {this.props.data?.map((element) => {
                            return <tr>
                                <th style={{paddingTop:'45px'}}> {element.name}</th>
    

                            </tr>
                        })}
                        
                    </Table>
                </div>

            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        data: state.DimensionsMeasureReducer.data,
        plotterData: state.PlotterDataReducer.data,

    };
};

const mapDisaptchToProps = (dispatch) => {
    return {
        GetDimensionsMeasuresData: (data, onSucess) => {
            dispatch(_GetDimensionsMeasuresData(data, onSucess));
        },
        GetPlotterData: (data, onSucess) => {
            dispatch(_GetPlotterData(data, onSucess));
        },
    };
};

export default connect(mapStateToProps, mapDisaptchToProps)(PlotterPage);