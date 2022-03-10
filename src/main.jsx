import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import {Helmet} from 'react-helmet'
import { EngineProvider } from '../utils/useEngine'
import '../styles/globals.css'

ReactDOM.render(
  <React.StrictMode>
    <Helmet defaultTitle='EPTIC - Start Page'/>

    <EngineProvider>
      <App />
    </EngineProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
