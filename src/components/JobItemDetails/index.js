import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {FaStar} from 'react-icons/fa'
import {IoLocationSharp} from 'react-icons/io5'
import {BsBriefcaseFill, BsBoxArrowUpRight} from 'react-icons/bs'
import Header from '../Header'
import './index.css'

class JobItemDetails extends Component {
  state = {jobDetails: {}, isLoading: true, apiError: false}

  componentDidMount() {
    this.getJobDetailsById()
  }

  getJobDetailsById = async () => {
    const jwtToken = Cookies.get('jwt_token')
    const {match} = this.props
    const {id} = match.params
    const url = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    const data = await response.json()

    if (response.ok === true) {
      this.setState({jobDetails: data, apiError: false, isLoading: false})
    } else {
      this.setState({apiError: true})
    }
  }

  renderApiError = () => (
    <div className="no-jobs">
      <img
        className="f-img"
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
      />
      <h1>Oops! Something Went Wrong</h1>
      <p>We cannot seem to find the page you are looking for</p>
      <button
        onClick={this.getJobDetailsById}
        type="button"
        className="logout-btn"
      >
        Retry
      </button>
    </div>
  )

  renderJobItemPage = () => {
    const {jobDetails, apiError} = this.state
    if (apiError === true) {
      return this.renderApiError()
    }
    return (
      <div className="job">
        <div className="j-card">
          <div className="head">
            <img
              className="j-img"
              src={jobDetails.job_details.company_logo_url}
              alt="job"
            />
            <div>
              <h2 className="title">{jobDetails.job_details.title}</h2>
              <div className=" head">
                <FaStar className="star" />
                <p className="no-margin">{jobDetails.job_details.rating}</p>
              </div>
            </div>
          </div>
          <div className="loc display-row">
            <div className="display-row">
              <IoLocationSharp />
              <p className="no-margin">{jobDetails.job_details.location}</p>
            </div>
            <div className="display-row">
              <BsBriefcaseFill />
              <p className="no-margin">
                {jobDetails.job_details.employment_type}
              </p>
            </div>
            <h2 className="package">
              {jobDetails.job_details.package_per_annum}
            </h2>
          </div>
          <hr className="hr" />
          <div className="disc">
            <h2>Description</h2>
            <a
              className="link"
              target="blank"
              href={jobDetails.job_details.company_website_url}
            >
              Visit <BsBoxArrowUpRight className="BsBoxArrowUpRight" />
            </a>
          </div>
          <p>{jobDetails.job_details.job_description}</p>
          <div>
            <h2>Skills</h2>
            <ul className="ul skills">
              {jobDetails.job_details.skills.map(each => (
                <li key={each.name} className="skill-item">
                  <img
                    className="skill-img"
                    src={each.image_url}
                    alt={each.name}
                  />
                  <p>{each.name}</p>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2>Life at Company</h2>
            <div className="life_at">
              <p className="life_at_para">
                {jobDetails.job_details.life_at_company.description}
              </p>
              <img
                className="life_at_img"
                src={jobDetails.job_details.life_at_company.image_url}
                alt="life at company"
              />
            </div>
          </div>
        </div>
        <h2>Similar Jobs</h2>
        <ul className="ul similar-jobs">
          {jobDetails.similar_jobs.map(each => (
            <li key={each.id} className=" s-card">
              <div className="head">
                <img
                  className="j-img s-img"
                  src={each.company_logo_url}
                  alt="similar job company logo"
                />
                <div>
                  <h2 className="title">{each.title}</h2>
                  <div className=" head">
                    <FaStar className="star" />
                    <p className="no-margin">{each.rating}</p>
                  </div>
                </div>
              </div>
              <div className="loc display-row">
                <div className="display-row">
                  <IoLocationSharp />
                  <p className="no-margin">{each.location}</p>
                </div>
                <div className="display-row">
                  <BsBriefcaseFill />
                  <p className="no-margin">{each.employment_type}</p>
                </div>
                <h2 className="package">{each.package_per_annum}</h2>
              </div>
              <h2>Description</h2>
              <p className="s-para ">{each.job_description}</p>
            </li>
          ))}
        </ul>
      </div>
    )
  }

  renderLoader = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  render() {
    const {isLoading} = this.state
    return (
      <div className="bg">
        <Header />
        <div className="bg2">
          {isLoading ? this.renderLoader() : this.renderJobItemPage()}{' '}
        </div>
      </div>
    )
  }
}

export default JobItemDetails
