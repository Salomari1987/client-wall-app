import alt from '../alt';
import RegisterActions from '../actions/RegisterActions';

class RegisterStore {
  constructor() {
    this.bindActions(RegisterActions);
    this.username = '';
    this.password = '';
    this.email = '';
    this.firstName = '';
    this.lastName = '';
    this.errors = [];
    this.alertVisible = true;
    this.size = 6;
    this.offset = 1;
  }

  onRegisterSuccess(payload) {
    window.sessionStorage.setItem('username', payload.data.username);
    window.sessionStorage.setItem('token', payload.data.token);
    setTimeout(()=> payload.history.pushState(null, '/wall'), 0);
  }

  onRegisterFailure(errorMessages) {
    this.errors = Object.keys(errorMessages).map((key, i) => {
      return key + ': ' + errorMessages[key][0];
    });
  }

  isAuthenticated() {
    if (this.sessionStorage.getItem('token')) {
      return true;
    }
    return false;
  }

  onUpdateUsername(event) {
    this.username = event.target.value;
  }

  onUpdatePassword(event) {
    this.password = event.target.value;
  }

  onUpdateFirstName(event) {
    this.firstName = event.target.value;
  }

  onUpdateLastName(event) {
    this.lastName = event.target.value;
  }

  onUpdateEmail(event) {
    this.email = event.target.value;
  }
}

export default alt.createStore(RegisterStore);