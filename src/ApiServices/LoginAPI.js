import { Component } from 'react';
import sessionDetail from '../conts/sessionDetail';

export default class LoginAPI extends Component {

  static LoginUser({ username, password }) {
    return fetch(`http://${sessionDetail.server_Ip}/web/session/authenticate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "params": {
          "db": `${sessionDetail.database}`,
          "login": `${username}`,
          "password": `${password}`
        }
      }),
    })
      .then(response => {
        const sessionId = response.headers.get('Set-Cookie').split(';')[0].split('=')[1];
        sessionDetail.session_Id = sessionId;
        return response.json();
      })
      .then(data => {
        const uid = data.result.uid;
        sessionDetail.employee_id = uid;
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Cookie", `session_id=${sessionDetail.session_Id}`);

        var raw = JSON.stringify({
          "params": {
            "model": `${sessionDetail.employee_model}`,
            "method": "search_read",
            "args": [
              [
                [
                  "user_id",
                  "=",
                  uid
                ]
              ]
            ],
            "kwargs": {
              "fields": [
                "id", "schedule", "department_id", "job_id", "image", "name"
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

        return fetch(`http://${sessionDetail.server_Ip}/web/dataset/call_kw`, requestOptions)
      })
      .then(response => response.json())
      .then(data => {
        const id = data.result[0].id;
        sessionDetail.Department = data.result[0].department_id[0];
        sessionDetail.shift = data.result[0].schedule[0];
        sessionDetail.Id = id;

        const base64String = data.result[0].image;
        sessionDetail.employee_name = data.result[0].name;
        sessionDetail.profile_image = `data:image/png;base64,${base64String}`;
        sessionDetail.job_title = data.result[0].job_id[1];
        return id;
      })
      .catch(error => {
        return error;
      });
  }
}

