import React, { Component } from 'react';
import axios from 'axios';
import sessionDetail from '../../conts/sessionDetail';

export default class LeaveStatusAPI extends Component {
  static getLeaveStatus() {
    const headers = {
      'Content-Type': 'application/json',
      'Cookie': `session_id=${sessionDetail.session_Id}`
    };

    const data = {
      params: {
        model: 'annual.leaves.tree',
        method: 'search_read',
        args: [
          [
            [
              // 'annual_leaves_tree.emp_code', '=', sessionDetail.Id
              'annual_leaves_tree.employee_id.id', '=', sessionDetail.Id
            ]
          ]
        ],
        kwargs: {
          fields: [
            'leaves_type', 'leave_type_char', 'total_leaves', 'leave_availed', 'leave_remaining'
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
