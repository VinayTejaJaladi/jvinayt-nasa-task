import axios from 'axios'
import {Component} from 'react'
import './index.css'

class Home extends Component {
  state = {inputId: ''}

  onChangeInput = e => {
    this.setState({inputId: e.target.value})
  }

  onClickSubmit = () => {
    const {inputId} = this.state
    const {history} = this.props
    history.push(`/${inputId}`)
  }

  onClickRandomButton = async () => {
    try {
      const response = await axios.get(
        'https://api.nasa.gov/neo/rest/v1/neo/browse?api_key=DEMO_KEY',
      )
      const asteroidsList = response.data.near_earth_objects
      const lenOfList = asteroidsList.length
      const randomNumber = Math.floor(Math.random() * lenOfList)
      const asteroidId = asteroidsList[randomNumber].id
      const {history} = this.props
      history.push(`/${asteroidId}`)
    } catch (error) {
      console.log(error.message)
    }
  }

  render() {
    return (
      <div className="bg-container">
        <form
          className="form-container"
          onSubmit={e => {
            e.preventDefault()
          }}
        >
          <input
            type="text"
            placeholder="Enter Asteroid Id"
            onChange={this.onChangeInput}
          />
          <button
            type="button"
            className="submit-button"
            onClick={this.onClickSubmit}
          >
            Submit
          </button>
          <button
            type="button"
            className="random-button"
            onClick={this.onClickRandomButton}
          >
            Random Asteroid
          </button>
        </form>
      </div>
    )
  }
}

export default Home
