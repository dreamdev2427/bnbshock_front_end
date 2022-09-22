import React, { useEffect, useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

export default function StockChart() {
	const [data,setChartData] = useState([]);
	// const [data2,setData2] = useState([]);

	const options = {
		responsive: true,
		maintainAspectRatio: false,
		borderWidth: 1,
		plugins: {
			legend: {
				position: 'top',
				display: false,
			},
			title: {
				display: false,
				text: 'Chart.js Line Chart',
			},
		},
		animation: true,
		//Boolean - If we want to override with a hard coded scale
		scaleOverride: true,
		//** Required if scaleOverride is true **
		//Number - The number of steps in a hard coded scale
		scaleSteps: 10,
		//Number - The value jump in the hard coded scale
		scaleStepWidth: 10,
		//Number - The scale starting value
		scaleStartValue: 0
	};
  
  	const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  
  	const config = {
		labels,
		datasets: [
			{
				fill: true,
				label: 'Dataset 2',
				data: [5,8,9,9,4,3,2,7.8,3,6],
				borderColor: '#7fff4d',
				backgroundColor: 'rgba(45, 255, 90, 0.2)',
			},
		],
  	};
  
	 
	useEffect(()=>{
		
	})

  return (
	<div className="chart-container">
    	<Line options={options} data={config} />
	</div>
 
	
  )
}

