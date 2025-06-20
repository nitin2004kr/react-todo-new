import React from 'react'

function WhatsappShare({ btnText, btnStyle, message }) {

    const encodedMessage = encodeURIComponent(message);
    const shareUrl = `https://wa.me/?text=${encodedMessage}`;

    return (
        <div>
            <a href={shareUrl} target='blank' className={btnStyle}>
                {btnText}
            </a>
        </div>
    )
}

export default WhatsappShare