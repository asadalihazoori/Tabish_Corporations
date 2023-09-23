import { Component } from 'react';
import axios from 'axios';
import sessionDetail from '../../conts/sessionDetail';

export default class ProfileAPI extends Component {
    static getProfile() {
        const url = `http://${sessionDetail.server_Ip}/web/dataset/call_kw/`;

        const headers = {
            "Content-Type": "application/json",
            "Cookie": `session_id=${sessionDetail.session_Id}`
        };

        const data = {
            params: {
                model: sessionDetail.employee_model,
                method: "search_read",
                args: [
                    [
                        [
                            "user_id",
                            "=",
                            sessionDetail.employee_id
                        ]
                    ]
                ],
                kwargs: {
                    fields: [
                        "id",
                        "image",
                        "name",
                        "job_id",
                        "department_id",
                        "joining_date",
                        // "identification_id",
                        "phone",
                        "parent_id",
                        "first_email",
                        "home_address",
                    ]
                }
            }
        };

        return axios.post(url, data, { headers })
            .then(response => response.data)
            .catch(error => {
                throw error;
            });
    }
}
