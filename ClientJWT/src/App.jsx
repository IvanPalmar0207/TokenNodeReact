import {BrowserRouter, Routes, Route} from 'react-router-dom'
//Pages
import RegisterPage from './pages/registerPage'
import LoginPage from './pages/loginPage'
import { AuthProvider } from './context/authContext'

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<h1>Hola</h1>}/>
          <Route path='/login' element={<LoginPage />}/>
          <Route path='/register' element={<RegisterPage />}/>
          <Route path='/tasks' element={<h1>Tasks</h1>}/>
          <Route path='/addTasks' element={<h1>AddTask</h1>}/>
          <Route path='/task/:id' element={<h1>Task</h1>}/>
          <Route path='/profile' element={<h1>Hola</h1>}/>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
