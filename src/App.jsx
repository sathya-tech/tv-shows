import React from 'react'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Home from './pages/Home/Home'
import Form from './components/Form'
import AboutPage from './AboutPage'

const App = () => {
  return (
      <BrowserRouter>
          <Routes>
              <Route index element={<Home />}></Route>
              <Route path='/:id' element={<AboutPage/>}></Route>
              <Route path='/register' element={<Form/>}></Route>
        </Routes>
      </BrowserRouter>
  )
}

export default App


