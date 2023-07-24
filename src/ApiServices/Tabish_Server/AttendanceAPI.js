import { Component } from 'react';
import sessionDetail from '../../conts/sessionDetail';
import axios from 'axios';

export default class AttendanceAPI extends Component {
  static submitAttendance(data) {
    console.log("datetime", data.date_time);
    const headers = {
      'Content-Type': 'application/json',
      'Cookie': `session_id=${sessionDetail.session_Id}`
    };

    const dataApi = {
      params: {
        method: 'create',
        model: 'ecube.raw.attendance',
        args: [
          {
            employee_id: sessionDetail.Id,
            machine_id: data.machine_id,
            lattidude: data.latitude,
            logitide: data.longitude,
            attendance_status: data.checkStatus,
            mac_address: data.macAddress,
            // mac_address: "15",
            time: data.time,
            date: data.date,
            employee_image: data.base64Img,
            employee_location: data.location,
            shift_id: sessionDetail.shift,
            department: data.department,
            attendance_date: data.date_time,
          }
        ],
        kwargs: {}
      }
    };

    const requestOptions = {
      method: 'POST',
      headers: headers,
      data: JSON.stringify(dataApi),
      url: `http://${sessionDetail.server_Ip}/web/dataset/call_kw/`
    };

    return axios(requestOptions)
      .then(response => {
        return response.data;
      })
      .catch(error => {
        console.error(error);
        throw error;
      });


  }
}