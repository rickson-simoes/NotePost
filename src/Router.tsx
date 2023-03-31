import { Routes, Route } from 'react-router-dom'
import { Home } from './Pages/Home'
import { User } from './Pages/User'

export function Router() {
  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path="/user/:id" element={<User />} />
    </Routes>
  )
}