import React from 'react';
import { render } from 'react-dom';

import routes from './routes.js';
import {BrowserRouter as Router} from 'react-router-dom';

const root = document.createElement('div');
document.body.appendChild(root);

render(<Router>{routes}</Router>, root);
