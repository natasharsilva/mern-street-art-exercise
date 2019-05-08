import React, {Component} from 'react';
import { Link, NavLink } from 'react-router-dom';
import api from '../api';

export default class MainNavBar extends Component {
  render() {
    return (
      <div>
        <header className="MainNavbar">
            <NavLink to="/" exact className="navbarTitle">MERN Street Art</NavLink>
            <NavLink to="/list" exact>List</NavLink>
            <NavLink to="/map" exact>Map</NavLink>
            <NavLink to="/new-street-art" exact>New Street Art</NavLink>
            {!api.isLoggedIn() && <NavLink to="/signup">Signup</NavLink>}
            {!api.isLoggedIn() && <NavLink to="/login">Login</NavLink>}
            {api.isLoggedIn() && <Link to="/" onClick={(e) => this.handleLogoutClick(e)}>Logout</Link>}
            <NavLink to="/secret">Secret</NavLink>
          </header>
      </div>
    )
  }
}