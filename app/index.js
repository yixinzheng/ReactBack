import React from 'react';
import ReactDOM from 'react-dom';
import {UserModel} from './Datas/dataModel';
import Login from './components/login/login';

import MyRoute from './route';


ReactDOM.render(
    <MyRoute />,
    document.getElementById('app')
);