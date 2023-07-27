// import { Component } from 'react';
// import sessionDetail from '../../conts/sessionDetail';

// export default class LoginAPI extends Component {

//   static LoginUser({ username, password }) {
//     return fetch(`http://${sessionDetail.server_Ip}/web/session/authenticate`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({
//         "params": {
//           "db": `${sessionDetail.database}`,
//           "login": `${username}`,
//           "password": `${password}`
//         }
//       }),
//     })
//       .then(response => {
//         const sessionId = response.headers.get('Set-Cookie').split(';')[0].split('=')[1];
//         sessionDetail.session_Id = sessionId;
//         return response.json();
//       })

//       .then(data => {
//         const uid = data.result.uid;
//         sessionDetail.employee_id = uid;
//         var myHeaders = new Headers();
//         myHeaders.append("Content-Type", "application/json");
//         myHeaders.append("Cookie", `session_id=${sessionDetail.session_Id}`);

//         var raw = JSON.stringify({
//           "params": {
//             "model": `${sessionDetail.employee_model}`,
//             "method": "search_read",
//             "args": [
//               [
//                 [
//                   "user_id",
//                   "=",
//                   uid
//                 ]
//               ]
//             ],
//             "kwargs": {
//               "fields": [
//                 "id", "schedule", "department_id", "job_id", "image", "name"
//               ]
//             }
//           }
//         });

//         var requestOptions = {
//           method: 'POST',
//           headers: myHeaders,
//           body: raw,
//           redirect: 'follow'
//         };

//         return fetch(`http://${sessionDetail.server_Ip}/web/dataset/call_kw`, requestOptions)
//       })
//       .then(response => response.json())
//       .then(data => {
//         const id = data.result[0].id;
//         sessionDetail.Department = data.result[0].department_id[0];
//         sessionDetail.shift = data.result[0].schedule[0];
//         sessionDetail.Id = id;

//         const base64String = data.result[0].image;
//         sessionDetail.employee_name = data.result[0].name;
//         sessionDetail.profile_image = `data:image/png;base64,${base64String}`;
//         sessionDetail.job_title = data.result[0].job_id[1];
//         return id;
//       })
//       .catch(error => {
//         return error;
//       });
//   }
// }


import { Component } from 'react';
import axios from 'axios';
import sessionDetail from '../../conts/sessionDetail';
import { Alert } from 'react-native';

export default class LoginAPI extends Component {
  static LoginUser({ username, password }) {
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
          fields: ['id', 'schedule', 'department_id', 'job_id', 'image', 'name'],
        },
      },
    };

    return axios.post(callKwUrl, callKwBody, { headers: callKwHeaders })

      .then(response => response.data.result)
      .then(data => {
       var id = null;
        if (data.length > 0) {
          id = data[0].id;
          console.log(data[0])
          sessionDetail.Department = data[0].department_id[0];
          sessionDetail.shift = data[0].schedule[0];
          sessionDetail.Id = id;

          const base64String = data[0].image;
          sessionDetail.employee_name = data[0].name;
          sessionDetail.profile_image = `data:image/png;base64,${base64String}`;
          sessionDetail.job_title = data[0].job_id[1];
        }
        return id;
      })
      .catch(error => {
        throw error;
      });

  }
}