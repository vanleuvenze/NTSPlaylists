import React from 'react'
import { render } from 'react-dom'

import routes from './routes.js'
import { Router, browserHistory } from 'react-router'

const root = document.createElement('div');
document.body.appendChild(root);

render(<Router history={browserHistory}>{routes}</Router>, root);
