import alt from '../alt.jsx';

class LoginActions {
  constructor() {
    this.generateActions(
      'loginSuccess',
      'loginFailure',
      'updateUsername',
      'updatePassword'
    );
  }

  login(state, history) {
    $.ajax({
      type: 'POST',
      url: 'http://localhost:8000/api/login/',
      data: {
      	username: state.username,
      	password: state.password
      }
    })
	.done((data) => {
		this.actions.loginSuccess({history: history, data: data})
	})
	.fail((err) => {
		var errorMessages = JSON.parse(err.responseText)
		this.actions.loginFailure(errorMessages)
	});
  }
}

export default alt.createActions(LoginActions);