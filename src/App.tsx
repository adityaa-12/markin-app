import React from 'react'
import Head from './components/Head'
import Product from './components/Product'
import ShowFiles from './components/ShowFiles'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './components/Home'
import NotFound from './components/NotFound'

const App: React.FC = () => {

  return (
    <div className='w-[80vw] max-sm:w-[90vw] mx-auto'>
      <Head />
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/editor' element={<Product />} />
          <Route path='/files' element={<ShowFiles />} />
          <Route path='*' element={<NotFound />} />
        </Routes>

      </BrowserRouter>
    </div>
  )
}

export default App
