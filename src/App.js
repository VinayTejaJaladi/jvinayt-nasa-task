import {BrowserRouter, Switch, Route} from 'react-router-dom'
import Home from './components/Home'
import AsteroidPage from './components/AsteroidPage'
import './App.css'

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/:id" component={AsteroidPage} />
    </Switch>
  </BrowserRouter>
)
export default App
