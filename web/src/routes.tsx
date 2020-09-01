import React from 'react'
import {Route, BrowserRouter} from 'react-router-dom'
import Home from './pages/Home'
import CreatePoint from './pages/CreatePoint'
import End from './pages/End'

const Routes = () => {
    return (
        <BrowserRouter>
            <Route component={Home} path='/' exact/>
            <Route component={CreatePoint} path='/create-point'/>
            <Route component={End} path='/End'/>
        </BrowserRouter>
    )
}

export default Routes