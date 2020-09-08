import React from "react";
import NavHeaderComponent from "./components/NavHeaderComponent";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Transaction from "./pages/Transaction";

function App() {
  return (
    <Router>
      <div>
        <NavHeaderComponent />
        <br />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/transactions">
            <Transaction />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

// You can think of these components as "pages"
// in your app.

function Home() {
  return (
    <div>
      <h2>Bem vindo aos Desafios e Trabalhos práticos IGTI Bootcamp</h2>
    </div>
  );
}

export default App;