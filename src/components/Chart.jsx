import React, { Component } from 'react';
import CanvasJSReact from './canvasjs.react';
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

var dps = [
  { x: 1, y: 10 },
  { x: 2, y: 13 },
  { x: 3, y: 18 },
  { x: 4, y: 20 },
  { x: 5, y: 17 },
  { x: 6, y: 10 },
  { x: 7, y: 13 },
  { x: 8, y: 18 },
  { x: 9, y: 20 },
  { x: 10, y: 17 },
  { x: 11, y: 10 },
  { x: 12, y: 13 },
  { x: 13, y: 18 },
  { x: 14, y: 20 },
  { x: 15, y: 17 },
  { x: 16, y: 10 },
  { x: 17, y: 13 },
  { x: 18, y: 18 },
  { x: 19, y: 20 },
  { x: 20, y: 17 },
]; //dataPoints.
var xVal = dps.length;
var yVal = 15;
var updateInterval = 1000;


export class Chart extends Component {
    constructor() {
        super();
        this.updateChart = this.updateChart.bind(this);
      }
      componentDidMount() {
        setInterval(this.updateChart, updateInterval);
      }
      updateChart() {
        yVal = yVal + Math.round(5 + Math.random() * (-5 - 5));
        dps.push({ x: xVal, y: yVal });
        xVal++;
        if (dps.length > 20) {
          dps.shift();
        }
        this.chart.render();
      }
      render() {
        const options = {
            backgroundColor: "transparent",
            // height: 580,
            zoomEnabled:true,
            risingColor: "#51ff0d", 
            title: {
                text: '',
            },
            axisX:{
                labelFontColor: "white",
                tickLength: 0
            },
            axisY:{
                labelFontColor: "white",
                tickLength: 0
            },
            data: [
                {
                type: 'area',
                lineColor: "#51ff0d",
                fillOpacity: .1,
                dataPoints: dps,
                },
            ],
        };
        return (
          <div>
            <CanvasJSChart options={options} onRef={(ref) => (this.chart = ref)} />
            {/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
          </div>
        );
      }
}

export default Chart