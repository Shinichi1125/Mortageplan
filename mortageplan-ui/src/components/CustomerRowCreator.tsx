import React from 'react';
import CustomerData from '../interfaces/CustomerData.interface';

class CustomerRowCreator extends React.Component<CustomerData>{
  render(){
    let customer = this.props; 

    return(
      <div>
        <p>displaying the row creator...</p>
        
      </div>
    )
  }
}

export default CustomerRowCreator; 

/*
 <p>
          {customer.customerName}
          {customer.totalLoan}
          {customer.interest}
          {customer.years}
        </p>
*/