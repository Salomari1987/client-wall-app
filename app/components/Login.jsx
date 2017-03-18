import React from 'react';
import {Link} from 'react-router';
import LoginStore from '../stores/LoginStore.jsx';
import LoginActions from '../actions/LoginActions.jsx';

class Login extends React.Component {
	constructor(props) {
		super(props);
		this.state = LoginStore.getState();
		this.onChange = this.onChange.bind(this);
	}

	componentDidMount() {
		LoginStore.listen(this.onChange);
	}

	componentWillUnmount() {
	    LoginStore.unlisten(this.onChange);
	}

	onChange(state) {
		this.setState(state);
	}

	handleSubmit(event) {
	    event.preventDefault();
	    LoginActions.login(this.state, this.props.history);
	}
	render() {
		var errorMessages = this.state.errors.map((error, i) => {
			return (
				<p key={i.toString()} > {error} </p>
			);
		});
		return (
			<div>
				<form onSubmit={this.handleSubmit.bind(this)}>
					<div>
						<label> Username </label>
						<input type='text' placeholder='username' onChange={LoginActions.updateUsername}/>
					</div>
					<div>
						<label> Password </label>
						<input type='password' placeholder='password' onChange={LoginActions.updatePassword}/>
					</div>	
					<button type='submit'>Login</button>
					{errorMessages}
				</form>
			</div>
		)
	}
}

export default Login;