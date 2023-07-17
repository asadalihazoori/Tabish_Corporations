import { Component } from 'react';
import sessionDetail from '../conts/sessionDetail';

export default class ProfileAPI extends Component {
    static getProfile() {

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Cookie", `session_id=${sessionDetail.session_Id}`);

        var raw = JSON.stringify({
            "params": {
                "model": sessionDetail.employee_model,
                "method": "search_read",
                "args": [
                    [
                        [
                            "user_id",
                            "=",
                            sessionDetail.employee_id
                        ]
                    ]
                ],
                "kwargs": {
                    "fields": [
                        "id",
                        "name",
                        "joining_date",
                        "job_id",
                        "department_id",
                        "identification_id",
                        "phone",
                        "home_address",
                        "image",
                        "first_email",
                        "parent_id"
                    ]
                }
            }
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        return fetch(`http://${sessionDetail.server_Ip}/web/dataset/call_kw/`, requestOptions)
            .then(response => response.json())
            .then(data => {
                const base64String = data.result[0].image;
                sessionDetail.employee_name = data.result[0].name;
                sessionDetail.profile_image = `data:image/png;base64,${base64String}`;
                sessionDetail.job_title = data.result[0].job_id[1];
                return data;
            })
            .catch(error => alert('Network Error', error));
    }
}