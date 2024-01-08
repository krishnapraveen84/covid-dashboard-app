import './index.css'
import {useState, useEffect} from 'react'
import Header from '../Header'
import Loader from 'react-loader-spinner'
import StateGraphs from '../StateGraphs'
const diffStatus = {
  inProgress: 'Loading',
  success: 'success',
  fail: 'fail',
}
const statesList = [
  {
    state_code: 'AN',
    state_name: 'Andaman and Nicobar Islands',
  },
  {
    state_code: 'AP',
    state_name: 'Andhra Pradesh',
  },
  {
    state_code: 'AR',
    state_name: 'Arunachal Pradesh',
  },
  {
    state_code: 'AS',
    state_name: 'Assam',
  },
  {
    state_code: 'BR',
    state_name: 'Bihar',
  },
  {
    state_code: 'CH',
    state_name: 'Chandigarh',
  },
  {
    state_code: 'CT',
    state_name: 'Chhattisgarh',
  },
  {
    state_code: 'DN',
    state_name: 'Dadra and Nagar Haveli and Daman and Diu',
  },
  {
    state_code: 'DL',
    state_name: 'Delhi',
  },
  {
    state_code: 'GA',
    state_name: 'Goa',
  },
  {
    state_code: 'GJ',
    state_name: 'Gujarat',
  },
  {
    state_code: 'HR',
    state_name: 'Haryana',
  },
  {
    state_code: 'HP',
    state_name: 'Himachal Pradesh',
  },
  {
    state_code: 'JK',
    state_name: 'Jammu and Kashmir',
  },
  {
    state_code: 'JH',
    state_name: 'Jharkhand',
  },
  {
    state_code: 'KA',
    state_name: 'Karnataka',
  },
  {
    state_code: 'KL',
    state_name: 'Kerala',
  },
  {
    state_code: 'LA',
    state_name: 'Ladakh',
  },
  {
    state_code: 'LD',
    state_name: 'Lakshadweep',
  },
  {
    state_code: 'MH',
    state_name: 'Maharashtra',
  },
  {
    state_code: 'MP',
    state_name: 'Madhya Pradesh',
  },
  {
    state_code: 'MN',
    state_name: 'Manipur',
  },
  {
    state_code: 'ML',
    state_name: 'Meghalaya',
  },
  {
    state_code: 'MZ',
    state_name: 'Mizoram',
  },
  {
    state_code: 'NL',
    state_name: 'Nagaland',
  },
  {
    state_code: 'OR',
    state_name: 'Odisha',
  },
  {
    state_code: 'PY',
    state_name: 'Puducherry',
  },
  {
    state_code: 'PB',
    state_name: 'Punjab',
  },
  {
    state_code: 'RJ',
    state_name: 'Rajasthan',
  },
  {
    state_code: 'SK',
    state_name: 'Sikkim',
  },
  {
    state_code: 'TN',
    state_name: 'Tamil Nadu',
  },
  {
    state_code: 'TG',
    state_name: 'Telangana',
  },
  {
    state_code: 'TR',
    state_name: 'Tripura',
  },
  {
    state_code: 'UP',
    state_name: 'Uttar Pradesh',
  },
  {
    state_code: 'UT',
    state_name: 'Uttarakhand',
  },
  {
    state_code: 'WB',
    state_name: 'West Bengal',
  },
]
const State = props => {
  const [stateData, setStateData] = useState({
    status: diffStatus.inProgress,
    data: [],
  })
  const [activeCard, setActiveCard] = useState('Confirmed')

  const {match} = props
  const {params} = match
  const {id} = params

  useEffect(async () => {
    const response = await fetch(`https://apis.ccbp.in/covid19-state-wise-data`)
    const resData = await response.json()
    const stateNameGetter = code => {
      for (const state of statesList) {
        if (state.state_code === code) {
          return state.state_name
        }
      }
    }
    const newData = statesList.map(each => ({
      stateName: stateNameGetter(each.state_code),
      stateCode: each.state_code,
      districts: resData[each.state_code].districts,
      total: resData[each.state_code].total,
    }))
    const filtredData = newData.find(each => each.stateCode === id)

    if (response.ok) {
      setStateData({
        status: diffStatus.success,
        data: filtredData,
      })
    }
  }, [])

  const renderLoader = () => (
    <div data-testid="homeRouteLoader" className="loader-container">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )
  const onToggelActiveCard = name => {
    setActiveCard(name)
  }
  const renderSuccessView = () => {
    const {data} = stateData
    const {districts, stateName, stateCode, total} = data
    const districtsNames = Object.keys(districts)

    return (
      <div className="state-content-container">
        <div className="wrapper-container">
          <div className="col-wrapper-1">
            <p className="name-card">{stateName}</p>
            <p className="para">Last updated on march 28th 2021</p>
          </div>
          <div className="col-wrapper-2">
            <p className="tested-name">Tested</p>
            <p className="tested-value">{total.tested}</p>
          </div>
        </div>
        <div className="stats-container">
          <button
            onClick={() => onToggelActiveCard('Confirmed')}
            className={`stat-btn confirmed ${
              activeCard === 'Confirmed' ? 'click-confirmed' : ''
            }`}
          >
            <p className="stat-name">Confirmed</p>
            <img
              className="card-img"
              src="https://res.cloudinary.com/dnwwyvtjx/image/upload/v1704263764/check-mark_1confirm_bfxayb.png"
              alt="country wide confirmed cases pic"
            />
            <p className="count">{total.confirmed}</p>
          </button>
          <button
            onClick={() => onToggelActiveCard('Active')}
            className={`stat-btn active ${
              activeCard === 'Active' ? 'click-active' : ''
            }`}
          >
            <p className="stat-name">Active</p>
            <img
              className="card-img"
              src="https://res.cloudinary.com/dnwwyvtjx/image/upload/v1704263764/protection_2protect_a5jx7m.png"
              alt="country wide active cases pic"
            />
            <p className="count">
              {total.confirmed - (total.recovered + total.deceased)}
            </p>
          </button>
          <button
            onClick={() => onToggelActiveCard('Recovered')}
            className={`stat-btn recovered ${
              activeCard === 'Recovered' ? 'click-recovered' : ''
            }`}
          >
            <p className="stat-name">Recovered</p>
            <img
              className="card-img"
              src="https://res.cloudinary.com/dnwwyvtjx/image/upload/v1704263764/recovered_1recoved_aowj9p.png"
              alt="country wide recovered cases pic"
            />
            <p className="count">{total.recovered}</p>
          </button>
          <button
            onClick={() => onToggelActiveCard('Deceased')}
            className={`stat-btn Deceased ${
              activeCard === 'Deceased' ? ' click-deceased' : ''
            }`}
          >
            <p className="stat-name">Deceased</p>
            <img
              className="card-img"
              src="https://res.cloudinary.com/dnwwyvtjx/image/upload/v1704263764/breathing_taou1u.png"
              alt="country wide deceased cases pic"
            />
            <p className="count">{total.deceased}</p>
          </button>
        </div>
        <div className="district-wise-data">
          <h1 className={`district-heading ${activeCard.toLowerCase()}`}>
            Top Districts
          </h1>
          <ul className="district-data-list">
            {districtsNames.map(each => (
              <li key={each} className="district-stat">
                <p className="district-stat-count">
                  {activeCard === 'Active'
                    ? districts[each].total.confirmed -
                      (districts[each].total.recovered +
                        districts[each].total.deceased)
                    : districts[each].total[activeCard.toLowerCase()]}
                  <span className="district-name">{each}</span>
                </p>
              </li>
            ))}
          </ul>
          <StateGraphs code={id} currentCard={activeCard} />
        </div>
      </div>
    )
  }

  const renderDiffrentViews = () => {
    const {status} = stateData
    switch (status) {
      case diffStatus.inProgress:
        return renderLoader()
      case diffStatus.success:
        return renderSuccessView()
    }
  }
  return (
    <div className="state-container">
      <Header />
      {renderDiffrentViews()}
    </div>
  )
}

export default State
