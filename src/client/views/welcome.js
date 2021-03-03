import React, { Component } from 'react';
import { connect } from 'react-redux';
import { TextField, FlatButton } from 'material-ui';
import { Button } from '@material-ui/core';
import { Card, CardTitle, CardText, CardActions } from 'material-ui/Card';
import { login } from '../actions';

class Welcome extends Component {
  
  handleLogin() {
    const username = document.getElementById('welcome-username').value;
    if (username && 0 < username.length) {
      this.props.dispatch(login({ username }));
    }
  }

  render() {
    return (
      <div style={{ display: 'flex', marginTop: '32px' }}>
        <div style={{ flex: 1 }}></div>
        <div style={{ width: '400px' }}>
          <Card>
            <CardTitle
              title="Welcome"
            />
            <CardText>
              To start chat, please choose your name in the room.
              <TextField
                id="welcome-username"
                hintText="E.g. Alice, Bob, ..."
                floatingLabelText="Display Name"
              />
            </CardText>
            <CardActions>
            <Button onClick={this.handleLogin.bind(this)} color="primary">Start</Button>;
              {/* <FlatButton label="Start" onTouchTap={this.handleLogin.bind(this)} /> */}
            </CardActions>
          </Card>
        </div>
        <div style={{ flex: 1 }}></div>
      </div>
    );
  }
}

export default connect()(Welcome);
