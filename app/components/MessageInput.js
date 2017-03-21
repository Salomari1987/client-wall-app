import React from 'react';

class MessageInput extends React.Component {
  render() {
    return (
      <div className="panel-footer">
        <form onSubmit={this.props.sendMessage.bind(this)}>
          <div className="input-group">
            <input id="btn-input" type="text" className="form-control input-sm" placeholder="Type your message here..." onChange={this.props.updateMessage}/>
            <span className="input-group-btn">
             <button type='submit' className="btn btn-primary btn-sm" id="btn-chat">Send</button>
            </span>
          </div>
        </form>
      </div>
    );
  }
}

export default MessageInput;