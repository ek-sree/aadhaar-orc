import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Routing from './routes/Routing'

function App() {

  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path='/*' element={<Routing/>}/>
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
