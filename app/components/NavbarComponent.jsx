import React from 'react';
import {Link} from 'react-router';
import { Nav, Navbar, NavItem, Header, Brand} from 'react-bootstrap';

class NavbarComponent extends React.Component {
	constructor() {
	    super();
	    this.goToWall = this.goToWall.bind(this);
	   	this.goToHome = this.goToHome.bind(this);
	   	this.goToLogin = this.goToLogin.bind(this);
	   	this.goToRegister = this.goToRegister.bind(this);
	   	this.Logout = this.Logout.bind(this);
	 }
	 goToHome () {
	 	this.props.history.pushState(null, '/')
	 }
	 goToWall () {
	 	this.props.history.pushState(null, '/wall')
	 }
	 goToLogin() {
	 	this.props.history.pushState(null, '/login')
	 }
	 goToRegister() {
	 	this.props.history.pushState(null, '/register')
	 }
	 Logout() {
	 	window.sessionStorage.removeItem('username')
	 	window.sessionStorage.removeItem('token')
	 	this.props.history.pushState(null, '/')
	 }
	render() {
		return (
			<Navbar>
				<Navbar.Header>
					<Navbar.Brand>
						<a href='#'>Wall App </a>
					</Navbar.Brand>
				</Navbar.Header>
				<Nav>
					<NavItem onClick={this.goToHome}> Home </NavItem>
					<NavItem onClick={this.goToWall}> Wall </NavItem>
					<NavItem onClick={this.goToLogin}> Login </NavItem>
					<NavItem onClick={this.goToRegister}> Register </NavItem>
					<NavItem onClick={this.Logout}> Logout </NavItem>
				</Nav>
			</Navbar>
		)
	}
}

export default NavbarComponent;