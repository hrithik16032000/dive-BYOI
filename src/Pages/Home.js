import React from 'react'
import bg from "./bg.jpg"

const Home = () => {
    return (
        <div>
            {
                !localStorage.getItem("jtoken") ?
                    window.location.href = "/login" : null
            }
            <div
                style={{
                    backgroundImage: `linear-gradient( rgba(0,0,0,.5), rgba(0,0,0,.1) ),url(${bg})`,
                    backgroundPosition: 'center',
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                    width: '100vw',
                    height: '100vh'
                }}
            >
            </div>
        </div >
    )
}

export default Home
