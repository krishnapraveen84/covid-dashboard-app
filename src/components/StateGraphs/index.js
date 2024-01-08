import './index.css'
import {useState, useEffect} from 'react'
import Loader from 'react-loader-spinner'
import {
  LineChart,
  XAxis,
  YAxis,
  CartesianGrid,
  CartesianAxis,
  Tooltip,
  Legend,
  Line,
  BarChart,
  Bar,
  Cell,
  LabelList,
} from 'recharts'
const diffStatus = {
  inProgress: 'Loading',
  success: 'success',
  fail: 'fail',
}
const StateGraphs = props => {
  const {code, currentCard} = props
  const activeCard = currentCard.toLowerCase()
  console.log(activeCard)
  const [timeLineData, setTimeLineData] = useState({
    status: diffStatus.inProgress,
    dataList: [],
  })

  useEffect(async () => {
    const response = await fetch(
      `https://apis.ccbp.in/covid19-timelines-data/${code}`,
    )
    const data = await response.json()

    if (response.ok) {
      setTimeLineData({
        status: diffStatus.success,
        dataList: data,
      })
    }
  }, [])
  const renderLoader = () => (
    <div data-testid="homeRouteLoader" className="loader-container">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )
  const renderSuccessView = () => {
    const {dataList, status} = timeLineData
    const {dates} = dataList[code]
    const allDates = Object.keys(dataList[code].dates)
    const getDate = fullDate => {
      const newDate = new Date(fullDate)
      const axisDate = `${newDate.toLocaleString('en-US', {
        month: 'short',
      })} ${newDate.getDate()}`
      return axisDate
    }
    const allDatesData = allDates.map(each => ({
      date: getDate(each),
      count: dataList[code].dates[each].total[activeCard],
    }))
    const tenDateStats = allDatesData.slice(0, 11)
    console.log(tenDateStats)
    const DataFormatter = number => {
      if (number > 1000 && number < 100000) {
        return `${(number / 100000).toFixed(2).toString()}k`
      } else if (number > 100000) {
        return `${(number / 100000).toFixed(2).toString()}L`
      }
      return number.toString()
    }
    return (
      <div className="district-bar-graph">
        <div className="bar-graph-sm">
          <BarChart
            width={600}
            height={260}
            data={tenDateStats}
            margin={{top: 16}}
          >
            <YAxis
              tickFormatter={DataFormatter}
              tickLine={false}
              axisLine={false}
              dataKey="count"
              hide
            />
            <XAxis
              tickSize={1}
              interval={0}
              tickLine={false}
              axisLine={false}
              dataKey="date"
              fontSize={13}
            />

            <Bar
              mirror={true}
              dataKey="count"
              fill="#9A0E31"
              radius={[6, 6, 0, 0]}
              barSize={35}
              style={{padding: 20}}
            >
              <LabelList
                formatter={DataFormatter}
                position="top"
                fill="#9A0E31"
                fontSize={13}
              />
            </Bar>
          </BarChart>
        </div>
      </div>
    )
  }
  const renderDiffViews = () => {
    const {status} = timeLineData

    switch (status) {
      case diffStatus.inProgress:
        return renderLoader()
      case diffStatus.success:
        return renderSuccessView()
    }
  }
  return <div className="state-graph-container">{renderDiffViews()}</div>
}

export default StateGraphs
