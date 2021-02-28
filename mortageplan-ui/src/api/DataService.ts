import axios from 'axios';
import { API_URL } from '../Constants';
import CustomerData from '../interfaces/CustomerData.interface';

class DataService {
  retrieveAllCustomerData(){
    return axios.get(`${API_URL}/all-decimal-mortages`);
  }
  
  getMonthlyPayments(id: number){
    return axios.get(`${API_URL}/monthly-payment/${id}`);
  }
}

export default new DataService()

