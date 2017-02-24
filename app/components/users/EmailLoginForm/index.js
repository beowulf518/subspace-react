import React, { PropTypes } from 'react';
import { FormControl, Button } from 'react-bootstrap';

class EmailLoginForm extends React.Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };

    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleEmailChange(e) {
    this.setState({ email: e.target.value });
  }

  handlePasswordChange(e) {
    this.setState({ password: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.onSubmit(this.state.email, this.state.password);
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <FormControl
          id="formControlsEmail"
          type="email"
          label="Email address"
          placeholder="Enter email"
          value={this.state.email}
          onChange={this.handleEmailChange}
        />
        <div style={{ height: 5 }}></div>
        <FormControl
          id="formControlsPassword"
          label="Password"
          type="password"
          placeholder="Enter password"
          value={this.state.password}
          onChange={this.handlePasswordChange}
        />
        <div style={{ height: 5 }}></div>
        <Button type="submit">
          Login
        </Button>
      </form>
    );
  }
}

export default EmailLoginForm;
