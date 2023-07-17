import { Component } from 'react';
import sessionDetail from '../conts/sessionDetail';

export default class LeaveStatusAPI extends Component {
  static getLeaveStatus() {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Cookie", `session_id=${sessionDetail.session_Id}`);

    var raw = JSON.stringify({
      "params": {
        "model": "annual.leaves.tree",
        "method": "search_read",
        "args": [
          [
            [
              "annual_leaves_tree.emp_code", "=", sessionDetail.Id
            ]
          ]
        ],
        "kwargs": {
          "fields": [
            "leaves_type", "leave_type_char", "total_leaves", "leave_availed", "leave_remaining"
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