import React from 'react';
import DataService from '../api/DataService'; 

class CustomerRowCreator extends React.Component{

  state = {
    monthlyPayment: 0
  }

  updatePage(){
    DataService.getMonthlyPayments(this.props.id)
    .then(res => {
      this.setState({
        monthlyPayment:res.data
      }) 
    })
  }

  componentDidMount(){
    this.updatePage()
  }  

  render(){
    let customer = this.props; 
    let interest = 100 * customer.interest;
    let monthlyPayment = this.state.monthlyPayment;
    monthlyPayment = Math.round((monthlyPayment + Number.EPSILON) * 100) / 100

    return(
      <div>
        <p>
          ID: {customer.id}, 
          Customer Name: {customer.customer}, 
          Total Loan: €{customer.totalLoan}, 
          Interest: {interest}%, 
          Years: {customer.years}, 
          Monthly Payment: €{monthlyPayment}
        </p>
      </div>
    )
  }
}

export default CustomerRowCreator; 

