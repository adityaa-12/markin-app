import React from 'react'

const Head: React.FC = () => {
    return (
        <div>
            <div id="main-head" className='flex flex-row justify-between px-4 py-2 items-center flex-wrap'>
                <div id="left-logo" className='font-bold text-2xl'>
                    Markin
                </div>
                <div id="mid-links" className='max-[550px]:hidden'>
                    <div id="flex" className='flex flex-row items-center gap-8 font-medium'>
                        <a href="#" className='hover:underline'>About</a>
                        <a href="#" className='hover:underline'>How to Use ?</a>
                    </div>
                </div>
                <div id="btns" className='flex flex-row items-center gap-4'>
                    <button id="dark-mode" className='flex bg-stone-200 p-1 rounded-lg hover:bg-stone-300 cursor-pointer'>
                        <span className="flex material-symbols-outlined">
                            dark_mode
                        </span>
                    </button>
                    <button id="menu" className='flex bg-stone-200 p-1 rounded-lg hover:bg-stone-300 cursor-pointer'>
                        <span className="flex material-symbols-outlined">
                            dehaze
                        </span>
                    </button>
                </div>
            </div>
            <div id="main-options">
                <div id="c-options" className='bg-stone-100 w-fit p-2 font-medium'>
                    <button id="undo" className='flex flex-row items-center gap-2.5 px-2.5 py-1.5 cursor-pointer hover:bg-stone-200 w-full'>
                        <span className="flex material-symbols-outlined">
                            undo
                        </span>
                        Undo
                    </button>
                      <button id="redo" className='flex flex-row items-center gap-2.5 px-2.5 py-1.5 cursor-pointer hover:bg-stone-200 w-full'>
                        <span className="flex material-symbols-outlined">
                            redo
                        </span>
                        Redo
                    </button>
                      <button id="reset" className='flex flex-row items-center gap-2.5 px-2.5 py-1.5 cursor-pointer hover:bg-stone-200 w-full'>
                        <span className="flex material-symbols-outlined">
                            refresh
                        </span>
                        Reset All
                    </button>
                    <button id="about" className='flex flex-row items-center gap-2.5 px-2.5 py-1.5 cursor-pointer hover:bg-stone-200 w-full'>
                        <span className="flex material-symbols-outlined">
                            info
                        </span>
                        About Markin
                    </button>
                    <button id="undo" className='flex flex-row items-center gap-2.5 px-2.5 py-1.5 cursor-pointer hover:bg-stone-200 w-full'>
                        <span className="flex material-symbols-outlined">
                            help
                        </span>
                        How to Use
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Head
