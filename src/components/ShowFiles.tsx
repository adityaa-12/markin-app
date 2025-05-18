import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const ShowFiles: React.FC = () => {
    interface fileType {
        file_name: string;
        file_content: string;
        created_at: string;
        file_id: string;
    };

    const [file, setFile] = useState<fileType[]>(() => {
        return JSON.parse(localStorage.getItem("markin-files") || "[]");
    });
    console.log(file);


    const getFiles = () => {
        let Files: fileType[] = JSON.parse(localStorage.getItem("markin-files") || "[]");
        setFile(Files);
    }

    useEffect(() => {
        const handleUpdate = () => {
            getFiles();
        }

        window.addEventListener("updated", handleUpdate);

        return () => {
            window.removeEventListener("updated", handleUpdate);
        }
    }, []);

    const DeleteFile = (id: string) => {
        let confirmDelete = confirm("Are u Sure ?");
        if (confirmDelete) {
            let Files: fileType[] = JSON.parse(localStorage.getItem("markin-files") || "[]");
            const updateFiles = Files.filter(file => file.file_id !== id);
            localStorage.setItem("markin-files", JSON.stringify(updateFiles));
            setFile(updateFiles);
            window.dispatchEvent(new Event("Deleted"));
        } else {
            return;
        }
    }

    const DownloadFile = (file: fileType) => {
        const element = document.createElement("a");
        const blob = new Blob([file.file_content], { type: "text/markdown" });
        element.href = URL.createObjectURL(blob);

        element.download = `${file.file_name}.md`;
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
    }

    const navigate = useNavigate();

    const sendToEdit = (file: fileType) => {
        navigate("/editor?isEditing=1", { state: file });
    }

    return (
        <div className='mt-4'>
            <div id="files-main" className='px-4 py-2'>
                <div id="files-box" className='w-full mt-2.5 flex flex-col gap-1.5'>
                    <h1 className='font-semibold text-2xl'>Your Files</h1>
                    {
                        file.length > 0 ? (
                            file.map((mFile) => (

                                <div id="file" className='flex flex-row justify-between cursor-pointer border border-stone-200 px-1.5 py-1.5 rounded-md' key={mFile.file_id}>
                                    <div id="flex" className='flex flex-row items-center gap-2.5 max-sm:hidden'>
                                        <span className='flex'>
                                            <span className="flex material-symbols-outlined">
                                                description
                                            </span>
                                        </span>
                                        <p id="file_name">{mFile.file_name}</p>
                                    </div>
                                    <div id="flex-1" className='flex flex-row items-center gap-2.5'>
                                        <button id="download" onClick={() => DownloadFile(mFile)} title='Download' className='flex border border-stone-300 rounded-md p-0.5 hover:bg-stone-200 cursor-pointer'><span className="flex material-symbols-outlined">
                                            download
                                        </span></button>
                                        <button id="edit" onClick={() => sendToEdit(mFile)} title='Edit' className='flex border border-stone-300 rounded-md p-0.5 hover:bg-stone-200 cursor-pointer'><span className="flex material-symbols-outlined">
                                            edit
                                        </span></button>
                                        <button id="delete" title='Delete' onClick={() => DeleteFile(mFile.file_id)} className='flex text-red-500 border border-stone-300 rounded-md p-0.5 hover:bg-stone-200 cursor-pointer'>
                                            <span className="flex material-symbols-outlined">
                                                delete
                                            </span>
                                        </button>
                                    </div>
                                </div>
                            ))

                        ) : (
                            <div className='max:sm:text-center mt-4 font-medium'>No Files Found!</div>
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default ShowFiles
