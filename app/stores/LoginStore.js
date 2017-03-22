import alt from '../alt';
import LoginActions from '../actions/LoginActions';

class LoginStore {
  constructor() {
    this.bindActions(LoginActions);
    this.username = '';
    this.password = '';
    this.errors = [];
    this.alertVisible = true;
    this.size = 6;
    this.offset = 1;
  }

  onLoginSuccess(payload) {
    window.sessionStorage.setItem('username', payload.data.username);
    window.sessionStorage.setItem('token', payload.data.token);
    this.erros = [];
    setTimeout(()=> payload.history.pushState(null, '/wall'), 0);
  }

  onLoginFailure(errorMessages) {
    this.errors = Object.keys(errorMessages).map((key, i) => {
      return key + ': ' + errorMessages[key][0];
    });
  }

  onUpdateUsername(event) {
    this.username = event.target.value;
  }

  onUpdatePassword(event) {
    this.password = event.target.value;
  }
}

export default alt.createStore(LoginStore);