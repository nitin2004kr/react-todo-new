import React, { useState } from 'react'
import { PiWarningFill } from "react-icons/pi";

function DeleteModal({ taskTitle, handledeleteTask }) {
    // -- delete method for task
    const handledelete = (data) => {
        handledeleteTask(data);
    }
    return (
        <div className='absolute top-0 left-0 bg-zinc-400/50 h-full w-full'>
            <div className='flex justify-center items-center h-full w-full'>
                <div className='flex justify-center items-center flex-col mx-10 bg-white rounded-2xl py-8 px-3'>
                    <div className='h-[50px] w-[50px] rounded-full flex justify-center items-center bg-red-200/50'>
                        <PiWarningFill className='text-red-500 text-2xl' />
                    </div>
                    <div className='w-[70%] text-center mt-4'>
                        <h1 className='font-bold text-xl'>Delete Task</h1>
                        <p className=' text-sm mt-2'>You're going to delete the <span className='font-semibold'>'{taskTitle}'</span> task. Are you Sure ?</p>
                    </div>
                    <div className='mt-5 flex justify-center items-center gap-5 font-semibold'>
                        <button className='bg-zinc-200 hover:bg-zinc-300 px-6 py-2 rounded-full' onClick={() => handledelete(false)}>No, Keep it.</button>
                        <button className='bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-full' onClick={() => handledelete(true)}>Yes, Delete!</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DeleteModal