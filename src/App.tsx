import React from 'react'
import Head from './components/Head'
import Product from './components/Product'
import ShowFiles from './components/ShowFiles'

const App: React.FC = () => {

  return (
    <div className='w-[80vw] max-sm:w-[90vw] mx-auto h-[1200px]'>
      <Head />
      <Product />
      <ShowFiles /> 
    </div>
  )
}

export default App
