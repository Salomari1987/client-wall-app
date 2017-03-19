import React from 'react';
import {Popover} from 'react-bootstrap'
class Message extends React.Component {
	render() {
		return (
            <li className="left clearfix">
                <div className="chat-body clearfix">
                    <div className="header">
                        <strong className="primary-font">{this.props.author}</strong> <small className="pull-right text-muted">
                            <span className="glyphicon glyphicon-time"></span>12 mins ago</small>
                    </div>
                    <p>
                    	{this.props.body}
                    </p>
                </div>
            </li>
		)
	}
}

export default Message;