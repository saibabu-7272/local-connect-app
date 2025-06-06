import {BrowserRouter, Routes , Route} from 'react-router-dom'
import './App.css'

import LoginPage from './components/LoginPage'
import DashBoardPage from './components/DashBoardPage'
import ServiceProvidersPage from './components/ServiceProvidersPage'
import ProfilePage from './components/ProfilePage'
import ProtectedRoute from './components/ProtectedRoute'

const App =()=>(
  <BrowserRouter>
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/" element={
        <ProtectedRoute>
          <DashBoardPage />
        </ProtectedRoute>} />
      <Route path="/service/:serviceId" element={<ProtectedRoute><ServiceProvidersPage /></ProtectedRoute>} />
      <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
    </Routes>
  </BrowserRouter>
)

export default App