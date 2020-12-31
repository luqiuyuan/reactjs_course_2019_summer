class Server {

  sendRequest = (method, resource, body, success_callback, fail_callback, should_login) => {
    let status; // share response status across multiple then functions

    fetch('https://bigfish-aliness.herokuapp.com' + resource, {
      method,
      headers: should_login
        ? new Headers({
          'Content-Type': 'application/json',
          'Authorization': JSON.stringify({
            "user_token": {
              "user_id": localStorage.user_token.user_id,
              "key": localStorage.user_token.key,
            },
          }),
        })
        : new Headers({ 'Content-Type': 'application/json' }),
      body: JSON.stringify(body),
    })
    .then((response) => {
      status = response.status;
      return response.json();
    })
    .then((response_body) => {
      if (status >= 200 && status < 300) {
        success_callback(response_body);
      } else if (status >= 400 && status < 500) {
        fail_callback(response_body);
      }
    });
  }

  createUser = (user, success_callback, fail_callback) => {
    this.sendRequest('post', '/users', { user }, success_callback, fail_callback);
  }

  createUserToken = (credential, success_callback, fail_callback) => {
    this.sendRequest('post', '/user_tokens', { credential }, success_callback, fail_callback);
  }

}

export default new Server();
