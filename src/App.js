import React, { createContext, useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Home from './Components/Home/Home';
import Header from './Components/Header/Header';
import Login from './Components/Login/Login';
import NotFound from './Components/NotFound/NotFound';
import PrivateRoute from './Components/PrivateRoute/PrivateRoute';
import Admin from './Components/Admin/Admin';
import Deals from './Components/Deals/Deals';
import CheckOut from './Components/CheckOut/CheckOut';
import PlaceOrder from './Components/PlaceOrder/PlaceOrder';
import Orders from './Components/Orders/Orders';



export const UserContext = createContext();

function App() {
  const [loggedInUser, setLoggedInUser] = useState({});
  return (
    <UserContext.Provider value={[loggedInUser, setLoggedInUser]} >
      <Router>
        <Switch>
          <Route exact path="/">
            <Header></Header>
            <Home />
          </Route>
          <Route path="/home">
            <Header></Header>
            <Home />
          </Route>
          <Route path="/deals">
            <Header></Header>
            <Deals></Deals>
          </Route>
          <Route exact path="/orders">
            <Header></Header>
            <Orders/>
          </Route>
          <Route path="/login">
            <Header></Header>
            <Login></Login>
          </Route>
          <Route exact path="/checkOut/:id">
            <Header></Header>
            <CheckOut></CheckOut>
          </Route>
          <Route exact path="/checkOut/:id/placeOrder">
            <Header></Header>
            <PlaceOrder></PlaceOrder>
          </Route>
          <Route path="/admin">
            <Admin></Admin>
          </Route>
          <Route path="*">
            <Header></Header>
            <NotFound></NotFound>
          </Route>
        </Switch>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
