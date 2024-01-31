import {Link} from 'react-router-dom'
import Header from '../Header'
import './index.css'

const Home = props => {
  const {history} = props
  const onFindJobs = () => {
    history.replace('/jobs')
  }
  return (
    <>
      <Header />
      <div className="home">
        <h1 className="h1">Find The Job That Fits Your Life</h1>
        <p className="h2">
          Millions of people are searching for jobs, salary information, company
          reviews. Find the job that fits your abilities and potential
        </p>
        <Link to="/jobs">
          <button onClick={onFindJobs} type="button" className="jobs-btn">
            Find Jobs
          </button>
        </Link>
      </div>
    </>
  )
}

export default Home
