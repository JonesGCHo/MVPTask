import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Grid } from 'semantic-ui-react'

export class NavMenu extends Component {

  render() {
      return (
          <div class="ui menu inverted">
              <div class="header item">
                  <h4>React</h4>
              </div>
              <a class="item" color='blue'>
                  Customers
              </a>
              <a class="item">
                  Products
              </a>
              <a class="item">
                  Stores
              </a>
              <a class="item">
                  Sales
              </a>
          </div>
    );
  }
}
