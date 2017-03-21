import React from 'react';
import Message from './Message';
import MessageInput from './MessageInput';
import WallStore from '../stores/WallStore';
import WallActions from '../actions/WallActions';
import ReactDOM from 'react-dom';

class Wall extends React.Component {
  constructor(props) {
    super(props);
    this.state = WallStore.getState();
    this.onChange = this.onChange.bind(this);
    this._fetchMessages = this._fetchMessages.bind(this);
  }

  componentDidMount() {
    WallStore.listen(this.onChange);
    WallActions.getLoggedUser();
    WallActions.getMessages();

    this._fetchMessages();

    setInterval(() => WallActions.updateMessagesTimes(), 300000);
  }

  _fetchMessages () {
    socket.on('messageFetch', (d) => {
      WallActions.getMessages();
    });
  }
  componentWillUnmount() {
    WallStore.unlisten(this.onChange);
  }

  componentDidUpdate() {
    this.scrollToBottom();
  }

  onChange(state) {
    this.setState(state);
  }

  scrollToBottom () {
    const node = ReactDOM.findDOMNode(this.messagesEnd);
    if (node) {
      node.scrollIntoView({behavior: 'smooth'});
    } 
  }
  sendMessage(event) {
    event.preventDefault();
    WallActions.sendMessage(this.state);
  }

  render() {
    var messages = this.state.messages.map((e, i) => {
      return (
        <Message ref={(el) => { this.messagesEnd = el; }} author={e.author} body={e.body} ago={e.ago} key={i.toString()} />
      );
    });

    var input = this.state.token ? <MessageInput sendMessage={this.sendMessage.bind(this)} updateMessage={WallActions.updateMessage}/> : null;

    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="panel panel-default">
              <div className="panel-body">
                <ul className="chat">
                  {messages}
                </ul>
              </div>
              {input}
            </div>
          </div>
        </div>
      </div> 
    );
  }
}

export default Wall;