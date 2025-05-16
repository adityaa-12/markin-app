import React from 'react'
import Head from './components/Head'
import Product from './components/Product'
import Preview from './components/Preview'


const App: React.FC = () => {

  return (
    <div className='w-[80vw] max-sm:w-[90vw] mx-auto'>
      <Head />
      <div className='flex flex-row gap-1.5 max-lg:flex-col'>
      <Product />
      <Preview />
      </div>
    </div>
  )
}

export default App
