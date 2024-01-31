import Cookies from 'js-cookie'
import {Route, withRouter} from 'react-router-dom'

const ProtectedRoute = props => {
  const {history} = props
  const JwtToken = Cookies.get('jwt_token')
  if (JwtToken === undefined) {
    history.replace('/login')
  }
  return <Route {...props} />
}

export default withRouter(ProtectedRoute)
