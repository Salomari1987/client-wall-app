import alt from '../alt.jsx';

class WallActions {
  constructor() {
    this.generateActions(
    	'getMessagesSuccess',
    	'getMessagesFailure',
    	'setLoggedUser'
    );
  }
  getLoggedUser() {
  	var jwt = window.sessionStorage.getItem('token')
  	var username = window.sessionStorage.getItem('username')
  	this.actions.setLoggedUser({jwt, username})
  }

  getMessages() {
  	$.ajax({
      type: 'GET',
      url: 'http://localhost:8000/api/messages/'
    })
	.done((data) => {
		this.actions.getMessagesSuccess(data)
	})
	.fail((err) => {
		this.actions.getMessagesFailure(errorMessages)
	});
  }
}

export default alt.createActions(WallActions);