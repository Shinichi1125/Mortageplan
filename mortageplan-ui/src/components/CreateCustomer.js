import React from 'react';
import DataService from '../api/DataService';
import { SMALL_INPUT_FIELD, TEXTAREA_COLS, TEXTAREA_ROWS } from '../Constants';
import { Formik, Form, Field, ErrorMessage } from 'formik'; 

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
    this.onSubmit = this.onSubmit.bind(this)
    this.cancelCreate = this.cancelCreate.bind(this)
  }

  cancelCreate(){
    this.props.history.push('/')
  }

  async onSubmit(values){
    let rawCustomerData = {
      ...values,  
      id: this.state.customerData.id
    };
    await DataService.createCustomer(rawCustomerData)
    .then(() => this.props.history.push('/'))       
  }
  
  render(){
    let init = { id:null, customer:'', totalLoanEuro:0, totalLoanCent:0,  interest:0, years:0 }; 

    return(
      <div>
      <div className="object-details">
        <h2>Create Customer</h2>
        <div>
          <Formik
            initialValues={{init}}
            onSubmit={this.onSubmit}
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
                  <br/><br/>
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