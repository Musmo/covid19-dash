import React, {useState, useEffect} from 'react'
import numeral from "numeral"
import { Line } from "react-chartjs-2"
import "./Plot.css"
const options = {
    legend: {
      display: false,
    },
    elements: {
      point: {
        radius: 0,
      },
    },
    maintainAspectRatio: false,
    tooltips: {
      mode: "index",
      intersect: false,
      callbacks: {
        label: function (tooltipItem, data) {
          return numeral(tooltipItem.value).format("+0,0");
        },
      },
    },
    scales: {
      xAxes: [
        {
          type: "time",
          time: {
            format: "MM/DD/YY",
            tooltipFormat: "ll",
          },
        },
      ],
      yAxes: [
        {
          gridLines: {
            display: false,
          },
          ticks: {
            // Include a dollar sign in the ticks
            callback: function (value, index, values) {
              return numeral(value).format("0a");
            },
          },
        },
      ],
    },
  };
  
  const computeHistoricalData = (data, type) => {
    const chartData = [];
    let lastValue;
    for(let date in data[type]){
        
        if(lastValue){
            console.log("if")
            const newData = {
                x: date,
                y: data[type][date] - lastValue
            }
            chartData.push(newData);
        }
        lastValue = data[type][date]
    }
    console.log("CHART DATA >>>>",chartData);
    return chartData;
}
function Plot({type = "cases"}) {

    const[chartData, setChartData] = useState({});


    useEffect(() => {
        const fetchData = async () => {
            await fetch("https://disease.sh/v3/covid-19/historical/all?lastdays=120")
                .then(response => response.json())
                .then(data => {
                    console.log("PlotData >>>> ", data)
                    //sava historical data
                    setChartData(computeHistoricalData(data, type))
                })
            
        }

        fetchData();
    }, [type])
    


  
    return (
        <div>
         
            {console.log(chartData)}
            {chartData?.length > 0 && (
                
                <Line 
                    data ={{ datasets: [{
                                    data: chartData,
                                    backgroundColor: "rgba(204, 16, 52, 0.5)",
                                    borderColor: "#CC1034",
                                }]
                        }} 
                        options={options} 
                />
            )} 
        </div>
    )
}

export default Plot
