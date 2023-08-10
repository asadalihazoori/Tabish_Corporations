import React, { Component } from 'react';
import sessionDetail from '../../conts/sessionDetail';
import axios from 'axios';

export default class AttendanceRecord extends Component {
  static ViewAttendance() {
    const headers = {
      "Content-Type": "application/json",
      "Cookie": `session_id=${sessionDetail.session_Id}`
    };

    const data = {
      params: {
        model: "ecube.raw.attendance",
        method: "search_read",
        args: [
          [
            [
              "employee_id",
              "=",
              sessionDetail.Id
            ]
          ]
        ],
        kwargs: {
          fields: [
            "date",
            "time",
            "attendance_status"
          ]
        }
      }
    };

    const url = `http://${sessionDetail.server_Ip}/web/dataset/call_kw/`;

    return axios.post(url, data, { headers })
      .then(response => response.data)
      .catch(error => {
        throw error;
      });
  }
}
