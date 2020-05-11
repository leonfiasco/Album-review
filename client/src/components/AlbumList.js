import React, {useState, useEffect} from 'react'
import Album from './Album';
import axios from 'axios';

function Albums() {
    const [albums, setAlbums] = useState([]);
    useEffect(() => {
        axios('/albums')
        .then(res => setAlbums(res.data))
    }, []);
  
    return ( 
            <div className="container">
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
