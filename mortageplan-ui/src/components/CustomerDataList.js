import React from 'react';
import DataService from '../api/DataService'; 
import CustomerRowCreator from './CustomerRowCreator';
import { Link } from 'react-router-dom';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';

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
        <h1>Customer Data List</h1>
        <Link to='/customer/create'>
          <Button>
            + New Customer
          </Button>      
        </Link>
        <br/><br/>
        <Table align='center' striped bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>Customer Name</th>
              <th>Total Loan</th>
              <th>Interest</th>
              <th>Years</th>
              <th>Monthly Payment</th>
              <th>Delete Button</th>
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
        </Table>      
      </div>
    )
  }
}

export default CustomerDataList; 
