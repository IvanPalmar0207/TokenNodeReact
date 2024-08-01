import {BrowserRouter, Routes, Route} from 'react-router-dom'
//Pages
import RegisterPage from './pages/registerPage'
import LoginPage from './pages/loginPage'
import { AuthProvider } from './context/authContext'
import TaskPage from './pages/TaskPage'
import TaskFormPage from './pages/TaskFormPage'
import HomePage from './pages/HomePage'
import ProfilePage from './pages/ProfilePage'
import ProtectedRoute from './ProtectedRoutes'
import { TaskProvider } from './context/taskContext'
//Navbar
import Navbar from './components/Navbar'

function App() {
  return (
    <AuthProvider>
      <TaskProvider>
      <BrowserRouter>      
      <main className='container mx-auto'>
        <Navbar/>
          <Routes>
            <Route path='/' element={<HomePage />}/>
            <Route path='/login' element={<LoginPage />}/>
            <Route path='/register' element={<RegisterPage />}/>

            <Route element = {<ProtectedRoute />}>
              <Route path='/tasks' element={<TaskPage />}/>
              <Route path='/addTasks' element={<TaskFormPage />}/>
              <Route path='/tasks/:id' element={<TaskFormPage />}/>
              <Route path='/profile' element={<ProfilePage />}/>
            </Route>
          </Routes>
          </main>        
      </BrowserRouter>
      </TaskProvider>
    </AuthProvider>
  )
}

export default App
