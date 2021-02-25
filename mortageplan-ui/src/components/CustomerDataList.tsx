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
      console.log("res.data: ");
      console.log(res.data);
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
        
      </div>
    )
  }
}

export default CustomerDataList; 

/*
{this.state.allCustomers.map((customer)=>
          <CustomerRowCreator 
            key = {customer.id}
            id={customer.id}
            customerName={customer.customerName}
            totalLoan={customer.totalLoan}
            interest={customer.interest}
            years={customer.years}
          />)}
*/