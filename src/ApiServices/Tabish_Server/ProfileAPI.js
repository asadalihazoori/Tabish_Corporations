// import { Component } from 'react';
// import sessionDetail from '../../conts/sessionDetail';

// export default class ProfileAPI extends Component {
//     static getProfile() {

//         var myHeaders = new Headers();
//         myHeaders.append("Content-Type", "application/json");
//         myHeaders.append("Cookie", `session_id=${sessionDetail.session_Id}`);

//         var raw = JSON.stringify({
//             "params": {
//                 "model": sessionDetail.employee_model,
//                 "method": "search_read",
//                 "args": [
//                     [
//                         [
//                             "user_id",
//                             "=",
//                             sessionDetail.employee_id
//                         ]
//                     ]
//                 ],
//                 "kwargs": {
//                     "fields": [
//                         "id",
//                         "name",
//                         "joining_date",
//                         "job_id",
//                         "department_id",
//                         "identification_id",
//                         "phone",
//                         "home_address",
//                         "image",
//                         "first_email",
//                         "parent_id"
//                     ]
//                 }
//             }
//         });

//         var requestOptions = {
//             method: 'POST',
//             headers: myHeaders,
//             body: raw,
//             redirect: 'follow'
//         };

//         return fetch(`http://${sessionDetail.server_Ip}/web/dataset/call_kw/`, requestOptions)
//             .then(response => response.json())
//             .then(data => {
//                 return data;
//             })
//             .catch(error => alert('Network Error', error));
//     }
// }






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
                        "identification_id",
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
                console.error('Network Error', error);
                // You might want to handle the error more gracefully, such as returning a custom error object or re-throwing the error.
                throw error;
            });
    }
}
