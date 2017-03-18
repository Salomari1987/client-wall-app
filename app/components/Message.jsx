import React from 'react';

class Message extends React.Component {
	render() {
		return (
			<div>
				<h1> Author: {this.props.author} </h1>
				<p> body {this.props.body} </p>
			</div>
		)
	}
}

export default Message;