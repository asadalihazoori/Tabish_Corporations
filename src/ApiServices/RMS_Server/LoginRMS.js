import { Component } from 'react';

export default class LoginRMS extends Component {

  static LoginUser() {
    return fetch(`http://3.1.62.217:8069/web/session/authenticate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "params": {
          "db": `Tabish_APIs`,
          "login": `admin`,
          "password": `admin1`
        }
      }),
    })
      .then(response => {
        console.log(response);
        return response.json();
      })
      .catch(error => {
        return error;

      });
  }
}