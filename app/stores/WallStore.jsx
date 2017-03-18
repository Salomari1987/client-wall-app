import alt from '../alt.jsx';
import WallActions from '../actions/WallActions.jsx';


class WallStore {
  constructor() {
    this.bindActions(WallActions);
  	this.messages = [];
    this.username = '';
    this.token = '';
    this.message = ''
  }

  onSetLoggedUser(user) {
    this.token = user.jwt
    this.username = user.username
  }

  onGetMessagesSuccess(data) {
  	this.messages = data;
  }

  onGetMessagesFailure(err) {
  	console.log(err)
  }

  onSendMessageSuccess(data) {
  	this.messages.push(data)
  }

  onSendMessageFailure(err) {
  	console.log(err)
  }

  onUpdateMessage(event) {
    this.message = event.target.value;
  }
}

export default alt.createStore(WallStore);