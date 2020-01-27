import React from "react";

import { BrowserRouter as Router, Route } from "react-router-dom";

import Join from './containers/Join/Join';
import Chat from "./containers/Chat/Chat";

const App = () => (
  <Router>
    <Route path="/" exact component={Join} />
    <Route path="/chat" component={Chat} />
  </Router>
);

export default App;