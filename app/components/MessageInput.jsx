import React from 'react';

class MessageInput extends React.Component {
	render() {
		return (
			<div>
				<form onSubmit={this.props.sendMessage.bind(this)}>
					<input type='text' placeholder='Message body' onChange={this.props.updateMessage}/>
					<button type='submit'> Enter </button>
				</form>
			</div>
		)
	}
}

export default MessageInput;