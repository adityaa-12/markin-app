import React from 'react'
import Head from './components/Head'
import Product from './components/Product'

const App: React.FC = () => {

  return (
    <div className='w-[80vw] max-sm:w-[90vw] mx-auto'>
      <Head />
      <Product />
    </div>
  )
}

export default App
