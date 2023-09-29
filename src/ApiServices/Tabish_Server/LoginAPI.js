import { Component } from 'react';
import axios from 'axios';
import sessionDetail from '../../conts/sessionDetail';

export default class LoginAPI extends Component {
  static LoginUser({ username, password }) {
    try {
      const authenticateUrl = `http://${sessionDetail.server_Ip}/web/session/authenticate`;
      username = username.trim();
      password = password.trim();

      const authenticateHeaders = {
        'Content-Type': 'application/json',
      };

      const authenticateBody = {
        params: {
          db: sessionDetail.database,
          login: username,
          password: password,
        },
      };

      return axios.post(authenticateUrl, authenticateBody, { headers: authenticateHeaders })
        .then(response => {
          const sessionId = response.headers['set-cookie'][0].split(';')[0].split('=')[1];
          sessionDetail.session_Id = sessionId;
          sessionDetail.employee_id = response.data.result.uid;
          return response.data.result.uid;
        })
        .catch(error => {
          throw error;
        });

    } catch (error) {
      console.error("LoginUser Error:", error);
    }


  }

  static getEmployee(uid) {
    const callKwUrl = `http://${sessionDetail.server_Ip}/web/dataset/call_kw`;

    const callKwHeaders = {
      'Content-Type': 'application/json',
      'Cookie': `session_id=${sessionDetail.session_Id}`,
    };

    const callKwBody = {
      params: {
        model: sessionDetail.employee_model,
        method: 'search_read',
        args: [
          [
            [
              'user_id',
              '=',
              uid,
            ],
          ],
        ],
        kwargs: {
          fields: ['id', 'schedule', 'department_id', 'job_id', 'image', 'name', 'emp_code'],
        },
      },
    };

    return axios.post(callKwUrl, callKwBody, { headers: callKwHeaders })

      .then(response => {
        console.log("response", response.data.result);

        return response.data.result
      }
      )
      .then(data => {
        var id = null;
        // console.log(data);
        if (data?.length > 0) {
          id = data[0].id;
          // console.log('inside if', data[0])
          sessionDetail.Department = data[0].department_id[0];
          sessionDetail.shift = data[0].schedule[0];
          sessionDetail.Id = id;
          sessionDetail.emp_code = data[0].emp_code;

          const base64String = data[0].image;
          sessionDetail.employee_name = data[0].name;
          sessionDetail.profile_image = `data:image/png;base64,${base64String}`;
          sessionDetail.job_title = data[0].job_id[1];
        }
        return id;
      })
      .catch(error => {
        console.log("error", error, "error");
        throw error;
      });

  }
}