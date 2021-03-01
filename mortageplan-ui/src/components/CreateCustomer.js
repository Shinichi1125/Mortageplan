import React from 'react';
import DataService from '../api/DataService';
import { SMALL_INPUT_FIELD } from '../Constants';
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from 'formik'; 

class CreateCustomer extends React.Component{
  constructor(props){
    super(props)
    this.state = {
        customerId: this.props.match.params.id,
        customerData: {
          id: null,
          customer: '',
          totalLoan: 0, 
          interest: 0, 
          years: 0  
        }
      }
    this.validate = this.validate.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
    this.cancelCreate = this.cancelCreate.bind(this)
  }

  validate(values){
    let errors = {...values};
    let customer = errors.customer;
    let totalLoanEuro = errors.totalLoanEuro;
    let totalLoanCent = errors.totalLoanCent; 
    let interest = errors.interest;
    let years = errors.years; 

    if(customer===''){
      errors.customer = 'Enter a customer name';
    }
    if(!(totalLoanEuro >= 0 && totalLoanEuro <= 10000000)){
      errors.totalLoanEuro = 'Enter a valid amount of loan';
    }
    if(!(totalLoanCent >= 0 && totalLoanCent <= 99)){
      errors.totalLoanCent = 'Cents must be somewhere between 0-99';
    }
    if(!(interest >= 0 && interest <= 100)){
      errors.interest = 'Interest must be somewhere between 0-100%';
    }
    if(!(years >= 0 && years <= 100)){
      errors.years = 'The valid number of years is up to 100';
    }
  }

  cancelCreate(){
    this.props.history.push('/')
  }

  async onSubmit(values, formikBag){
    let rawCustomerData = {
      ...values,  
      id: this.state.customerData.id
    };
    await DataService.createCustomer(rawCustomerData)
    .then(() => this.props.history.push('/'))
    .catch((error) => {
      console.log(error.response.data.message);
      formikBag.setErrors({
        customer: error.response.data.message,
      })  
    })         
  }
  
  render(){
    let init = { id:null, customer:'', totalLoanEuro:0, totalLoanCent:0,  interest:0, years:0 }; 

    return(
      <div>
        <br/>
        <div className="object-details">
          <h2>Create Customer</h2>
          <div>
            <Formik
              initialValues={{init}}
              onSubmit={this.onSubmit}
              validate = {this.validate}
              validateOnChange = {false}
              validateOnBlur = {false}
              enableReinitialize={true}
            >
              {
                (props) => (
                  <Form>
                    <ErrorMessage name="customer" component="div" className="text-danger"/>
                    <fieldset className="form-group">
                      <Field type="text" name="customer" 
                        placeholder="Your name" size={SMALL_INPUT_FIELD}
                      />
                    </fieldset>
                    <ErrorMessage name="totalLoanEuro" component="div" className="text-danger"/>
                    <fieldset className="form-group">
                      <Field type="text" name="totalLoanEuro" 
                        placeholder="Total Loan (Euro)" size={SMALL_INPUT_FIELD}
                      />
                    </fieldset>
                    <ErrorMessage name="totalLoanCent" component="div" className="text-danger"/>
                    <fieldset className="form-group">
                      <Field type="text" name="totalLoanCent" 
                        placeholder="Total Loan (Cents)" size={SMALL_INPUT_FIELD}
                      />
                    </fieldset>
                    <ErrorMessage name="interest" component="div" className="text-danger"/>
                    <fieldset className="form-group">
                      <Field type="text" name="interest"
                        placeholder="Interest" size={SMALL_INPUT_FIELD}
                      />
                    </fieldset>
                    <ErrorMessage name="years" component="div" className="text-danger"/>
                    <fieldset className="form-group">
                      <Field type="text" name="years"
                        placeholder="Years" size={SMALL_INPUT_FIELD}
                      />
                    </fieldset>
                    <button className="btn btn-secondary" onClick={() => this.cancelCreate()}>Cancel</button>&nbsp;
                    <button type="submit" className="btn btn-primary">Save</button>
                  </Form>
                )
              }      
            </Formik>
          </div>
        </div>
      </div>
    )
  }
}

export default CreateCustomer; 