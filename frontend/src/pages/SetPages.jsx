import { BrowserRouter, Route, Switch } from "react-router-dom"
import Home from "./Home"
import DeliveryNum from "./DeliveryNum"
import Intro from "./Intro"
import Board from "./Board"
import Signup from "./Signup"
import LogData from "./logData"

const SetPages = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/intro">
          <Intro />
        </Route>
        <Route path="/covid-19-delivery">
          <DeliveryNum />
        </Route>
        <Route path="/board">
          <Board />
        </Route>
        <Route path="/signup">
          <Signup />
        </Route>
        <Route path="/logdata">
          <LogData />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </BrowserRouter>
  )
}

export default SetPages
