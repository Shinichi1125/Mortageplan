import axios from 'axios';
import { API_URL } from '../Constants';
import CustomerData from '../interfaces/CustomerData.interface';

class DataService {
  retrieveAllCustomerData(){
    return axios.get(`${API_URL}/all-decimal-mortages`);
  }
  
}

export default new DataService()

