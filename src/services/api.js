import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:3001/packages';
const BASE_URL = 'http://localhost:3001/packages';

const getAllPackagesItems = () =>
  axios.get (BASE_URL).then(response => {
    return response.data;
  });    
  
const deletePckgItem = id => 
  axios.delete (`${BASE_URL}/${id}`).then(response => response.status === 200)
   

const addPckgItem = item =>
  axios.post(BASE_URL, item).then(response => {
      return response.data;
    });
	
export { getAllPackagesItems, deletePckgItem, addPckgItem };
    