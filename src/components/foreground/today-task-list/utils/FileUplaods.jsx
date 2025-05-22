import React, { useEffect, useRef, useState } from 'react'
import { RxCross2 } from "react-icons/rx";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { GoHorizontalRule } from "react-icons/go";
import { toast } from 'react-toastify';
import { FaEye } from "react-icons/fa";
import AttachmentFilePreview from './AttachmentFilePreview';

function FileUplaods({ handleUploadChange, editUploadData }) {
    const uploadImageRef = useRef(null); // -- reference of input file type;
    const [uploadedFiles, setUploadedFiles] = useState([]); // -- state to hold the final array of uplaoded files;
    const [isUploadingList, setIsUploadingList] = useState([]); // -- state to hold the uploaded files to render in list of uploading;
    const [showUplaodedFilePreview, setShowUplaodedFilePreview] = useState(false) // -- state to show preview of clicked uploaded image;
    const [imgUrl, setImgUrl] = useState(null); // -- state to pass the image url in the view attachment to preview single image;

    // -- onclick method to activated the input file type 
    const handleUplaodFileClick = () => {
        uploadImageRef.current.click();
    };

    // -- onDrop method to get the drag-drop files
    const handleDrop = (e) => {
        e.preventDefault()
        // setIsUploading(true);
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
        // Optional: save the original filename as a custom variable (won't affect Cloudinary processing)
        const originalName = files.name;
        data.append('context', `caption=${originalName}`); // can be used later via API


        try {
            const res = await fetch('https://api.cloudinary.com/v1_1/dxdh4j6fr/image/upload', {
                method: 'POST',
                body: data
            })

            const result = await res.json();
            if (!result) {
                toast.warning('something went wrong');
            }
            setIsUploadingList((prev) => ([
                ...prev,
                { ...result, originalName }
            ]))
            return result;
        } catch (err) {
            console.log(err);
        }
    };

    // -- onChange method for uplaod the files
    const handleUplaodFIle = async (e) => {
        const fileArr = e.target ? e.target.files : e;
        if (!fileArr) return;

        // loop through the fieArr
        for (let i = 0; i < fileArr.length; i++) {
            let url = await uploadFileToCloudinary(fileArr[i]);
            setUploadedFiles((prev) => ([
                ...prev,
                url
            ]));
        }
    };

    // method to cancle the uplaoded particualr image in from uploading containe;
    const handleRemoveFile = (imageId) => {
        const updatedImageList = isUploadingList.filter((f) => f.public_id !== imageId)
        setIsUploadingList(updatedImageList);
        setUploadedFiles(updatedImageList);
    }

    // -- passing the all final files to the parent component 
    useEffect(() => {
        handleUploadChange(uploadedFiles);
    }, [uploadedFiles])

    // -- format the file particular uplaoded file size
    const formatBytes = (bytes, decimals = 2) => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const dm = decimals < 0 ? 0 : decimals;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];

        const i = Math.floor(Math.log(bytes) / Math.log(k));
        const size = parseFloat((bytes / Math.pow(k, i)).toFixed(dm));
        return `${size} ${sizes[i]}`;
    };

    // -- close the image preview component
    const closeAttachmentPreview = (close) => {
        setShowUplaodedFilePreview(close);
        setImgUrl(null);
    };

    const prevEditDataRef = useRef(null);

    useEffect(() => {
        const currentDataStr = JSON.stringify(editUploadData);
        const prevDataStr = JSON.stringify(prevEditDataRef.current);

        if (
            editUploadData?.length > 0 &&
            currentDataStr !== prevDataStr
        ) {
            prevEditDataRef.current = editUploadData;
            setIsUploadingList([...editUploadData]);
            setUploadedFiles([...editUploadData]);
        }
    }, [editUploadData]);


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
                    Uplaoding ({isUploadingList?.length})
                </label>
                <div className='min-h-[90%] overflow-y-auto '>
                    {
                        isUploadingList?.length !== 0 ? isUploadingList?.map((f, i) => (
                            <div className="my-2 w-full h-[12%] flex mt-3">
                                <div className="flex justify-start items-center gap-3  h-[100%] w-full">
                                    <div className="bg-zinc-100 border-3 border-blue-500 h-[33px] w-[33px] rounded-full flex justify-center items-center  ">
                                        <p className="text-[9px] font-bold text-blue-500 ">100%</p>
                                    </div>

                                    <div className="border-3 border-blue-500 bg-zinc-100 rounded-3xl w-70 h-full flex justify-between items-center px-3">
                                        <h1 className="text-sm font-semibold  w-[40%] truncate">{f?.context?.custom?.caption}</h1> {/* file name */}
                                        <div className='flex justify-center items-center gap-3'>
                                            <p className="text-[10px]">{formatBytes(f.bytes)} / {formatBytes(f.bytes)}</p> {/* file size */}
                                            <FaEye className='text-blue-500' onClick={() => {
                                                setShowUplaodedFilePreview(true)
                                                setImgUrl(f.secure_url)
                                            }
                                            }
                                            /> {/* file preview */}
                                        </div>
                                    </div>

                                    <div>
                                        <RxCross2 className="text-zinc-500" size={20} onClick={() => handleRemoveFile(f.public_id)} />
                                    </div>
                                </div>
                            </div>
                        )) :
                            <div className="border-3 border-blue-500 bg-zinc-100 rounded-3xl w-95 h-[10%] flex justify-center items-center px-2 mt-5">
                                <h1 className="text-sm font-semibold">No Files Uploaded Yet!</h1>
                            </div>
                    }
                </div>

            </div>

            {
                showUplaodedFilePreview &&
                <div className=''>
                    <AttachmentFilePreview uploadFile={uploadedFiles} closeAttachmentPreview={closeAttachmentPreview} imgwidth={'80%'} imgUrl={imgUrl} />
                </div>
            }
        </>
    )
}

export default FileUplaods