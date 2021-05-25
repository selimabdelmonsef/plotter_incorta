import React, { Component } from 'react';
// import styles from './plotter_page.module.css'
import { connect } from "react-redux";
import { _GetPlotterData } from "../redux/redux-actions/plotter_data_action";
import { Line } from "react-chartjs-2";
import { MDBContainer } from "mdbreact";
class Chart extends React.Component {
    constructor(props){
    super(props);
    this.state = {
        dataLine: {
            labels: [],
            datasets: 
            [
                // {
                //     label: "My First dataset",
                //     fill: true,
                //     lineTension: 0.3,
                //     backgroundColor: "rgba(225, 204,230, .3)",
                //     borderColor: "rgb(205, 130, 158)",
                //     borderCapStyle: "butt",
                //     borderDash: [],
                //     borderDashOffset: 0.0,
                //     borderJoinStyle: "miter",
                //     pointBorderColor: "rgb(205, 130,1 58)",
                //     pointBackgroundColor: "rgb(255, 255, 255)",
                //     pointBorderWidth: 10,
                //     pointHoverRadius: 5,
                //     pointHoverBackgroundColor: "rgb(0, 0, 0)",
                //     pointHoverBorderColor: "rgba(220, 220, 220,1)",
                //     pointHoverBorderWidth: 2,
                //     pointRadius: 1,
                //     pointHitRadius: 10,
                //     data: [70, 59, 80, 81, 56, 55, 40]
                // },
                {
                    label: "Dimensions Vs Measures",
                    fill: true,
                    lineTension: 0.1,
                    backgroundColor: "rgba(184, 185, 210, .3)",
                    borderColor: "rgb(35, 26, 136)",
                    borderCapStyle: "butt",
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: "miter",
                    pointBorderColor: "rgb(35, 26, 136)",
                    pointBackgroundColor: "rgb(255, 255, 255)",
                    pointBorderWidth: 10,
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: "rgb(0, 0, 0)",
                    pointHoverBorderColor: "rgba(220, 220, 220, 1)",
                    pointHoverBorderWidth: 2,
                    pointRadius: 1,
                    pointHitRadius: 10,
                    data:[]
                }
            ]
        }
    }
  }
       async getDimensionsData (){
            this.props.plotterData[0].values?.map((dimensionsValue)=>{
                
                this.setState({
                    dataLine:this.state.dataLine = {
                        datasets:this.state.dataLine.datasets,
                        // datasets:this.state.dataLine.datasets,
                        labels:[...this.state.dataLine.labels,dimensionsValue]}

                })
            })
            console.log(this.props.plotterData)
            // console.log(this.state.dataLine.datasets[0].data)        
       
        }
        async getMeasures(){
            // this.props.plotterData[1].values.map((measuresValue,index)=>{
            //     this.setState({
            //         dataLine:this.state.dataLine = {
            //             labels:this.state.dataLine.labels,
            //             // datasets:this.state.dataLine.datasets,
            //             datasets:[...this.state.dataLine.datasets[0]?.data[index],3]}
                        

            //     })
            // })
            // this.setState({
            //     dataLine:this.state.dataLine = {
            //         labels:this.state.dataLine.labels,
            //         // datasets:this.state.dataLine.datasets,
            //         datasets:[...this.state.dataLine.datasets[0]?.data,"3"]}

            // })
                //   this.setState({
                //     dataLine:this.state.dataLine = {
                //         labels:this.state.dataLine.labels,
                //         // datasets:this.state.dataLine.datasets,
                //         datasets:[...this.state.dataLine.datasets[0].data,22]}

                // })
                this.props.plotterData[1].values.map((measuresValue,index)=>{
                this.state.dataLine.datasets.forEach((dataset) => {
                    dataset.data.push(parseInt(this.props.plotterData[1].values[index]));
                });
            });
                console.log(this.props.plotterData[1].values)
            console.log(this.state.dataLine.datasets[0])
        }
       
    
    componentDidMount() {
        this.props.GetPlotterData();
        setTimeout(() => {
            this.getMeasures();
            this.getDimensionsData();
            
    }, 2000)
        // this.setState({

        // })
        // console.log(this.state.dimensions);
    }
    render() {
        return (
            <MDBContainer>
                <h3 className="mt-5">Line chart</h3>
                <Line data={this.state.dataLine} options={{ responsive: true }} />
            </MDBContainer>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        plotterData: state.PlotterDataReducer.data,

    };
};

const mapDisaptchToProps = (dispatch) => {
    return {
        GetPlotterData: (data, onSucess) => {
            dispatch(_GetPlotterData(data, onSucess));
        },
    };
};

export default connect(mapStateToProps, mapDisaptchToProps)(Chart);


