import React, { useEffect, useRef, useState } from 'react';
import { marked } from 'marked';
import "../styles/github-markdown-light.css";


const Product: React.FC = () => {

  const [content, setContent] = useState<string>("**Welcome to Markin App**");
  const editorBox = useRef<HTMLDivElement | null>(null);
  const [preview, setPreview] = useState<string>("");

  interface globalType {
    file_name: string;
    file_content: string;
    created_at: string;
    file_id: string;
  }

  const generateID = (id: number) => {
    const pattern = "abcdefghijklmnopqrstuvwxyz0123456789";
    let new_ID = "";
    for (let i = 0; i < id; i++) {
      const randomIndex = Math.floor(Math.random() * pattern.length);
      new_ID += pattern[randomIndex];
    };
    return new_ID;
  }

  let currDate = new Date().toUTCString();
  let fileID = generateID(12);

  const [global, setGlobal] = useState<globalType>({
    file_name: "",
    file_content: content,
    created_at: currDate,
    file_id: fileID,
  });

  const SaveFile = () => {
    if (!global.file_name || !global.file_content) {
      console.log("empty");
    } else {
      console.log("True");
      
    }

  }

  const inputHandler = () => {
    if (editorBox.current) {
      const rawMarkdown = editorBox.current.innerText || '';
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
        <div id="main-container-editor" className='flex flex-col gap-2.5 px-4 py-2 w-1/2 max-lg:w-full'>
          <div id="file-name">
            <input type="text" name='file_name' id='file_name' value={global.file_name} onChange={(e) => setGlobal((prev) => ({ ...prev, file_name: e.target.value }))} placeholder='Your File Name....' className='w-full border border-stone-200 py-1.5 px-1.5 rounded-lg outline-none' />
          </div>
          <div id="toolbar" className='flex flex-row w-full items-center gap-1.5 overflow-y-auto'>
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
            <div id="editor" ref={editorBox} onInput={inputHandler} contentEditable suppressContentEditableWarning className='border h-[600px] border-stone-300 rounded-md px-2.5 py-1.5 outline-none w-full overflow-y-auto' />
          </div>
          <div id="md-btns" className='w-full flex flex-row gap-1.5 font-medium'>
            <button id="save" className='w-full bg-black text-white py-1.5 cursor-pointer' onClick={() => SaveFile()}>Save</button>
            <button id="reset-all" className='w-full bg-black text-white py-1.5 cursor-pointer'>Reset All</button>
          </div>
        </div>

        <div id="main-preview-panel" className='flex w-1/2 px-4 py-2 markdown-body border border-stone-200 rounded-md h-[750px] max-lg:w-full overflow-y-auto'>
          <div id="preview" className='w-full rounded-md' dangerouslySetInnerHTML={{ __html: preview }} />

        </div>
      </div>
    </div>
  )
}

export default Product;
