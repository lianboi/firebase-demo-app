import React from 'react';
import { NavLink } from 'react-router-dom';

const header = () => {
    return (<header className="App-header">
        <div>Hello Newers! </div>
        <NavLink to='/' activeClassName='selected'> Home </NavLink>
        <NavLink to='/sign-in' activeClassName='selected'> sign in </NavLink>
        <NavLink to='/sign-up' activeClassName='selected'> sign up </NavLink>
        <NavLink to='/about' activeClassName='selected'> about </NavLink>
        </header>);
}

export default header;