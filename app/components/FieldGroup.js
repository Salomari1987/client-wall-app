import React from 'react';
import { Alert, Col, Form, Button, FormGroup, FormControl, HelpBlock, ControlLabel } from 'react-bootstrap';

class FieldGroup extends React.Component {

  render() {

    return (
      <FormGroup
      validationState={this.props.validationState}
      >
        {this.props.isLabel && <Col sm={2} smOffset={this.props.offset} componentClass={ControlLabel}>{this.props.fieldLabel}</Col>}
        <Col sm={this.props.size}>
          {this.props.isRequired && <FormControl id={this.props.fieldID} type={this.props.type} placeholder={this.props.placeholder} onChange={this.props.onChange} required/>}
          {!this.props.isRequired && <FormControl id={this.props.fieldID} type={this.props.type} placeholder={this.props.placeholder} onChange={this.props.onChange} />}
          <FormControl.Feedback />
          {this.props.isHelpBlock && <HelpBlock>{this.props.helpBlock}</HelpBlock>}
        </Col>
      </FormGroup>
    );
  }
}

FieldGroup.propTypes = {
  validationState: React.PropTypes.string,
  fieldLabel: React.PropTypes.string,
  onChange: React.PropTypes.func,
  helpBlock: React.PropTypes.string,
  fieldID: React.PropTypes.string,
  isLabel: React.PropTypes.bool,
  size: React.PropTypes.number,
  offset: React.PropTypes.number,
  type: React.PropTypes.string,
  isHelpBlock: React.PropTypes.bool,
  placeholder: React.PropTypes.string,
  isRequired: React.PropTypes.bool
};

export default FieldGroup;