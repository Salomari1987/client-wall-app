import alt from '../alt.jsx';
import WallActions from '../actions/WallActions.jsx';


class WallStore {
  constructor() {
    this.bindActions(WallActions);
  	this.messages = [];
    this.username = '';
    this.token = '';
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
}

export default alt.createStore(WallStore);