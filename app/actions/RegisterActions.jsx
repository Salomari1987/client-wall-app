import alt from '../alt.jsx';

class RegisterActions {
  constructor() {
    this.generateActions(
      'registerSuccess',
      'registerFailure',
      'updateUsername',
      'updateFirstName',
      'updateLastName',
      'updatePassword',
      'updateEmail'
    );
  }

  register(state, history) {
    $.ajax({
      type: 'POST',
      url: 'http://localhost:8000/api/register',
      data: {
      	username: state.username, 
      	first_name: state.firstName,
      	last_name: state.lastName,
      	email: state.email,
      	password: state.password
      }
    })
	.done((data) => {
		console.log(data)
		this.actions.registerSuccess({history: history, data: data})
	})
	.fail((err) => {
		var errorMessages = JSON.parse(err.responseText)
		this.actions.registerFailure(errorMessages)
	});
  }
}

export default alt.createActions(RegisterActions);