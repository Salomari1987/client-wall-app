import React from 'react';

class MessageInput extends React.Component {
	render() {
		return (
			<div>
				<input type='text' placeholder='Message body'/>
				<button> Enter </button>
			</div>
		)
	}
}

export default MessageInput;