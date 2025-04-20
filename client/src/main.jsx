import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { RouterProvider } from 'react-router-dom'
import router from './routes/index.jsx'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import rootReducer from "./reducers/index.js"

const store = configureStore({
  reducer: rootReducer
})

createRoot(document.getElementById('root')).render(
  
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
  
)
