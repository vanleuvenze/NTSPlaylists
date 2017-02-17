import React, { Component } from 'react'
import { formatPlaylistData } from './utils/utils.js'
import { CircularProgress } from 'material-ui'
import Header from './components/Header.jsx'
import Search from './components/Search.jsx'


import store from './store.js'
import Q from 'q'

import '../public/styles/styles.css'


const App = (props) => {
  return (
    <div className='container'>
      <Header/>
      <div className='container-flex'>
        {props.children}
      </div>
    </div>
  )
}

export default App
