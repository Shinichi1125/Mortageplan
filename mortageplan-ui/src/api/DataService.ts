import axios from 'axios';
import { API_URL } from '../Constants';
import RawCustomerData from '../interfaces/RawCustomerData.interface';

class DataService {
  retrieveAllCustomerData(){
    return axios.get(`${API_URL}/all-decimal-mortages`);
  }
  
  getMonthlyPayments(id: number){
    return axios.get(`${API_URL}/monthly-payment/${id}`);
  }

  makeFormData(data: RawCustomerData){
    const formData = new FormData();

    formData.append('id', String(data.id));
    formData.append('customer', String(data.customer));
    formData.append('totalLoanEuro', String(data.totalLoanEuro));
    formData.append('totalLoanCent', String(data.totalLoanCent));
    formData.append('interest', String(data.interest));
    formData.append('years', String(data.years));
    
    return formData; 
  }

  createCustomer(rawCustomerData: RawCustomerData){
    const formData = this.makeFormData(rawCustomerData);
    return axios.post(`${API_URL}/save-customer`, formData, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
}

export default new DataService()

