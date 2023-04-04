import { Routes, Route, Navigate } from 'react-router-dom'
import { Home } from './Pages/Home'
import { User } from './Pages/User'
import { useContext } from 'react';
import { AppManagementContext } from './Context/AppManagementContext';

export function Router() {
  const { mainUserInfo } = useContext(AppManagementContext);

  if (window.location.pathname == "/user") {
    Navigate({ to: `/user/${mainUserInfo.id}` });
  }

  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path="/user/:id" element={<User />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  )
}