import { useState } from 'react'

import ProfileTable from './ProfileTable'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <ProfileTable/>
      
    </>
  )
  
}

export default App
