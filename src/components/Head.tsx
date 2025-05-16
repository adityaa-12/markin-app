import React from 'react'

const Head: React.FC = () => {
    return (
        <div>
            <div id="main-head" className='flex flex-row justify-between px-4 py-2 items-center flex-wrap shadow'>
                <a href='/' id="left-logo" className='font-bold text-xl'>
                    Markin
                </a>
                <div id="mid-links" className=''>
                    <div id="flex" className='flex flex-row items-center gap-8 max-sm:gap-2.5 font-medium'>
                        <a href="#" className='hover:underline'>About</a>
                        <a href="#" className='hover:underline'>How to Use ?</a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Head
