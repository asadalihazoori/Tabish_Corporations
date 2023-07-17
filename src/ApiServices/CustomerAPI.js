import { Component } from 'react';
import sessionDetail from '../conts/sessionDetail';
import axios from 'axios';

export default class CustomerAPI extends Component {
  static AddCustomer(inputs) {
    const headers = {
      'Content-Type': 'application/json',
      //   'Cookie': `session_id=${sessionDetail.session_Id}`
    };

    const dataApi = {
      // params: {

      //   args: [
      //     {


      "customer_name": inputs.name,
      "phone": inputs.phone,
      "store_longitude": inputs.latitude,
      "store_latitude": inputs.longitude,
      "store_landmark": inputs.address,
      "image_1": inputs.base64Img1,
      "image_2": inputs.base64Img2,
      "image_3": inputs.base64Img3,

      //     }
      //   ],
      //   kwargs: {}
      // }
    };

    const requestOptions = {
      method: 'POST',
      headers: headers,
      data: JSON.stringify(dataApi),
      //   url: `http://${sessionDetail.server_Ip}/web/dataset/call_kw/`
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
}