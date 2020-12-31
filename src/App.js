import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { history } from '../src/lib/utils';

import Home from './views/Home';
import NotFoundPage from './views/NotFoundPage';
import Products from './views/Products';
import Footer from './components/Footer';
import Details from './views/Details';
import Sell from './views/Sell';
import Bill from './views/Bill';
import Register from './views/Register';
import Login from './views/Login';
import Profile from './views/Profile'
import LoginAdmin from './views/Admin/Login';
import HomeAdmin from './views/Admin/HomeAdmin';
import History from './views/Profile/History';
import Auctioning from './views/Auctioning';

function App() {

  return (
    <Router history={history}>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/products/:brand" component={Products} />
        <Route path="/products" component={Products} />
        <Route path="/details/:id" component={Details} />
        <Route path="/sell" component={Sell} />
        <Route path="/bill/:id" component={Bill} />
        <Route path="/profile" exact component={Profile} />
        <Route path="/auctioning" exact component={Auctioning}/>
        <Route path="/register" component={Register} />
        <Route path="/login" exact component={Login} />

        <Route path="/admin" exact component={LoginAdmin} />
        <Route path="/admin/manage" component={HomeAdmin} />

        <Route path="*" component={NotFoundPage} />
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;
