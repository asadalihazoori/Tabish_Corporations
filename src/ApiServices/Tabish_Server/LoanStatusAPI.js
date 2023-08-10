import React, { Component } from 'react';
import axios from 'axios';
import sessionDetail from '../../conts/sessionDetail';

export default class LoanStatusAPI extends Component {
    static getLoanStatus() {
        const headers = {
            'Content-Type': 'application/json',
            'Cookie': `session_id=${sessionDetail.session_Id}`
        };

        const data = {
            params: {
                model: 'contractor.advances',
                method: 'search_read',
                args: [
                    [
                        [
                            'employee', '=', sessionDetail.Id
                        ]
                    ]
                ],
                kwargs: {
                    fields: [
                        'type', 'amount', 'received', 'remaining', 'date', 'state'
                    ]
                }
            }
        };

        return axios.post(`http://${sessionDetail.server_Ip}/web/dataset/call_kw/`, data, {
            headers: headers
        })
            .then(response => {
                return response.data;
            })
            .catch(error => {
                throw error;
            });
    }

}
