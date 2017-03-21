import React from 'react';
import NavbarComponent from './NavbarComponent';

class App extends React.Component {
  render() {
    return (
      <div>
        <NavbarComponent history={this.props.history}/>
        {this.props.children}
      </div>
    );
  }
}

export default App;