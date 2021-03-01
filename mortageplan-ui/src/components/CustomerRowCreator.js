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

  deleteCustomer(id){
    let deleteConfirmed = window.confirm("Are you sure you want to delete this?");
    if(deleteConfirmed){
      DataService.deleteCustomer(id);
      window.location.reload(true);
    }
  }

  render(){
    let customer = this.props; 
    let interest = 100 * customer.interest;
    let monthlyPayment = this.state.monthlyPayment;
    monthlyPayment = Math.round((monthlyPayment + Number.EPSILON) * 100) / 100

    return(
        <tr>
          <td>{customer.id}</td> 
          <td>{customer.customer}</td> 
          <td>{customer.totalLoan}</td>
          <td>{interest}%</td> 
          <td>{customer.years}</td>
          <td>€{monthlyPayment}</td>
          <button 
            onClick={() => this.deleteCustomer(customer.id)}
            className="action-button danger"
          >
            Delete
          </button>
        </tr>   
    )
  }
}

export default CustomerRowCreator; 

