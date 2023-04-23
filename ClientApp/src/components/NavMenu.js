import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export class NavMenu extends Component {

  render() {
      return (
          <div class="ui menu inverted">
              <div class="header item">
                  <Link to="/" ><h4>React</h4></Link>
              </div>
              <a class="item" color='blue'>
                  <Link to="/fetchcustomers" >Customers</Link>
              </a>
              <a class="item">
                  <Link to="/fetchproducts" >Products</Link>
              </a>
              <a class="item">
                  <Link to="/fetchstores" >Stores</Link>
              </a>
              <a class="item">
                  <Link to="/fetchsales" >Sales</Link>
              </a>
          </div>
    );
  }
}
