import {withRouter, Link} from 'react-router-dom'
import {IoExitOutline} from 'react-icons/io5'
import {IoMdHome} from 'react-icons/io'
import {BsBriefcaseFill} from 'react-icons/bs'
import Cookies from 'js-cookie'
import './index.css'

const Header = props => {
  const {history} = props
  const onClickLogout = () => {
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <nav className="header">
      <Link to="/">
        <li>
          <img
            className="logo"
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
          />
        </li>
      </Link>
      <li>
        <ul className="li">
          <Link to="/">
            <li className="p">Home</li>
            <IoMdHome className="i" />
          </Link>
          <Link to="/jobs">
            <li className="p">Jobs</li>
            <BsBriefcaseFill className="i" />
          </Link>
        </ul>
      </li>
      <li>
        <button onClick={onClickLogout} type="button" className="p logout-btn">
          Logout
        </button>
        <IoExitOutline onClick={onClickLogout} className="i" />
      </li>
    </nav>
  )
}

export default withRouter(Header)
