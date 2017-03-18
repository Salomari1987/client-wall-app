import alt from '../alt.jsx';
import LoginActions from '../actions/LoginActions.jsx';

class LoginStore {
  constructor() {
    this.bindActions(LoginActions);
    this.username = '';
    this.password = '';
    this.errors = [];
  }

  onLoginSuccess(payload) {
    window.sessionStorage.setItem('username', payload.data.username)
    window.sessionStorage.setItem('token', payload.data.token)
    setTimeout(()=> payload.history.pushState(null, '/wall'), 0)
  }

  onLoginFailure(errorMessages) {
    this.errors = Object.keys(errorMessages).map((key, i) => {
      return key + ": " + errorMessages[key][0]
    })
  }

  onUpdateUsername(event) {
    this.username = event.target.value;
  }

  onUpdatePassword(event) {
    this.password = event.target.value;
  }
}

export default alt.createStore(LoginStore);