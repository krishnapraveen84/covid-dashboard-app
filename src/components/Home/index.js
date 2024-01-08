import './index.css'
import {BsSearch} from 'react-icons/bs'
import {FcGenericSortingAsc} from 'react-icons/fc'
import {FcGenericSortingDesc} from 'react-icons/fc'
import {BiChevronRightSquare} from 'react-icons/bi'
import {Component} from 'react'
import Header from '../Header'
import Footer from '../Footer'
import Stats from '../Stats'

import {Link} from 'react-router-dom'
import Loader from 'react-loader-spinner'
const apiStates = {
  inProgress: 'Loading',
  success: 'SUCCESS',
  fail: 'FAILURE',
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

class Home extends Component {
  state = {
    status: apiStates.inProgress,
    stateWiseData: [],
    stats: [],
    searchInput: '1235',
  }
  componentDidMount = () => {
    this.getStateWiseData()
  }

  getStateWiseData = async () => {
    const apiUrl = 'https://apis.ccbp.in/covid19-state-wise-data'
    const response = await fetch(apiUrl)
    const data = await response.json()
    const listOfKeys = Object.keys(data)
    const TotalStats = statesList.map(each => data[each.state_code].total)
    const stateNameGetter = code => {
      for (const state of statesList) {
        if (state.state_code === code) {
          return state.state_name
        }
      }
    }
    const newData = statesList.map(each => ({
      stateName: stateNameGetter(each.state_code),
      districts: data[each.state_code].districts,
      total: data[each.state_code].total,
    }))

    if (response.ok) {
      this.setState({
        stateWiseData: newData,
        stats: TotalStats,
        status: apiStates.success,
      })
    }
  }

  renderLoader = () => (
    <div data-testid="homeRouteLoader" className="loader-container">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )
  onToggleAccedning = () => {
    const {stateWiseData} = this.state
    const sortedData = stateWiseData.sort((a, b) => {
      if (a.stateName < b.stateName) {
        return -1
      }
      if (a.stateName > b.stateName) {
        return 1
      }
      return 0
    })
    this.setState({stateWiseData: sortedData})
  }
  onToggleDecending = () => {
    const {stateWiseData} = this.state
    this.setState({stateWiseData: stateWiseData.sort().reverse()})
  }

  renderCovidData = () => {
    const {stats, stateWiseData} = this.state

    return (
      <div className="total-stats-container">
        <Stats TotalStats={stats} />
        <div className="state-wise-data-div">
          <ul className="data-col-names">
            <li
              data-testid="stateWiseCovidDataTable"
              className="sorting-state-div"
            >
              <p className="state-name">States/UT</p>
              <button
                data-testid="ascendingSort"
                onClick={this.onToggleAccedning}
                className="sorting-btn"
              >
                <FcGenericSortingAsc className="sort-icons" />
              </button>
              <button
                data-testid="descendingSort"
                onClick={this.onToggleDecending}
                className="sorting-btn"
              >
                <FcGenericSortingDesc className="sort-icons" />
              </button>
            </li>
            <li className="stats-names">
              <p className="data-name">Confirmed</p>
              <p className="data-name">Active</p>
              <p className="data-name">Recovered</p>
              <p className="data-name">Deceased</p>
              <p className="data-name">Population</p>
            </li>
          </ul>

          <ul className="data-col-values">
            {stateWiseData.map(each => (
              <li className="data-values-div" key={each.stateName}>
                <div className="state-name-card">
                  <p className="state-name">{each.stateName}</p>
                </div>
                <div className="stats-names">
                  <p className="data-name confirmed">{each.total.confirmed}</p>
                  <p className="data-name active">
                    {each.total.confirmed -
                      (each.total.recovered + each.total.deceased)}
                  </p>
                  <p className="data-name recovered">{each.total.recovered}</p>
                  <p className="data-name Deceased">{each.total.deceased}</p>
                  <p className="data-name population">{each.total.deceased}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <Footer />
      </div>
    )
  }
  onChangeSearchInput = event => {
    if (event.target.value === '') {
      this.setState({searchInput: '1235'})
    } else {
      this.setState({searchInput: event.target.value})
    }
  }
  renderDiffViwes = () => {
    const {status} = this.state
    switch (status) {
      case apiStates.inProgress:
        return this.renderLoader()
      case apiStates.success:
        return this.renderCovidData()
      case apiStates.fail:
        return <h1>Failed!</h1>
      default:
        return null
    }
  }

  render() {
    const {searchInput} = this.state
    const searchList = statesList.filter(each =>
      each.state_name
        .toLocaleLowerCase()
        .includes(searchInput.toLocaleLowerCase()),
    )
    // console.log(searchList)
    return (
      <div className="home-bg-container">
        <Header />
        <div className="home-content-container">
          <div className="search-bar">
            <BsSearch className="search-icon" />
            <input
              onChange={this.onChangeSearchInput}
              className="search-input"
              placeholder="Enter the State"
              type="search"
            />
          </div>
          {searchList.length === 0 ? (
            this.renderDiffViwes()
          ) : (
            <ul className="search-result-container">
              {searchList.map(each => (
                <Link
                  to={`/state/${each.state_code}`}
                  className="links"
                  key={`${each.state_code}s}`}
                >
                  <li className="search-results">
                    <p className="search-result-name">{each.state_name}</p>
                    <div className="search-code-box">
                      <p className="search-result-code">{each.state_code}</p>
                      <BiChevronRightSquare className="search-code-icon" />
                    </div>
                  </li>
                </Link>
              ))}
            </ul>
          )}
        </div>
      </div>
    )
  }
}
export default Home
