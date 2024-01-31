import {Component} from 'react'
import {withRouter} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import {BsSearch} from 'react-icons/bs'
import Cookies from 'js-cookie'
import Header from '../Header'
import JobItem from '../JobItem'

import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

class Jobs extends Component {
  state = {
    employmentType: [],
    sPackage: 0,
    searchInput: '',
    userDetails: {},
    isLoading: true,
    jobsList: [],
    profileFailure: false,
    jobsFailure: false,
  }

  componentDidMount() {
    this.getUserDetails()
    this.getJobsList()
  }

  getUserDetails = async () => {
    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/profile'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      this.setState({userDetails: data.profile_details})
    } else {
      this.setState({profileFailure: true})
    }
  }

  getJobsList = async () => {
    const {searchInput, sPackage, employmentType} = this.state
    const employment = employmentType.join(',')
    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/jobs?employment_type=${employment}&minimum_package=${sPackage}&search=${searchInput} `
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      this.setState({jobsList: data.jobs, jobsFailure: false, isLoading: false})
    } else {
      this.setState({jobsFailure: true})
    }
  }

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  onChangeCheck = event => {
    const {employmentType} = this.state
    const newType = event.target.value
    if (employmentType.includes(newType)) {
      this.setState(
        prevState => ({
          employmentType: [
            ...prevState.employmentType.filter(each => each !== newType),
          ],
        }),
        this.getJobsList,
      )
    } else {
      this.setState(
        prevState => ({
          employmentType: [...prevState.employmentType, event.target.value],
        }),
        this.getJobsList,
      )
    }
  }

  changeSalaryFilter = event => {
    this.setState({sPackage: event.target.value}, this.getJobsList)
  }

  renderProfile = () => {
    const {userDetails} = this.state
    return (
      <div className="userCard">
        <img
          src={userDetails.profile_image_url}
          alt="profile
        "
        />
        <h2 className="name">{userDetails.name}</h2>
        <p className="bio">{userDetails.short_bio}</p>
      </div>
    )
  }

  renderProfileFailure = () => (
    <div className="p-failure">
      <button
        onClick={this.getUserDetails}
        type="button"
        className="logout-btn"
      >
        Retry
      </button>
    </div>
  )

  renderInputBox = c => {
    const {searchInput} = this.state
    return (
      <div className={c}>
        <input
          value={searchInput}
          onChange={this.onChangeSearchInput}
          placeholder="Search"
          className="searchInput"
          type="search"
        />
        <button
          className="s-btn"
          type="button"
          data-testid="searchButton"
          onClick={this.getJobsList}
        >
          .<BsSearch className="search-icon" />
        </button>
      </div>
    )
  }

  renderJobsList = () => {
    const {jobsList, jobsFailure} = this.state
    if (jobsFailure === true) {
      return (
        <div className="no-jobs">
          <img
            className="f-img"
            src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
            alt="failure view"
          />
          <h1>Oops! Something Went Wrong</h1>
          <p>We cannot seem to find the page you are looking for</p>
          <button
            onClick={this.getJobsList}
            type="button"
            className="logout-btn"
          >
            Retry
          </button>
        </div>
      )
    }
    return (
      <ul className="ul">
        {jobsList.map(each => (
          <JobItem key={each.id} item={each} />
        ))}
      </ul>
    )
  }

  renderNoJobs = () => (
    <div className="no-jobs">
      <img
        className="f-img"
        src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
        alt="no jobs"
      />
      <h1>No Jobs Found</h1>
      <p>We could not find any jobs. Try other filters</p>
    </div>
  )

  renderJobs = () => {
    const {profileFailure, jobsList} = this.state
    return (
      <div className="jobs">
        <div className="left">
          {profileFailure ? this.renderProfileFailure() : this.renderProfile()}
          <hr className="hr" />
          <h2>Type of Employment</h2>
          <ul className="ul">
            {employmentTypesList.map(each => (
              <li key={each.employmentTypeId} className="filter">
                <input
                  onChange={this.onChangeCheck}
                  className="check"
                  type="checkbox"
                  id={each.employmentTypeId}
                  value={each.employmentTypeId}
                />
                <label htmlFor={each.employmentTypeId}>{each.label}</label>
              </li>
            ))}
          </ul>
          <hr />
          <h2>Salary Range</h2>
          <ul className="ul">
            {salaryRangesList.map(each => (
              <li key={each.salaryRangeId} className="filter">
                <input
                  onChange={this.changeSalaryFilter}
                  name="salary"
                  value={each.salaryRangeId}
                  type="radio"
                  id={each.salaryRangeId}
                />
                <label htmlFor={each.salaryRangeId}>{each.label}</label>
              </li>
            ))}
          </ul>
        </div>

        {this.renderInputBox('s-inputBox-sm')}
        <div className="right">
          {this.renderInputBox('s-inputBox')}
          {jobsList.length === 0 ? this.renderNoJobs() : this.renderJobsList()}
        </div>
      </div>
    )
  }

  renderLoader = () => (
    <div className="loader-container x" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  render() {
    const {isLoading} = this.state
    return (
      <div className="bg">
        <Header />
        {isLoading ? this.renderLoader() : this.renderJobs()}
      </div>
    )
  }
}

export default withRouter(Jobs)
