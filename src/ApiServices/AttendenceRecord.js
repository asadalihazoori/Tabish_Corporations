import { Component } from 'react';
import sessionDetail from '../conts/sessionDetail';

export default class AttendanceRecord extends Component {
  static ViewAttendance() {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Cookie", `session_id=${sessionDetail.session_Id}`);

    var raw = JSON.stringify({
      "params": {
        "model": "ecube.raw.attendance",
        "method": "search_read",
        "args": [
          [
            [
              "employee_id",
              "=",
              sessionDetail.Id
            ]
          ]
        ],
        "kwargs": {
          "fields": [
            "date",
            "time",
            "attendance_status"
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