import React, { Component } from 'react';
import { connect } from 'react-redux';
import { AppBar, FlatButton } from 'material-ui';
import { Button } from '@material-ui/core';
import { Welcome, Room } from './views';
import { logout } from './actions';

class App extends Component {
  handleLogout() {
    this.props.dispatch(logout());
  }

  render() {
    const { username } = this.props;

    let body, right;
    if (username) {
      body = <Room />;
    //   right = <FlatButton label="Logout" onTouchTap={this.handleLogout.bind(this)} />;
      right = <Button onClick={this.handleLogout.bind(this)} color="secondary">Logout</Button>;
    } else {
      body = <Welcome />;
    }

    return (
      <div>
        <AppBar
          title="Chat"
          iconElementRight={right}
        />
        {body}
      </div>
    );
  }
}

function select({ app }) {
  return { ...app };
}

export default connect(select)(App);
