import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import CustomerDataList from './components/CustomerDataList';
import CreateCustomer from './components/CreateCustomer';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" component={CustomerDataList}/>
          <Route exact path="/customer/create" component={CreateCustomer}/>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
