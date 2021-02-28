import React from 'react';
import DataService from '../api/DataService'; 
import CustomerRowCreator from './CustomerRowCreator';
import { Link } from 'react-router-dom';

class CustomerDataList extends React.Component {

  state = {
    allCustomers: []
  }

  updatePage(){
    DataService.retrieveAllCustomerData()
    .then(res => {
      this.setState({
        allCustomers:[...res.data]
      }) 
    })
  }

  componentDidMount(){
    this.updatePage()
  }  
  
  render(){
    return(
      <div>
        <p>CustomerDataList</p>
        <Link to='/customer/create'>+ New Customer</Link>
        <table align='center'>
          <thead>
            <tr>
              <th>ID</th>
              <th>Customer Name</th>
              <th>Total Loan</th>
              <th>Interest</th>
              <th>Years</th>
              <th>Monthly Payment</th>
            </tr>
          </thead>
          <tbody>
            {this.state.allCustomers.map((customer)=>
            <CustomerRowCreator 
              key = {customer.id}
              id={customer.id}
              customer={customer.customer}
              totalLoan={customer.totalLoan}
              interest={customer.interest}
              years={customer.years}
            />)}
          </tbody>
        </table>
        
      </div>
    )
  }
}

export default CustomerDataList; 

