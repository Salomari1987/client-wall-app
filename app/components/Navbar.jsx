import React from 'react';
import {Link} from 'react-router';

class Navbar extends React.Component {
	render() {
		return (
			<nav>
				<ul>
					<li><Link to='/'> Home </Link></li>
					<li><Link to='/login'> Login </Link></li>
					<li><Link to='/register'> Register </Link></li>
					<li><Link to='/wall'> Wall </Link></li>
				</ul>
			</nav>
		)
	}
}

export default Navbar;