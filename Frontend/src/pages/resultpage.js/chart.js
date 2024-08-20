import { Line } from "react-chartjs-2";
import Chart from 'chart.js/auto';
import React from "react";
import './resultpage.css'

function Charts(dataRecieved) {
  const dataArray = dataRecieved.dataRecieved;

  if (!dataArray) {
    return (
      <div >
        <Line data={{
          labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
          datasets: [
            {
              label: "Result",
              data: [33, 25, 35, 51, 54, 76],
              fill: false,
              borderColor: "#742774"
            }
          ]
        }} />
      </div>
    );
  } else {
    const labels = [];
    const values = [];

    for (let single of dataArray) {
      labels.push(single.category);
      values.push(single.percentage);
    }

    const data = {
      labels,
      datasets: [
        {
          label: "Result",
          data: values,
          fill: false,
          borderColor: "#742774"
        }
      ]
    };

    const chartOptions = {
      scales: {
        y: {
          suggestedMin: 0,
          suggestedMax: 100,
          ticks: {
            color: 'black',
            font: {
              size: 16,
            }
          }
        },
        x: {
          ticks: {
            color: 'black',
            font: {
              size: 16,
            }
          },
          offset: 10,
        },
      },
    };

    return (
      <div className="respage" style={{ border: 'none' }}>
        <Line data={data} options={{ maintainAspectRatio: false, ...chartOptions }} />
      </div>
    );
  }
}

export default Charts;
