import React, { useEffect, useRef, useState } from 'react';
import { marked } from 'marked';
import { v4 as uuidv4 } from 'uuid';
import { useLocation, useNavigate } from 'react-router-dom';
import 'github-markdown-css/github-markdown-light.css';

const Product: React.FC = () => {

  const [history, setHistory] = useState<string[]>([]);
  const [index, setIndex] = useState<number>(-1);

  const [content, setContent] = useState<string>("# Welcome to Markin Editor");
  const editorBox = useRef<HTMLDivElement | null>(null);
  const [preview, setPreview] = useState<string>("");
  const [updateBtn, setUpdateBtn] = useState<boolean>(false);
  const [saveBtn, setSaveBtn] = useState<boolean>(true);

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

  const navigate = useNavigate();

  const SaveFile = () => {
    if (global.file_name && content.trim() !== "") {

      let getFiles = JSON.parse(localStorage.getItem("markin-files") || "[]");

      let findName = getFiles.some((file: globalType) => file.file_name === global.file_name);

      const newFile = {
        ...global,
        file_content: content,
        created_at: currDate,
        file_id: uuidv4(),
      }

      if (findName) {
        alert("File name is already exist!");
      } else {
        getFiles.push(newFile);
        localStorage.setItem("markin-files", JSON.stringify(getFiles));
        alert("New File Saved!");
      }
    } else {
      alert("Please provide a file name and ensure the content is not empty.");
    }
  }

  const SaveEditFile = (Editing: string) => {
    if (Editing === "0") return;

    if (global.file_name && content.trim() !== "") {
      let getFiles = JSON.parse(localStorage.getItem("markin-files") || "[]");

      const findIndex = getFiles.findIndex((file: globalType) => file.file_id === global.file_id);

      if (findIndex !== -1) {
        getFiles[findIndex] = {
          ...global,
          created_at: currDate,
        };
        localStorage.setItem("markin-files", JSON.stringify(getFiles));
        alert("File Updated");
        navigate("/files");
      } else {
        alert("File not found, Maybe it was deleted!");
        return;
      }
    } else {
      alert("Please provide a file name and ensure the content is not empty.");
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
      marked.setOptions({
        breaks: true,
        gfm: true,
      })
      setPreview(md);
    };
    converMarkdown();
  }, [content]);


  useEffect(() => {
    if (editorBox.current) {
      editorBox.current.innerText = content;
    };
  }, []);

  const location = useLocation();
  const file = location.state as globalType;

  const [isEditing, setEditing] = useState("0");

  const queryParams = new URLSearchParams(location.search);
  const Editing = queryParams.get("isEditing") === "1";

  useEffect(() => {
    if (Editing) {
      setEditing("1");
      setUpdateBtn(true);
      setSaveBtn(false);
    };
  }, [location.search]);

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
      setContent("# Welcome to Markin Editor");
      setHistory(["# Welcome to Markin Editor"]);
      setIndex(0);
    }
  }, []);

  const resetAll = () => {
    if (editorBox.current) {
      editorBox.current.innerText = "";
      setGlobal((prev) => ({ ...prev, file_content: "", file_name: "", file_id: "", created_at: "" }));
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
    const textNode = document.createTextNode(boldText);
    range.insertNode(textNode);

    range.setStartAfter(textNode);
    range.setEndAfter(textNode);
    selection.removeAllRanges();
    selection.addRange(range);

    inputHandler();
  }

  const ItalicBtn = () => {
    if (!editorBox.current) return;

    const selection = window.getSelection();

    if (!selection || selection.rangeCount == 0) return;

    const range = selection.getRangeAt(0);
    const selectedText = range.toString();

    const italicText = selectedText ? `*${selectedText}*` : `*Italic*`;

    range.deleteContents();
    const textNode = document.createTextNode(italicText);
    range.insertNode(textNode);

    range.setStartAfter(textNode);
    range.setEndAfter(textNode);
    selection.removeAllRanges();
    selection.addRange(range);

    inputHandler();
  }

  const HeadBtn = () => {
    if (!editorBox.current) return;

    const selection = window.getSelection();

    if (!selection || selection.rangeCount == 0) return;

    const range = selection.getRangeAt(0);
    const selectedText = range.toString();

    const Head = selectedText ? `# ${selectedText}` : `# Heading`;

    range.deleteContents();
    const textNode = document.createTextNode(Head);
    range.insertNode(textNode);

    range.setStartAfter(textNode);
    range.setEndAfter(textNode);
    selection.removeAllRanges();
    selection.addRange(range);

    inputHandler();
  }

  const BlockBtn = () => {
    if (!editorBox.current) return;

    const selection = window.getSelection();

    if (!selection || selection.rangeCount == 0) return;

    const range = selection.getRangeAt(0);
    const selectedText = range.toString();

    const blockText = selectedText ? selectedText.split("\n").map(line => `> ${line}`).join('\n') : `> BlockQuote`;
    range.deleteContents();
    const textNode = document.createTextNode(blockText);
    range.insertNode(textNode);

    range.setStartAfter(textNode);
    range.setEndAfter(textNode);
    selection.removeAllRanges();
    selection.addRange(range);

    inputHandler();
  }

  const CodeBtn = () => {
    if (!editorBox.current) return;

    const selection = window.getSelection();

    if (!selection || selection.rangeCount == 0) return;

    const range = selection.getRangeAt(0);
    const selectedText = range.toString();

    const codeText = selectedText ? `\`${selectedText}\`` : `\`code\``;
    range.deleteContents();
    const textNode = document.createTextNode(codeText);
    range.insertNode(textNode);

    range.setStartAfter(textNode);
    range.setEndAfter(textNode);
    selection.removeAllRanges();
    selection.addRange(range);

    inputHandler();
  }

  const StrikeBtn = () => {
    if (!editorBox.current) return;

    const selection = window.getSelection();

    if (!selection || selection.rangeCount == 0) return;

    const range = selection.getRangeAt(0);
    const selectedText = range.toString();

    const strikeText = selectedText ? `~~${selectedText}~~` : `~~Strike~~`;
    range.deleteContents();
    const textNode = document.createTextNode(strikeText);
    range.insertNode(textNode);

    range.setStartAfter(textNode);
    range.setEndAfter(textNode);
    selection.removeAllRanges();
    selection.addRange(range);

    inputHandler();
  };

  const BulletBtn = () => {
    if (!editorBox.current) return;

    const selection = window.getSelection();

    if (!selection || selection.rangeCount == 0) return;

    const range = selection.getRangeAt(0);
    const selectedText = range.toString();

    const bullet = selectedText ? selectedText.split("\n").map(line => `- ${line}`).join("\n") : `- Bullet Item`;
    range.deleteContents();
    const textNode = document.createTextNode(bullet);
    range.insertNode(textNode);

    range.setStartAfter(textNode);
    range.setEndAfter(textNode);
    selection.removeAllRanges();
    selection.addRange(range);

    inputHandler();
  }

  const NumberBtn = () => {
    if (!editorBox.current) return;

    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0) return;

    const range = selection.getRangeAt(0);
    const selectedText = range.toString();

    const number = selectedText
      ? selectedText
        .split("\n")
        .map((line, idx) => `${idx + 1}. ${line}`)
        .join("\n")
      : `1. Numbered Item`;

    range.deleteContents();
    const textNode = document.createTextNode(number);
    range.insertNode(textNode);

    range.setStartAfter(textNode);
    range.setEndAfter(textNode);
    selection.removeAllRanges();
    selection.addRange(range);

    inputHandler();
  };

  const URLBtn = () => {
    if (!editorBox.current) return;

    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0) return;

    const range = selection.getRangeAt(0);
    const selectedText = range.toString() || "Link Text";

    const url = prompt("Enter URL :");
    if (!url) return;

    const markdownLink = `[${selectedText}](${url})`;

    range.deleteContents();
    const textNode = document.createTextNode(markdownLink);
    range.insertNode(textNode);

    range.setStartAfter(textNode);
    range.setEndAfter(textNode);
    selection.removeAllRanges();
    selection.addRange(range);

    inputHandler();
  }

  return (
    <div className='mt-4'>
      <div id="main-wrapper" className='flex flex-row gap-2.5 max-lg:flex-col'>
        <div id="main-container-editor" className='flex flex-col gap-2.5 px-4 py-2 w-1/2 max-lg:w-full border border-stone-200 rounded-md'>
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
            <button id="italic-btn" title='Italic' onClick={() => ItalicBtn()} className='flex py-1.5 px-1.5 border border-stone-300 hover:bg-stone-100 cursor-pointer rounded-md'>
              <span className="flex material-symbols-outlined">
                format_italic
              </span>
            </button>
            <button id="heading-btn" title='Heading' onClick={() => HeadBtn()} className='flex py-1.5 px-1.5 border border-stone-300 hover:bg-stone-100 cursor-pointer rounded-md'>
              <span className="flex material-symbols-outlined">
                format_h1
              </span>
            </button>
            <button id="quote" title='BlockQuote' onClick={() => BlockBtn()} className='flex py-1.5 px-1.5 border border-stone-300 hover:bg-stone-100 cursor-pointer rounded-md'>
              <span className="flex material-symbols-outlined">
                format_quote
              </span>
            </button>
            <button id="code-block" title='Code Snippet' onClick={() => CodeBtn()} className='flex py-1.5 px-1.5 border border-stone-300 hover:bg-stone-100 cursor-pointer rounded-md'>
              <span className="flex material-symbols-outlined">
                data_object
              </span>
            </button>
            <button id="strike" title='Strike-through' onClick={() => StrikeBtn()} className='flex py-1.5 px-1.5 border border-stone-300 hover:bg-stone-100 cursor-pointer rounded-md'>
              <span className="flex material-symbols-outlined">
                strikethrough_s
              </span>
            </button>
            <button id="bullet-list" title='Bullet List' onClick={() => BulletBtn()} className='flex py-1.5 px-1.5 border border-stone-300 hover:bg-stone-100 cursor-pointer rounded-md'>
              <span className="flex material-symbols-outlined">
                format_list_bulleted
              </span>
            </button>
            <button id="Number-list" title='Number List' onClick={() => NumberBtn()} className='flex py-1.5 px-1.5 border border-stone-300 hover:bg-stone-100 cursor-pointer rounded-md'>
              <span className="flex material-symbols-outlined">
                format_list_numbered
              </span>
            </button>
            <button id="URL" title='Add URL' onClick={() => URLBtn()} className='flex py-1.5 px-1.5 border border-stone-300 hover:bg-stone-100 cursor-pointer rounded-md'>
              <span className="flex material-symbols-outlined">
                link
              </span>
            </button>
          </div>
          <div id="md-editor-box">
            <div id="editor" ref={editorBox} onInput={inputHandler} contentEditable suppressContentEditableWarning className='markdown-body h-[620px] rounded-md px-2.5 py-1.5 outline-none w-full overflow-y-auto' />
          </div>
          <div id="md-btns" className='w-full flex flex-row gap-1.5 font-medium max-md:flex-col'>
            {
              saveBtn && (
                <button id="save" className='w-full bg-blue-600 hover:bg-blue-700 text-white py-1.5 cursor-pointer' onClick={() => SaveFile()}>Save</button>
              )
            }
            {
              updateBtn && (
                <button id="edit" className='w-full bg-blue-600 hover:bg-blue-700 text-white py-1.5 cursor-pointer' onClick={() => SaveEditFile(isEditing)}>Update File</button>
              )
            }
            <button id="reset-all" className='w-full bg-stone-800 text-white hover:bg-stone-950 py-1.5 cursor-pointer' onClick={() => resetAll()}>Reset All</button>
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
