import React from 'react';
import './App.css';
import {Route, Switch} from 'react-router-dom';
import CustomerDataList from './components/CustomerDataList';
import CreateCustomer from './components/CreateCustomer';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={CustomerDataList}/>
        <Route exact path="/customer/create" component={CreateCustomer}/>
      </Switch>
    </div>
  );
}

export default App;
