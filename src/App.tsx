import { BrowserRouter } from 'react-router-dom'
import { Router } from './Router'

import './global.css';
import { AppManagementContextProvider } from './Context/AppManagementContext';

export function App() {
  return (
    <BrowserRouter>
      <AppManagementContextProvider>
        <Router />
      </AppManagementContextProvider>
    </BrowserRouter>
  )
}