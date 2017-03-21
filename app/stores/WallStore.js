import alt from '../alt';
import WallActions from '../actions/WallActions';
import dateparser from '../services/dateparser.js';


class WallStore {
  constructor() {
    this.bindActions(WallActions);
    this.messages = [];
    this.username = '';
    this.token = '';
    this.message = '';
  }

  onSetLoggedUser(user) {
    this.token = user.jwt;
    this.username = user.username;
  }

  onGetMessagesSuccess(data) {
    data = data.map(function (e, i) {
      e.ago = dateparser.parsedate(e.created_at);
      return e;
    });
    this.messages = data;
  }

  onGetMessagesFailure(err) {
    console.log(err);
  }

  onSendMessageSuccess(data) {
    data.ago = dateparser.parsedate(data.created_at);
    this.messages.push(data);
  }

  onSendMessageFailure(err) {
    console.log(err);
  }

  onUpdateMessage(event) {
    this.message = event.target.value;
  }
}

export default alt.createStore(WallStore);