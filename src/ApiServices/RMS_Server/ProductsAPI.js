import { Component } from 'react';
import sessionDetail from '../../conts/sessionDetail';
import axios from 'axios';

export default class ProductsAPI extends Component {
    static getproducts() {
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
            url: `http://3.1.62.217:8069/getProducts/`
        };

        return axios(requestOptions)
            .then(response => {
                console.log(response.data);
                return response.data;
            })
            .catch(error => {
                console.error(error);
                throw error;
            });
    }
}