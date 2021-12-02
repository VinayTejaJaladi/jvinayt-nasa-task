import {Component} from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'
import Loader from 'react-loader-spinner'
import './index.css'

const apiConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  loading: 'LOADING',
  failure: 'FAILURE',
}

class AsteroidPage extends Component {
  state = {asteroidData: {}, errMsg: '', apiStatus: apiConstants.initial}

  componentDidMount() {
    this.getAsteroidData()
  }

  getAsteroidData = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    try {
      this.setState({apiStatus: apiConstants.loading})
      const url = `https://api.nasa.gov/neo/rest/v1/neo/${id}?api_key=EpfCcYM1urBY3OuUgybswEN6TeR1uiThsauA28bK`
      const response = await axios.get(url)
      const asteroidData = {
        name: response.data.name,
        nasaJplUrl: response.data.nasa_jpl_url,
        isHazardousAsteroid: response.data.is_potentially_hazardous_asteroid,
      }
      this.setState({asteroidData, apiStatus: apiConstants.success})
    } catch (error) {
      console.log(error.message)
      this.setState({errMsg: error.message, apiStatus: apiConstants.failure})
    }
  }

  renderFailureView = () => {
    const {errMsg} = this.state
    return (
      <div className="failure-container">
        <p className="error-display">{errMsg}</p>
        <Link to="/" className="go-to">
          Go to Main Page
        </Link>
      </div>
    )
  }

  renderLoadingView = () => (
    <div className="loader-container">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderSuccessView = () => {
    const {asteroidData} = this.state
    const {name, nasaJplUrl, isHazardousAsteroid} = asteroidData

    return (
      <div className="success-container">
        <div className="container-2">
          <h1 className="asteroid-name">{name}</h1>
          <p className="nasa-jpl-url">Nasa-Jpl-Url : </p>
          <a className="nasa-jpl-url" href={nasaJplUrl}>
            {nasaJplUrl}
          </a>
          <p className="is-hazardous">
            {isHazardousAsteroid
              ? 'Potentially Hazardous Asteroid'
              : 'Not Potentially Hazardous'}
          </p>
        </div>
      </div>
    )
  }

  render() {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case 'LOADING':
        return this.renderLoadingView()
      case 'SUCCESS':
        return this.renderSuccessView()
      case 'FAILURE':
        return this.renderFailureView()
      default:
        return null
    }
  }
}

export default AsteroidPage
