import React, { useEffect, useState  } from 'react'
import { Grid } from '../Grid'
import { Chart } from '../Chart'
import './IntraDay.css'

const API = 'https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=IBM&interval=5min&outputsize=full&apikey=demo';

const formatGridData = (data) => {
  const array = [];

  if (data['Time Series (5min)']) {
    const keys = Object.keys(data['Time Series (5min)']);
    keys.forEach((key) => {
      const time = key
      const open = data['Time Series (5min)'][key]['1. open']
      const high = data['Time Series (5min)'][key]['2. high']
      const low = data['Time Series (5min)'][key]['3. low']
      const close = data['Time Series (5min)'][key]['4. close']
      const volume = data['Time Series (5min)'][key]['5. volume']

      array.push({ time, open, high, low, close, volume})
    })
  }

  return array
}

const formatChartData = (data) => {
  const series = {
    time: [],
    open: [],
    close: [],
    high: [],
    low: [],
    volume: []
  };

  if (data['Time Series (5min)']) {
    const keys = Object.keys(data['Time Series (5min)']);
    keys.forEach((key) => {
      series.time.push(key)
      series.open.push(parseFloat(data['Time Series (5min)'][key]['1. open']))
      series.high.push(parseFloat(data['Time Series (5min)'][key]['2. high']))
      series.low.push(parseFloat(data['Time Series (5min)'][key]['3. low']))
      series.close.push(parseFloat(data['Time Series (5min)'][key]['4. close']))
      series.volume.push(parseFloat(data['Time Series (5min)'][key]['5. volume']))
    })
  }

  return series
}

const IntraDay = () => {
  const [intraDayData, setIntraDayData] = useState({});
  const [viewMode, setViewMode] = useState('table')

  useEffect(() => {
    fetch(API).then((response) => response.json())
    .then((data) => {
      setIntraDayData(data)
    });
  }, [])

  const hasData = intraDayData['Meta Data']

  if (hasData) {
    
    const rowData = formatGridData(intraDayData)
    const chartData = formatChartData(intraDayData)
    
    return (
      <>
        <div className='view-mode'>
          <button type="button" onClick={()=> setViewMode('table')}>Table view</button>
          <button type="button" onClick={()=> setViewMode('chart')}>Chart view</button>
        </div>
        <ul>
          <li>Symbol: {intraDayData['Meta Data']['2. Symbol']}</li>
          <li>Last Refreshed: {intraDayData['Meta Data']['3. Last Refreshed']}</li>
          <li>Time zone: {intraDayData['Meta Data']['6. Time Zone']}</li>
        </ul>
        {viewMode === 'table' && <Grid rowData={rowData} />}
        {viewMode === 'chart' && <Chart data={chartData} />}
      </>
    )
    
  }

  return null

  
}

export default IntraDay