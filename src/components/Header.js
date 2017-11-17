import React from 'react';
import { NavLink } from 'react-router-dom';
import * as firebase from 'firebase';

const header = (props) => {
    return (<header className="App-header">
        <div>Hello Newers! </div>
        <NavLink to='/' activeClassName='selected'> Home </NavLink>
        <NavLink to='/about' activeClassName='selected'> about </NavLink>
        { !props.login ? <NavLink to='/sign-in' activeClassName='selected'> sign in </NavLink> : <NavLink to='/me' activeClassName='selected'> Profile </NavLink>  }
        { !props.login ? <NavLink to='/sign-up' activeClassName='selected'> sign up </NavLink> : <button onClick={props.logOut}>Logout </button>}
        </header>);
}

export default header;