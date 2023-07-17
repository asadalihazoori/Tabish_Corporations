import axios from 'axios';
import { Component } from 'react';

const API_KEY = '03e5eb0efc17488fb58e83e83a62fe4e';
export default class OpenCage extends Component {
    static getLocation({ latitude, longitude }) {
        return axios.get(`https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${API_KEY}`)
            .then(response => {
                // console.log(response.data);
                const { results } = response.data;
                if (results.length > 0) {
                    console.log(results[0].formatted);
                    return results[0].formatted;
                }
            })
            .catch(error => {
                // alert(error);
                throw error;
            });
    }
}

