import React, {useState, useEffect} from "react"
import Album from "./Album";
import axios from "axios";
import { Link } from "react-router-dom";

function Albums() {
    const [albums, setAlbums] = useState([]);
    useEffect(() => {
        axios("/albums")
        .then(res => setAlbums(res.data))
    }, []);
  
    return ( 
            <div className="container">
                <h1>Albums</h1>
                <Link to="/add-album"><button>Add album</button></Link>
                <div className="row">
                    <div className="col s12">
                    {albums.map((album, i) => {
                        return (
                            <Album key={i} title={album.title} artist={album.artist}/>
                        )
                    })}
                    
                    </div>
                </div>
            </div>
    )
}

export default Albums;
