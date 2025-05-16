import React from 'react'

const Product: React.FC = () => {
  return (
    <div className='mt-4 w-1/2 max-md:w-full'>
      <div id="main-container" className='flex flex-col gap-2.5 px-4 py-2'>
        <div id="file-name">
            <input type="text" name='file-name' id='file-name' placeholder='Your File Name....' className='w-full border border-stone-200 py-1.5 px-1.5 rounded-lg'/>
        </div>
        <div id="toolbar" className='flex flex-row w-full items-center gap-1.5'>
            <button id="undo">Undo</button>
            <button id="redo">Redo</button>
            <button id="bold-btn">B</button>
            <button id="italic-btn">I</button>
            <button id="quote">BlockQuote</button>  
            <button id="code-block">Code Snippet</button>
            <button id="underline">U</button>
            <button id="storke-through">ab</button>
            <button id="comment">Comment</button>
            <button id="clear-editor">Clear</button>
        </div>
        <div id="md-editor-box">
            
        </div>
      </div>
    </div>
  )
}

export default Product;
