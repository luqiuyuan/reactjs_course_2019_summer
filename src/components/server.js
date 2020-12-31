class Server {

  sendRequest = (method, resource, body, success_callback, fail_callback, should_login) => {
    let status; // share response status across multiple then functions

    let headers = should_login
    ? new Headers({
      'Content-Type': 'application/json',
      'Authorization': JSON.stringify({
        "user_token": {
          "user_id": localStorage.user_id,
          "key": localStorage.user_token_key,
        },
      }),
    })
    : new Headers({ 'Content-Type': 'application/json' });

    let body_str = body? JSON.stringify(body) : null;

    let options = {
      method,
      headers: headers,
    };

    if (body) {
      options.body = body_str;
    }

    fetch('https://bigfish-aliness.herokuapp.com' + resource, options)
    .then((response) => {
      status = response.status;
      if ((status >= 200 && status < 300) || status === 400) {
        return response.json();
      } else {
        return null;
      }
    })
    .then((response_body) => {
      if (status >= 200 && status < 300) {
        success_callback && success_callback(response_body);
      } else if (status >= 400 && status < 500) {
        fail_callback && fail_callback(response_body);
      }
    });
  }

  getQuestions = (success_callback, fail_callback) => {
    this.sendRequest('get', '/questions', null, success_callback, fail_callback, true);
  }

  createUser = (user, success_callback, fail_callback) => {
    this.sendRequest('post', '/users', { user }, success_callback, fail_callback);
  }

  createUserToken = (credential, success_callback, fail_callback) => {
    this.sendRequest('post', '/user_tokens', { credential }, success_callback, fail_callback);
  }

}

export default new Server();
