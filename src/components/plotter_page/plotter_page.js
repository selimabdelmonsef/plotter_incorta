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
            handleDrag_1: "",
            handleDrag_2: "",
            handleDragMeasure:"",
            dragError:"",
        }
    }
    async componentDidMount() {
        await this.props.GetDimensionsMeasuresData();
        
    }
    onDragStart = (event, taskName) => {
        event.dataTransfer.setData("taskName", taskName);
        this.setState({
            handleDrag_1: taskName,
            dragError:"",
        })
    }
    onDragOver = (event, task) => {
        event.preventDefault();
    }
    onDropDimension = (event, taskName) => {
        this.state.handleDrag_1.function === "dimension"?
        this.setState({
            handleDrag_2: this.state.handleDrag_1
        })
        : this.setState({
            dragError: "Sorry, should be dropped in Measure"
        })
        console.log(this.state.handleDrag_2);
        console.log(this.state.dragError);

    }
    onDropMeasure = (event, taskName) => {
        this.state.handleDrag_1.function === "measure"?
        this.setState({
            handleDragMeasure: this.state.handleDrag_1,
            dragError:"",
        })
        : this.setState({
            dragError: "Sorry, Should be dropped in Dimension"
        })
        console.log(this.state.handleDrag_2);
        console.log(this.state.dragError);

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
                        <h1 className={styles.errorStyle}>{this.state.dragError}</h1>
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