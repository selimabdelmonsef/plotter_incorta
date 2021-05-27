import React, { Component } from 'react';
import Table from 'react-bootstrap/Table';
import styles from './plotter_page.module.css'
import { connect } from "react-redux";
import { _GetDimensionsMeasuresData } from "../../redux/redux-actions/dimensions_measures_action";
import { _GetPlotterData } from "../../redux/redux-actions/plotter_data_action";
import Chart from '../../sharedpreferences/chart/chart'

export let dimensionValue = "";
export let measureValue = "";
class PlotterPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            handleDrag_1: "",
            handleDrag_2: "",
            handleDragMeasure: "",
            dragError: "",
            chartComplete: false,
        }
    }
    componentDidMount() {
        this.props.GetDimensionsMeasuresData();
        //    console.log(this.props.loading)
        //    this.props.GetPlotterData();
        // this.props.GetPlotterData({
        //     measures: ["Cost"],
        //     dimension: "Product"
        // })
        // console.log(this.props.plotterData)
    }
    onDragStart = (event, taskName) => {
        event.dataTransfer.setData("taskName", taskName);
        this.setState({
            handleDrag_1: taskName,
            dragError: "",
            chartComplete: false,
        })
        console.log(this.state.handleDrag_1)
    }
    onDragOver = (event, task) => {
        event.preventDefault();
    }
    onDropDimension = (event, taskName) => {
        if (this.state.handleDrag_1.function === "dimension") {
            this.setState({
                handleDrag_2: this.state.handleDrag_1
            }, () => {
                if (this.state.handleDrag_2 !== "" && this.state.handleDragMeasure !== "") {
                    this.props.GetPlotterData({
                        // measures: ["Cost"],
                        measures: this.state.handleDragMeasure.name,
                        dimension: this.state.handleDrag_2.name
                        // dimension: "Product"
                    })
                }
            });
        }
        else {
            this.setState({
                dragError: "Sorry, should be dropped in Measure"
            })
        }
        console.log(this.state.handleDrag_2 !== "" && this.state.handleDragMeasure !== "");

    }
    onDropMeasure = (event, taskName) => {
        if (this.state.handleDrag_1.function === "measure") {
            this.setState({
                handleDragMeasure: this.state.handleDrag_1,
                dragError: "",
            }, () => {
                if (this.state.handleDrag_2 !== "" && this.state.handleDragMeasure !== "") {
                    this.props.GetPlotterData({
                        measures: this.state.handleDragMeasure.name,
                        dimension: this.state.handleDrag_2.name
                    })
                }
            })
        }

        else {
            this.setState({
                dragError: "Sorry, Should be dropped in Dimension"
            })
        }
        console.log(this.state.handleDrag_2 !== "" && this.state.handleDragMeasure !== "");
    }

    render() {
        return (
            <div>

                <div>
                    <Table bordered>
                        <caption>
                            Plotter
                    </caption>
                        {this.props.loading === true ? <span className={styles.textLoading}>Loading...</span> : this.props.plotterData.length > 0 ? <Chart></Chart>
                            : <span className={styles.textLoading}>No Data Please Drag and Drop Dimensions and Measures</span>}
                        {this.props.data?.map((element, index) => {
                            return <tr>
                                <th draggable="true" onDragStart={(event) => this.onDragStart(event, element)} style={{ paddingTop: '45px' }}> {element.name}</th>

                                <div className={styles.block_1} onDragOver={(event) => this.onDragOver(event)} onDrop={(event) => this.onDropDimension(event)}>
                                    Dimensions: <span >
                                        {this.state.handleDrag_2.name}</span>
                                </div>
                                <div className={styles.block_2} onDragOver={(event) => this.onDragOver(event)} onDrop={(event) => this.onDropMeasure(event)}>
                                    Measure: <span >
                                        {this.state.handleDragMeasure.name}
                                    </span>

                                </div>
                            </tr>
                        })}
                        
                    </Table>
                    
                </div>
                <h1 className={styles.errorStyle}>{this.state.dragError}</h1>

            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        data: state.DimensionsMeasureReducer.data,
        plotterData: state.PlotterDataReducer.data,
        loading: state.PlotterDataReducer.loading
    };
};

const mapDisaptchToProps = (dispatch) => {
    return {
        GetDimensionsMeasuresData: (payload) => {
            dispatch(_GetDimensionsMeasuresData(payload));
        },
        GetPlotterData: (payload) => {
            dispatch(_GetPlotterData(payload));
        },
    };
};

export default connect(mapStateToProps, mapDisaptchToProps)(PlotterPage);