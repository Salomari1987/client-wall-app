import React from 'react';
import { Alert, Col, Form, Button, FormGroup, FormControl, HelpBlock, ControlLabel } from 'react-bootstrap';

class AlertComponent extends React.Component {
  render() {
    var alert = (function () {
      if (this.props.alertVisible) {
        return (
          <Alert bsStyle="danger" onDismiss={this.props.handleAlertDismiss}>
            <h4>Oh snap! There was an error!</h4>
            {this.props.errorMessages}
            <p>
              <Button id='alert-dismiss' onClick={this.props.handleAlertDismiss}>Hide Alert</Button>
            </p>
          </Alert>
        );
      } else {
        return (
          <Button id='alert-show' onClick={this.props.handleAlertShow}>Show Alert</Button>
        );
      }
    }).call(this);
    
    return (
      <Col sm={6} smOffset={3}>
        {alert}
      </Col>
    );
  }
}

export default AlertComponent;

