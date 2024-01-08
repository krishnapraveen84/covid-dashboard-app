import './App.css'
import Home from './components/Home'
// import About from './components/About'
import State from './components/State'

import {Switch, Route} from 'react-router-dom'

const App = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route exact path="/state/:id" component={State} />
  </Switch>
)

export default App
// <Route exact path="/about" components={About} />
//
