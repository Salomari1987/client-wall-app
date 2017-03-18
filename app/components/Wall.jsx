import React from 'react';
import Message from './Message.jsx'
import MessageInput from './MessageInput.jsx'

class Wall extends React.Component {
  render() {
    return (
      <div>
        <Message />
        <MessageInput />
      </div>
    );
  }
}

export default Wall;