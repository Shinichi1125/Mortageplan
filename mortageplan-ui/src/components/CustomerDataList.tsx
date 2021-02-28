import React from 'react';
import DataService from '../api/DataService'; 
import CustomerData from '../interfaces/CustomerData.interface';
import CustomerRowCreator from './CustomerRowCreator';

class CustomerDataList extends React.Component {

  state = {
    allCustomers: new Array<CustomerData>()
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
        {this.state.allCustomers.map((customer)=>
          <CustomerRowCreator 
            key = {customer.id}
            id={customer.id}
            customer={customer.customer}
            totalLoan={customer.totalLoan}
            interest={customer.interest}
            years={customer.years}
          />)}
      </div>
    )
  }
}

export default CustomerDataList; 

