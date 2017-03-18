import React from 'react';
import {Link} from 'react-router';

class Register extends React.Component {
	render() {
		return (
			<div>
				<input type='text' placeholder='username'/>
				<input type='password' placeholder='password'/>
				<input type='email' placeholder='email'/>
				<input type='text' placeholder='first name'/>
				<input type='text' placeholder='last name'/>
				<button> register</button>
			</div>
		)
	}
}

export default Register;