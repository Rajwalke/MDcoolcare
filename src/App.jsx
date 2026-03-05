
import { Outlet } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar'

function App() {
  return (
   <div>
      <Navbar/>
      <div className='pt-14 md:pt-12'>
        <Outlet/>
      </div>
      
   </div>
  )
}



export default App
