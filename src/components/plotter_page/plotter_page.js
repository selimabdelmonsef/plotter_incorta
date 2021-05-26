import React, { Component } from 'react';
import Table from 'react-bootstrap/Table';
import styles from './plotter_page.module.css'
import { connect } from "react-redux";
import { _GetDimensionsMeasuresData } from "../../redux/redux-actions/dimensions_measures_action";
import { _GetPlotterData } from "../../redux/redux-actions/plotter_data_action";
import Chart from '../../sharedpreferences/chart/chart'
class PlotterPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            task1: "",
            task2: ""
        }
    }
    async componentDidMount() {
        await this.props.GetDimensionsMeasuresData();
    }
    onDragStart = (event, taskName) => {
        event.dataTransfer.setData("taskName", taskName);
        this.setState({
            task1: taskName
        })
    }
    onDragOver = (event, task) => {
        event.preventDefault();
    }
    onDrop = (event, taskName) => {
        this.setState({
            task2: this.state.task1.name
        })
    }

    render() {
        return (
            <div>
                <div>
                    <Table bordered>
                        <caption>
                            Plotter
                        </caption>
                        <Chart></Chart>
                        {this.props.data?.map((element, index) => {
                            return <tr>
                                <th draggable="true" onDragStart={(event) => this.onDragStart(event, element)} style={{ paddingTop: '45px' }}> {element.name}</th>

                                <div className={styles.block_1} onDragOver={(event) => this.onDragOver(event)} onDrop={(event) => this.onDrop(event)}>
                                    <span >{this.state.task2}</span>
                                </div>
                                <div className={styles.block_2}>
                                    <span ></span>
                                </div>
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