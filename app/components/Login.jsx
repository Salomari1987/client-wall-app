import React from 'react';
import {Link} from 'react-router';
import LoginStore from '../stores/LoginStore.jsx';
import LoginActions from '../actions/LoginActions.jsx';
import { Col, Form, Button, FormGroup, FormControl, HelpBlock, ControlLabel } from 'react-bootstrap';

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
			<Form horizontal onSubmit={this.handleSubmit.bind(this)}>
				<FormGroup>
					<Col sm={2} smOffset={2} componentClass={ControlLabel} >Username </Col>
					<Col sm={6}>
						<FormControl type='text' placeholder='username' onChange={LoginActions.updateUsername} />
					</Col>
				</FormGroup>
				<FormGroup>
					<Col sm={2} smOffset={2} componentClass={ControlLabel}> Password </Col>
					<Col sm={6}>
						<FormControl type='password' placeholder='password' onChange={LoginActions.updatePassword} />
					</Col>
				</FormGroup>
				<FormGroup>
					<Col smOffset={4} sm={8}>
						<Button type="submit">
							Login
						</Button>
						<span> you do not have an account? <Link to='/register'> Register </Link> </span>
			      	</Col>
			    </FormGroup>
			</Form>
		)
	}
}

export default Login;