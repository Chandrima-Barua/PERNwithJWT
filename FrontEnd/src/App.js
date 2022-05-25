import { BrowserRouter, Route, Switch } from "react-router-dom";
import Overview from "./components/Overview";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import Register from "./components/Register";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <Login/>
        </Route>
        <Route path="/register">
          <Register/>
        </Route>
        <Route path="/dashboard">
          <Navbar/>
          <Overview/>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
