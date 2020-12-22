import React from 'react'

function Cards({title,url}) {
    return (
        <div className="card">
            <p className="title"><b>{title}</b></p>
            <p className="url">{url}</p>
        </div>
    )
}

export default Cards
