import { Component } from 'react';
import sessionDetail from '../../conts/sessionDetail';

export default class LoanStatusAPI extends Component {
    static getLoanStatus() {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Cookie", `session_id=${sessionDetail.session_Id}`);

        var raw = JSON.stringify({
            "params": {
                "model": "contractor.advances",
                "method": "search_read",
                "args": [
                    [
                        [
                            "employee", "=", sessionDetail.Id
                        ]
                    ]
                ],
                "kwargs": {
                    "fields": [
                        "type", "amount", "received", "remaining", "date", "state"
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
            .then(result => {
                return result;
            })
            .catch(error => alert('Network Error', error));
    }
}