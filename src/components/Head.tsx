import React from 'react'

const Head: React.FC = () => {
    return (
        <div>
            <div id="main-head" className='flex flex-row justify-between px-4 py-2.5 items-center flex-wrap'>
                <a href='/' id="left-logo" className='font-bold text-xl'>
                    Markin
                </a>
                <div id="mid-links" className=''>
                    <div id="flex" className='flex flex-row items-center gap-8 max-sm:gap-2.5'>
                        <a href="/files" className='hover:underline'>Files</a>
                        <a href="/editor?isEditing=0" className='hover:underline'>Let's Start</a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Head
