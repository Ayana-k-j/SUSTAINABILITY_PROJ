//for making api request
//import axios from 'axios';


export const fetchPresurveyDetails= async (supplierId) => {
    const axios = require('axios');

const API_BASE_URL="http://localhost:8080/api";
const PRESURVEY_GET_DETAILS_URL= "supplier";
    try{
        
        const response= await axios.get(`${API_BASE_URL}/${PRESURVEY_GET_DETAILS_URL}/${supplierId}`);
        return response;
    }catch(error){
        throw error;
    }
}