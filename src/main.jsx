import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.scss'


import { store } from './store/store.js'
import { Provider } from 'react-redux'


ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store} >
    <App />
  </Provider>
)

// 3e1f14f3c8ef2110d836a2b847725c8d - key