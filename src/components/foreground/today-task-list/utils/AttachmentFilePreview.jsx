import React from 'react'
import { ImCross } from "react-icons/im";
import { Swiper, SwiperSlide } from 'swiper/react';
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

function AttachmentFilePreview({ uploadFile, closeAttachmentPreview, imgwidth, imgUrl }) {
    // -- pass the close comand to the parent component
    const closeAttachmentPreviewComponent = (data) => {
        closeAttachmentPreview(data);
    };

    return (
        <div className='absolute top-0 left-0 bg-zinc-700/50 h-full w-full rounded-xl border-2 z-100'>
            <ImCross
                className="text-zinc-700 relative top-[3%] left-[94.7%]"
                fontSize={"13px"}
                onClick={() => closeAttachmentPreviewComponent(false)}
            />
            <div className='flex justify-center items-center h-full w-full px-3'>
                <div className={`${!imgUrl ? 'bg-white py-8' : 'shadow-[-3px_0_15px_rgba(0,0,0,0.2)]'} flex justify-center items-center flex-col mx-10  rounded-2xl  px-8 w-full`}>
                    {!imgUrl ? <Swiper
                        modules={[Navigation, Pagination, Autoplay]}
                        spaceBetween={30}
                        slidesPerView={1}
                        autoplay={{ delay: 9000 }}
                        loop={true}
                        navigation
                        pagination={{ clickable: true }}
                    >
                        {
                            uploadFile?.length !== 0 ? (
                                uploadFile?.map((f) => (
                                    <SwiperSlide key={f.public_id}>
                                        <img src={f.secure_url} alt='no file' style={{ width: imgwidth ? imgwidth : '100%', objectFit: "contain", height: "300px", }} className='shadow-[-3px_0_15px_rgba(0,0,0,0.2)]' />
                                    </SwiperSlide>
                                ))
                            ) : "No File Here!"
                        }
                    </Swiper> :
                        imgUrl ? (
                            <img src={imgUrl} alt='no file' style={{ width: imgwidth ? imgwidth : '100%', objectFit: "contain", height: '500px' }} className='shadow-[-3px_0_15px_rgba(0,0,0,0.2)]' />
                        ) : "No File Here!"
                    }
                </div>
            </div>
        </div>
    )
}

export default AttachmentFilePreview