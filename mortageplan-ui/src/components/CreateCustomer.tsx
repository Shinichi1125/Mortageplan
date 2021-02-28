import React from 'react';
import CustomerData from '../interfaces/CustomerData.interface';
import RawCustomerData from '../interfaces/RawCustomerData.interface';
import DataService from '../api/DataService';
import { SMALL_INPUT_FIELD, TEXTAREA_COLS, TEXTAREA_ROWS } from '../Constants';
import { Formik, Form, Field, ErrorMessage } from 'formik'; 
import ICustomerProps from '../interfaces/ICustomerProps.interface';
import ICustomerState from '../interfaces/ICustomerState.interface';


class CreateCustomer extends React.Component<ICustomerProps, ICustomerState>{

  constructor(props: ICustomerProps){
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
    }
    this.onSubmit = this.onSubmit.bind(this)
    this.onChange = this.onChange.bind(this)
    this.validate = this.validate.bind(this)
    this.cancelCreate = this.cancelCreate.bind(this)
  }

  cancelCreate(){
    this.props.history.push('/')
  }

  async onSubmit(values: RawCustomerData){
    let rawCustomerData = {
      ...values,  
      id: this.state.customerData.id
    };

    await DataService.createCustomer(rawCustomerData)
    .then(() => this.props.history.push('/'))       
  }
  
  render(){
    let { id, customer, totalLoanEuro, totalLoanCent,  interest, years } = this.state.customerData; 

    return(
      <div>
      <div className="object-details">
        <h2>Create Customer</h2>
        <div>
          <Formik
            initialValues={{ id, customer, totalLoanEuro, totalLoanCent, interest, years}}
            onSubmit={this.onSubmit}
            validate={this.validate}
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
                    <Field as="textarea" name="interest"
                      placeholder="Interest" 
                      cols={TEXTAREA_COLS} rows={TEXTAREA_ROWS}
                    />
                  </fieldset>
                  <ErrorMessage name="years" component="div" className="text-danger"/>
                  <fieldset className="form-group">
                    <Field as="textarea" name="years"
                      placeholder="Years" 
                      cols={TEXTAREA_COLS} rows={TEXTAREA_ROWS}
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
      <Footer/>
      </div>
    )
  }
}

export default CreateCustomer; 