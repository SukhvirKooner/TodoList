import LoginSignup from './pages/home.tsx'
import Todos from './pages/todo.tsx'
import './App.css'
import { BrowserRouter,Routes, Route } from 'react-router-dom'

function App() {
  

  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<LoginSignup/>} />
        <Route path='/todos' element={<Todos/>} />
      </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
