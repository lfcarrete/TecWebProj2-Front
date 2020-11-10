import React from 'react'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import AllCountries from './AllCountries'

import Country from './country'

import Login from './Login'

import Usuario from './Usuario'

import Cadastrar from './Cadastrar'

import favorites from './favorites'

import favoriteList from './favoriteList'

import favoritesPag from './favoritesPag'

export default props => (
    <Router>
        <Route path='/AllCountries' component={AllCountries} />
        <Route path='/country' component={Country} />
        <Route path='/Login' component={Login} />
        <Route path='/Usuario' component={Usuario} />
        <Route path='/Cadastrar' component={Cadastrar} />
        <Route path='/favorites' component={favorites} />
        <Route path='/favoriteList' component={favoriteList} />
        <Route path='/favoritesPag' component={favoritesPag} />
        <Redirect from='*' to='/Usuario' />
    </Router>
)