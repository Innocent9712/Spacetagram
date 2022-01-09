import React from 'react'
import loading from "../assets/loading.png"
import "../styles/Loading.css"

function Loading() {
    return (
        <div className="loading_container">
            <img src={loading} alt="loading icon" />
            <p>Loading...</p>
        </div>
    )
}

export default Loading
