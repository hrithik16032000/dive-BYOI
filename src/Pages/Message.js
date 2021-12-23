import React from 'react'

const Message = () => {
    return (
        <div>
            {
                !localStorage.getItem("jtoken") ?
                    window.location.href = "/login" : null
            }
            <h1>Friends</h1>
        </div>
    )
}

export default Message
