import alt from '../alt';

class WallActions {
  constructor() {
    this.generateActions(
      'getMessagesSuccess',
      'getMessagesFailure',
      'setLoggedUser',
      'updateMessage',
      'sendMessageSuccess',
      'sendMessageFailure'
    );
  }
  getLoggedUser() {
    var jwt = window.sessionStorage.getItem('token');
    var username = window.sessionStorage.getItem('username');
    this.actions.setLoggedUser({jwt, username});
  }

  getMessages() {
    $.ajax({
      type: 'GET',
      url: 'http://localhost:8000/api/messages/'
    })
    .done((data) => {
      this.actions.getMessagesSuccess(data);
    })
    .fail((err) => {
      this.actions.getMessagesFailure(errorMessages);
    });
  }

  sendMessage(state) {
    $.ajax({
      type: 'POST',
      url: 'http://localhost:8000/api/messages/',
      headers: {
        'Authorization': 'Token ' + state.token
      },
      data: {
        body: state.message
      }
    })
    .done((data) => {
      this.actions.sendMessageSuccess(data);
    })
    .fail((err) => {
      this.actions.sendMessageFailure(err);
    });
  }
}

export default alt.createActions(WallActions);