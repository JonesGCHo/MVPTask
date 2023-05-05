import React, { Component } from 'react';

export class Home extends Component {
  static displayName = Home.name;

  render() {
    return (
      <div>
        <h1>MVP Onboarding Task</h1>
        <p>Select something from the top Navbar to get started</p>
      </div>
    );
  }
}
