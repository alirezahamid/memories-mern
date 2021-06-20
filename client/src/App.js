import { Container } from "@material-ui/core"
import { BrowserRouter, Switch, Route } from "react-router-dom"

import Navbar from "./components/Navbar/Navbar"
import Home from "./components/Home/Home"

const App = () => {
  return (
    <BrowserRouter>
      <Container>
        <Navbar />
        <Switch>
          <Route path="/" exact component={Home} />
          {/* <Route path="/auth" exact component={Auth} /> */}
        </Switch>
      </Container>
    </BrowserRouter>
  )
}

export default App
