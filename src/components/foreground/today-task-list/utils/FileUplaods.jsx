import React, { useEffect, useRef, useState } from 'react'
import { RxCross2 } from "react-icons/rx";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { GoHorizontalRule } from "react-icons/go";

function FileUplaods({ handleUploadChange }) {
    const uploadImageRef = useRef(null); // -- reference of input file type;
    const [uploadedFiles, setUploadedFiles] = useState([]);  // -- state to hold the final array of uplaoded files;

    // -- onclick method to activated the input file type 
    const handleUplaodFileClick = () => {
        uploadImageRef.current.click();
    };


    // -- onDrop method to get the drag-drop files
    const handleDrop = (e) => {
        e.preventDefault()
        const file = e.dataTransfer.files;
        handleUplaodFIle(file)
    };

    // -- onDragOver method to stop redirect to new tab,and other activities after drop the file
    const handleDragOver = (e) => {
        e.preventDefault();
        e.stopPropagation();
    };

    // -- method to save the files in cloudinary
    const uploadFileToCloudinary = async (files) => {
        const data = new FormData();
        data.append('file', files);
        data.append('upload_preset', 'react-todo-app-new');
        data.append('cloud_name', "dxdh4j6fr");

        try {
            const res = await fetch('https://api.cloudinary.com/v1_1/dxdh4j6fr/image/upload', {
                method: 'POST',
                body: data
            })

            const result = await res.json();
            return result.secure_url;
        } catch (err) {
            console.log(err);
        }
    };

    // -- onChange method for uplaod the files
    const handleUplaodFIle = async (e) => {
        const fileArr = e.target ? e.target.files : e;
        if (!fileArr) return;

        const fileArrURL = []; // arr to hold the all links and set in state 
        // loop through the fieArr
        for (let i = 0; i < fileArr.length; i++) {
            let url = await uploadFileToCloudinary(fileArr[i]);
            fileArrURL.push(url);
        }
        setUploadedFiles(fileArrURL);
    };

    // -- passing the all final files to the parent component 
    useEffect(() => {
        handleUploadChange(uploadedFiles);
    }, [uploadedFiles])


    return (
        <>
            {/* --- upload input ---  */}
            <div className="w-1/2 flex flex-col h-full pt-2">
                <label className="text-zinc-900 font-semibold text-xl block">
                    File Uplaod
                </label>

                <div className="border-3 border-dashed border-blue-500 my-2 rounded-2xl w-full flex flex-1 justify-center items-center" >
                    <input
                        type='file'
                        style={{ display: 'none' }}
                        ref={uploadImageRef}
                        onChange={(e) => handleUplaodFIle(e)}
                        multiple
                    />

                    <div className="w-full h-full rounded-2xl flex flex-col justify-center items-center" onClick={handleUplaodFileClick} onDrop={handleDrop} onDragOver={handleDragOver}>
                        <div>
                            <AiOutlineCloudUpload className="text-8xl text-blue-500" />
                        </div>

                        <p className="font-semibold text-lg text-zinc-900">Drag and Drop Files</p>

                        <div className="flex justify-center items-center gap-3 w-full">
                            <GoHorizontalRule className="" /> or <GoHorizontalRule />
                        </div>

                        <button type="button" className="text-white text-base my-1 py-2 px-7 bg-blue-600  rounded-full hover:bg-blue-500 flex justify-center items-center">
                            Browse
                        </button>

                    </div>
                </div>
            </div>

            {/* --- uploading section ---  */}
            <div className="w-1/2 flex flex-col h-full py-2 px-4 rounded-2xl bg-blue-100 shadow-[-3px_0_15px_rgba(0,0,0,0.2)]">
                <label className="text-zinc-900 font-semibold text-xl block">
                    Uplaoding
                </label>

                <div className="my-2 w-full flex flex-1 mt-3">
                    <div className="flex justify-start items-center gap-3  h-[12%] w-full">
                        <div className="bg-zinc-100 border-3 border-blue-500 h-[33px] w-[33px] rounded-full flex justify-center items-center  ">
                            <p className="text-[9px] font-semibold text-blue-500">100%</p>
                        </div>

                        <div className="border-3 border-blue-500 bg-zinc-100 rounded-3xl w-70 h-full flex justify-between items-center px-2">
                            <h1 className="text-sm font-semibold  ">Example_1.png</h1>
                            <p className="text-[10px]">150 KB / 105 KB</p>
                        </div>

                        <div>
                            <RxCross2 className="text-zinc-500" size={20} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default FileUplaods