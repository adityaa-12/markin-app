import React, { useEffect, useRef, useState } from 'react';
import { marked } from 'marked';
import "../styles/github-markdown-light.css";
import { v4 as uuidv4 } from 'uuid';
import { useLocation } from 'react-router-dom';


const Product: React.FC = () => {

  const [history, setHistory] = useState<string[]>([]);
  const [index, setIndex] = useState<number>(-1);

  const [content, setContent] = useState<string>("**Welcome to Markin App**");
  const editorBox = useRef<HTMLDivElement | null>(null);
  const [preview, setPreview] = useState<string>("");

  interface globalType {
    file_name: string;
    file_content: string;
    created_at: string;
    file_id: string;
  };

  let currDate = new Date().toUTCString();

  const [global, setGlobal] = useState<globalType>({
    file_name: "",
    file_content: content,
    created_at: "",
    file_id: "",
  });

  const SaveFile = () => {
    if (global.file_name || global.file_content) {

      let getFiles = JSON.parse(localStorage.getItem("markin-files") || "[]");
      let isExistIndex = getFiles.findIndex((file: globalType) => file.file_id === global.file_id);

      const updateFile = {
        ...global,
        file_content: content,
        created_at: currDate,
      };

      if (isExistIndex !== -1) {
        getFiles[isExistIndex] = updateFile;
        localStorage.setItem("markin-files", JSON.stringify(getFiles));
        console.log("Updated!");
      } else {
        updateFile.file_id = uuidv4();
        getFiles.push(updateFile);
        localStorage.setItem("markin-files", JSON.stringify(getFiles));
        console.log("New File Saved!");

      }
    } else {
      alert("Got a problem, while saving ur file!");
    }

  }

  const inputHandler = () => {
    if (editorBox.current) {
      const rawMarkdown = editorBox.current.innerText || '';
      setContent(rawMarkdown);

      setHistory((prev) => {
        const updateContent = [...prev.slice(0, index + 1), rawMarkdown];
        setIndex(updateContent.length - 1);
        return updateContent;
      });
    };
  };
  
  const undoBtn = () => {
    if (index > 0) {
      const newIndex = index - 1;
      setIndex(newIndex);
      const previousContent = history[newIndex];
      setContent(previousContent);

      if (editorBox.current) {
        editorBox.current.innerText = previousContent;
      };
    };
  };

  const redoBtn = () => {
    if (index < history.length - 1) {
      const newIndex = index + 1;
      setIndex(newIndex);
      const nextContent = history[newIndex];
      setContent(nextContent);

      if (editorBox.current) {
        editorBox.current.innerText = nextContent;
      }
    }
  }

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

  const location = useLocation();
  const file = location.state as globalType;

  const queryParams = new URLSearchParams(location.search);
  const isEditing = queryParams.get("isEditing") === "1";

  useEffect(() => {
    if (file && isEditing) {
      if (editorBox.current) {
        editorBox.current.innerText = file.file_content;
      }
      setGlobal({ ...file });
      setContent(file.file_content);
      setIndex(0);
      setHistory([file.file_content]);
    } else {
      setGlobal({
        file_content: "",
        file_id: "",
        created_at: "",
        file_name: "",
      });
      setContent("**Welcome to Markdown Editor**");
      setHistory(["**Welcome to Markdown Editor**"]);
      setIndex(0);
    }
  }, []);

  const resetAll = () => {
    if (editorBox.current) {
      editorBox.current.innerText = "";
      setGlobal((prev) => ({...prev, file_content: "", file_name: "", file_id: "", created_at: ""}));
      setContent("");
    } else {
      return;
    }
  }

  const Boldbtn = () => {
    if (!editorBox.current) return;

    const selection = window.getSelection();

    if (!selection || selection.rangeCount == 0) return;

    const range = selection.getRangeAt(0);
    const selectedText = range.toString();

    const boldText = selectedText ? `**${selectedText}**` : `**bold**`;

    range.deleteContents();
    range.insertNode(document.createTextNode(boldText));

    inputHandler()
  }
  

  return (
    <div className='mt-4'>
      <div id="main-wrapper" className='flex flex-row gap-2.5 max-lg:flex-col'>
        <div id="main-container-editor" className='flex flex-col gap-2.5 px-4 py-2 w-1/2 max-lg:w-full border border-stone-300 rounded-md'>
          <div id="file-name">
            <input type="text" name='file_name' id='file_name' value={global.file_name} onChange={(e) => setGlobal((prev) => ({ ...prev, file_name: e.target.value }))} placeholder='Your File Name....' className='w-full py-1.5 px-1.5 rounded-lg outline-none' />
          </div>
          <div id="toolbar" className='flex flex-row w-full items-center gap-1.5 overflow-y-auto'>
            <button id="undo" onClick={() => undoBtn()} title='Undo' className='flex py-1.5 px-1.5 border border-stone-300 hover:bg-stone-100 cursor-pointer rounded-md'>
              <span className="flex material-symbols-outlined">
                undo
              </span>
            </button>
            <button id="redo" title='Redo' onClick={() => redoBtn()} className='flex py-1.5 px-1.5 border border-stone-300 hover:bg-stone-100 cursor-pointer rounded-md'>
              <span className="flex material-symbols-outlined">
                redo
              </span>
            </button>
            <button id="bold-btn" onClick={() => Boldbtn()} title='Bold' className='flex py-1.5 px-1.5 border border-stone-300 hover:bg-stone-100 cursor-pointer rounded-md'>
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
            <button id="bullet-list" title='Bullet List' className='flex py-1.5 px-1.5 border border-stone-300 hover:bg-stone-100 cursor-pointer rounded-md'>
              <span className="flex material-symbols-outlined">
                format_list_bulleted
              </span>
            </button>
            <button id="Number-list" title='Number List' className='flex py-1.5 px-1.5 border border-stone-300 hover:bg-stone-100 cursor-pointer rounded-md'>
              <span className="flex material-symbols-outlined">
                format_list_numbered
              </span>
            </button>
          </div>
          <div id="md-editor-box">
            <div id="editor" ref={editorBox} onInput={inputHandler} contentEditable suppressContentEditableWarning className='h-[620px] rounded-md px-2.5 py-1.5 outline-none w-full overflow-y-auto' />
          </div>
          <div id="md-btns" className='w-full flex flex-row gap-1.5 font-medium max-md:flex-col'>
            <button id="save" className='w-full bg-black text-white py-1.5 cursor-pointer' onClick={() => SaveFile()}>Save</button>
            <button id="reset-all" className='w-full bg-gray-300 text-black py-1.5 cursor-pointer' onClick={() => resetAll()}>Reset All</button>
          </div>
        </div>

        <div id="main-preview-panel" className='flex w-1/2 px-4 py-2 markdown-body border border-stone-200 rounded-md h-[800px] max-lg:w-full overflow-y-auto'>
          <div id="preview" className='w-full rounded-md' dangerouslySetInnerHTML={{ __html: preview }} />

        </div>
      </div>
    </div>
  )
}

export default Product;
