import React, { useEffect, useRef, useState } from 'react';
import { marked } from 'marked';


const Product: React.FC = () => {

  const [content, setContent] = useState<string>("**Welcome to Markin App**");
  const editorBox = useRef<HTMLDivElement | null>(null);
  const [preview, setPreview] = useState<string>("");

  const inputHandler = () => {
    if (editorBox.current) {
      const rawMarkdown = editorBox.current.textContent || "";
      setContent(rawMarkdown);
    }
  };

  useEffect(() => {
    const converMarkdown = async () => {
      const md = await marked(content);
      setPreview(md);
    };
    converMarkdown();
  }, [content]);


  useEffect(() => {
    if (editorBox.current) {
      editorBox.current.textContent = content;
    };
  }, []);


  return (
    <div className='mt-4'>
      <div id="main-wrapper" className='flex flex-row gap-1.5 max-lg:flex-col'>
        <div id="main-container-editor" className='flex flex-col gap-2.5 px-4 py-2 w-1/2'>
          <div id="file-name">
            <input type="text" name='file-name' id='file-name' placeholder='Your File Name....' className='w-full border border-stone-200 py-1.5 px-1.5 rounded-lg outline-none' />
          </div>
          <div id="toolbar" className='flex flex-row w-full items-center gap-1.5'>
            <button id="undo" title='Undo' className='flex py-1.5 px-1.5 border border-stone-300 hover:bg-stone-100 cursor-pointer rounded-md'>
              <span className="flex material-symbols-outlined">
                undo
              </span>
            </button>
            <button id="redo" title='Redo' className='flex py-1.5 px-1.5 border border-stone-300 hover:bg-stone-100 cursor-pointer rounded-md'>
              <span className="flex material-symbols-outlined">
                redo
              </span>
            </button>
            <button id="bold-btn" title='Bold' className='flex py-1.5 px-1.5 border border-stone-300 hover:bg-stone-100 cursor-pointer rounded-md'>
              <span className="flex material-symbols-outlined">
                format_bold
              </span>
            </button>
            <button id="italic-btn" title='Italic' className='flex py-1.5 px-1.5 border border-stone-300 hover:bg-stone-100 cursor-pointer rounded-md'>
              <span className="flex material-symbols-outlined">
                format_italic
              </span>
            </button>
            <button id="quote" title='BlockQuote' className='flex py-1.5 px-1.5 border border-stone-300 hover:bg-stone-100 cursor-pointer rounded-md'>
              <span className="flex material-symbols-outlined">
                format_quote
              </span>
            </button>
            <button id="code-block" title='Code Snippet' className='flex py-1.5 px-1.5 border border-stone-300 hover:bg-stone-100 cursor-pointer rounded-md'>
              <span className="flex material-symbols-outlined">
                data_object
              </span>
            </button>
            <button id="underline" title='Underline' className='flex py-1.5 px-1.5 border border-stone-300 hover:bg-stone-100 cursor-pointer rounded-md'>
              <span className="flex material-symbols-outlined">
                format_underlined
              </span>
            </button>
            <button id="comment" title='Comment' className='flex py-1.5 px-1.5 border border-stone-300 hover:bg-stone-100 cursor-pointer rounded-md'>
              <span className="flex material-symbols-outlined">
                tag
              </span>
            </button>
            <button id="clear-editor" title='Clear Editor' className='flex py-1.5 px-1.5 border border-stone-300 hover:bg-stone-100 cursor-pointer rounded-md'>
              <span className="flex material-symbols-outlined">
                refresh
              </span>
            </button>
          </div>
          <div id="md-editor-box">
            <div id="editor" ref={editorBox} onInput={inputHandler} contentEditable suppressContentEditableWarning className='border border-stone-300 rounded-md px-2.5 py-1.5 outline-none w-full overflow-y-auto' />
          </div>
        </div>

        <div id="main-preview-panel" className='flex flex-col gap-2.5 w-1/2 px-4 py-2 border border-stone-200 rounded-md'>
          <h1 className='font-semibold text-2xl'>Preview</h1>
          <div id="preview" className='w-full rounded-md' dangerouslySetInnerHTML={{ __html: preview }} />

        </div>
      </div>
    </div>
  )
}

export default Product;
