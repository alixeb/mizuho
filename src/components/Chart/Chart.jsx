import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official';

const Chart = ({ data }) => {
  
  const options = {
    chart: {
      type: 'spline'
    },
    title: {
      text: ''
    },
    xAxis: {
      categories: data.time,
    },
    series: [
      {
        name: 'Open',
        data: data.open
      },
      {
        name: 'Close',
        data: data.close
      },
      {
        name: 'High',
        data: data.high
      },
      {
        name: 'Low',
        data: data.low
      }
    ]
  }

  const optionsVolume = {
    title: {
      text: ''
    },
    xAxis: {
      categories: data.time,
    },
    series: [
      {
        name: 'Volume',
        data: data.volume,
        type: 'column'
      },
    ]
  }

  return (
    <>
      <div>
        <HighchartsReact highcharts={Highcharts} options={options} />
      </div>
      <div>
        <HighchartsReact highcharts={Highcharts} options={optionsVolume} />
      </div>
    </>
  )
}

export default Chart