import React, { useEffect, useState } from 'react'
import axios from 'axios'
import config from "../config.json"
import "./Login.css"

const Login = () => {
    const [loginUrl, setLoginUrl] = useState(null)

    const getLoginPage = () => {
        axios.get(config.api.url + "/auth/login")
            .then(res => {
                if (res.data.success) setLoginUrl(res.data.url)
                else console.log("login url not found")
            })
    }

    useEffect(() => {
        if (loginUrl) window.location.href = loginUrl
    }, [loginUrl])

    return (
        <div id="login-page">
            <div id="login-card">
                <h2 style={{ color: "white" }}>Welcome to Health Luminous!</h2>

                <button className="login-button button-36" onClick={getLoginPage}>
                    <i className="fab fa-spotify"> Login With Spotify</i>
                </button>
            </div>
        </div>
    )
}

export default Login
