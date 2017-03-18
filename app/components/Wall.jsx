import React from 'react';
import Message from './Message.jsx'
import MessageInput from './MessageInput.jsx'
import WallStore from '../stores/WallStore.jsx'
import WallActions from '../actions/WallActions.jsx'

class Wall extends React.Component {
	constructor(props) {
		super(props);
		this.state = WallStore.getState();
		this.onChange = this.onChange.bind(this);
	}

	componentDidMount() {
		WallStore.listen(this.onChange);
		WallActions.getLoggedUser()
		WallActions.getMessages()
	}

	componentWillUnmount() {
	    WallStore.unlisten(this.onChange);
	}

	onChange(state) {
		this.setState(state);
	}

	sendMessage(event) {
	    event.preventDefault();
	   	WallActions.sendMessage(this.state);
	}

  render() {
  	var messages = this.state.messages.map((e, i) => {
  		return (
  			<Message author={e.author} body={e.body} key={i.toString()} />
  		);
  	});

  	var input = this.state.token ? <MessageInput sendMessage={this.sendMessage.bind(this)} updateMessage={WallActions.updateMessage}/> : null;

    return (
      <div>
      	{messages}
        {input}
      </div>
    );
  }
}

export default Wall;