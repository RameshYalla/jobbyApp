import {Link} from 'react-router-dom'
import {FaStar} from 'react-icons/fa'
import {IoLocationSharp} from 'react-icons/io5'
import {BsBriefcaseFill} from 'react-icons/bs'
import './index.css'

const JobItem = props => {
  const {item} = props

  return (
    <Link to={`/jobs/${item.id}`}>
      <li className="j-card">
        <div className="head">
          <img
            className="j-img"
            src={item.company_logo_url}
            alt="company logo"
          />
          <div>
            <h2 className="title">{item.title}</h2>
            <div className=" head">
              <FaStar className="star" />
              <p className="no-margin">{item.rating}</p>
            </div>
          </div>
        </div>
        <div className="loc display-row">
          <div className="display-row">
            <IoLocationSharp />
            <p className="no-margin">{item.location}</p>
          </div>
          <div className="display-row">
            <BsBriefcaseFill />
            <p className="no-margin">{item.employment_type}</p>
          </div>
          <p className="package">{item.package_per_annum}</p>
        </div>
        <hr className="hr" />
        <h2>Description</h2>
        <p>{item.job_description}</p>
      </li>
    </Link>
  )
}

export default JobItem
