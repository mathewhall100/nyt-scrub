import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Articles from "./pages/Articles";
import Detail from "./pages/Detail";
import NoMatch from "./pages/NoMatch";
import Nav from "./components/Nav";

const App = () => (
  <Router>
    <div>
      <Nav />
      {/* like a switch statement - only allows one route to match */}
      <Switch> 
        <Route exact path="/" component={Articles} />
        <Route exact path="/books" component={Articles} />
        <Route exact path="/books/:id" component={Detail} />
        <Route component={NoMatch} /> 
      </Switch>
    </div>
  </Router>
);

export default App;
