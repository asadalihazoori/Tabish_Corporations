import { Component } from 'react';
import sessionDetail from '../conts/sessionDetail';
import axios from 'axios';

export default class CustomerAPI extends Component {
  static AddCustomer(inputs) {
    const headers = {
      'Content-Type': 'application/json',
    };

    const dataApi = {

      "customer_name": inputs.name,
      "customer_address": inputs.address,
      "phone": inputs.phone,
      "store_longitude": inputs.latitude,
      "store_latitude": inputs.longitude,
      "image_1": inputs.base64Img1,
      "image_2": inputs.base64Img2,
      "image_3": inputs.base64Img3,

    };

    const requestOptions = {
      method: 'POST',
      headers: headers,
      data: JSON.stringify(dataApi),
      url: `http://3.1.62.217:8069/createCustomer/`
    };

    return axios(requestOptions)
      .then(response => {
        return response.data;
      })
      .catch(error => {
        console.error(error);
        throw error;
      });


  }


  static getCustomer() {
    const headers = {
      'Content-Type': 'application/json',
    };

    const dataApi = {
      params: {
      }

    };

    const requestOptions = {
      method: 'POST',
      headers: headers,
      data: JSON.stringify(dataApi),
      url: `http://3.1.62.217:8069/getcustomer/`
    };

    return axios(requestOptions)
      .then(response => {
        return response.data;
      })
      .catch(error => {
        console.error(error);
        throw error;
      });


  }

  static UpdateCustomer(inputs) {
    const headers = {
      'Content-Type': 'application/json',
    };

    const dataApi =

    {
      "params": {
        "id": 6695,
        "customer_name": "asad ali ali",
        "customer_address": "Khushab Pakistan",
        "store_longitude": "302",
        "store_latitude": "420",
        "store_landmark": "69",
        "phone": "",
        "image_1": inputs.base64Img1,
        "image_2": inputs.base64Img2,
        "image_3": inputs.base64Img3,

        "image_1920": inputs.base64Img1
      }
    }

    const requestOptions = {
      method: 'POST',
      headers: headers,
      data: JSON.stringify(dataApi),
      url: `http://3.1.62.217:8069/editCustomer/`
    };

    return axios(requestOptions)
      .then(response => {
        return response.data;
      })
      .catch(error => {
        console.error(error);
        throw error;
      });


  }


}