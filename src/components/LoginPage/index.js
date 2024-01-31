import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import './index.css'

class LoginPage extends Component {
  state = {username: '', password: '', error: false, errorMsg: ''}

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onSubmitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const {history} = this.props
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify({
        username,
        password,
      }),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      Cookies.set('jwt_token', data.jwt_token, {expires: 20})
      this.setState({username: '', password: '', error: false})
      history.replace('/')
    } else {
      this.setState({error: true, errorMsg: data.error_msg})
    }
  }

  render() {
    const token = Cookies.get('jwt_token')
    const {username, password, error, errorMsg} = this.state
    if (token !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <div className="login-bg">
        <form onSubmit={this.onSubmitForm} className="form">
          <img
            className="headingLogo"
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
          />
          <div className="input-box">
            <label htmlFor="username">USERNAME</label>
            <input
              onChange={this.onChangeUsername}
              type="text"
              id="username"
              value={username}
              placeholder="User name"
            />
          </div>
          <div className="input-box">
            <label htmlFor="password">PASSWORD</label>
            <input
              onChange={this.onChangePassword}
              type="password"
              id="password"
              value={password}
              placeholder="Password"
            />
          </div>
          <div className="btn-error">
            <button type="submit" className="login-btn">
              Login
            </button>
            {error && <p className="error">*{errorMsg}</p>}
          </div>
        </form>
      </div>
    )
  }
}

export default LoginPage
