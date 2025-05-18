import React from 'react'
import Head from './components/Head'
import Product from './components/Product'
import ShowFiles from './components/ShowFiles'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './components/Home'
import NotFound from './components/NotFound'
import Helmet from "react-helmet"
import { Analytics } from "@vercel/analytics/next"

const App: React.FC = () => {

  return (
    <>
      {/* SEO */}

      <Helmet>
        <title>Markin - Simple, Clean Markdown Editor</title>
        <meta name='description' content='Free online Markdown editor built with react.' />
        <meta property='og:title' content='Markdown Editor' />
        <meta property='og:description' content='Edit and Download Markdown Easily.' />
        <meta property="og:type" content='Website'/>
        <link rel="canonical" href="/"/>
      </Helmet>
      <Analytics />

      {/* APP */}
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
    </>
  )
}

export default App
