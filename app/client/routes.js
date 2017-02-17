import React, { Component } from 'react'
import { Route, IndexRoute } from 'react-router'

import App from './app.jsx'
import SignIn from './components/signIn.jsx'
import PlaylistMain from './components/playlist/PlaylistMain.jsx'


export default (
  <Route path='/' component={App}>
    <Route path='playlist' component={PlaylistMain}/>
    <Route path='signin' component={SignIn}/>
  </Route>
)


