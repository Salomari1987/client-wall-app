import React from 'react';
import {Link} from 'react-router';
import RegisterStore from '../stores/RegisterStore.jsx';
import RegisterActions from '../actions/RegisterActions.jsx';

class Register extends React.Component {
	constructor(props) {
		super(props);
		this.state = RegisterStore.getState();
		this.onChange = this.onChange.bind(this);
	}

	componentDidMount() {
		RegisterStore.listen(this.onChange);
	}

	componentWillUnmount() {
	    RegisterStore.unlisten(this.onChange);
	}

	onChange(state) {
		this.setState(state);
	}

	handleSubmit(event) {
	    event.preventDefault();
	    RegisterActions.register(this.state, this.props.history);
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
						<input type='text' placeholder='username' onChange={RegisterActions.updateUsername}/>
					</div>
					<div>
						<label> Password </label>
						<input type='password' placeholder='password' onChange={RegisterActions.updatePassword}/>
					</div>					
					<div>
						<label> Email </label>
					<input type='email' placeholder='email' onChange={RegisterActions.updateEmail}/>
					</div>					
					<div>
						<label> First Name </label>
						<input type='text' placeholder='first name' onChange={RegisterActions.updateFirstName}/>
					</div>
					<div>
						<label> Last Name </label>
						<input type='text' placeholder='last name' onChange={RegisterActions.updateLastName}/>
					</div>
					<button type='submit'>Register</button>
					{errorMessages}
				</form>
			</div>
		)
	}
}

export default Register;