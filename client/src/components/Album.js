import React from "react"

function Album(album) {
    return (
        <div className="col s12 m6">
            <div className="card blue-grey darken-1">
                <div className="card-content white-text">
                <span className="card-title">{album.title}</span>
                <p>{album.artist}</p>
                </div>
            </div>
        </div>
    )
}

export default Album
