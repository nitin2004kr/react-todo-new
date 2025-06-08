import React from 'react'

function EmailShare({ btnText, btnStyle, mailSubject, mailBody }) {

    const subject = encodeURIComponent(mailSubject);
    const body = encodeURIComponent(mailBody);

    const mailToLInk = `mailto:?subject=${subject}&body=${body}`;
    return (
        <>
            <a
                href={mailToLInk}
                className={btnStyle}
            >
                {btnText}
            </a>
        </>
    )
}

export default EmailShare