import React, { useState, useContext } from "react";
import Axios from "axios";
import { useHistory } from "react-router-dom";
import UserContext from "../context/UserContext";



function AddAlbum() {
    const [title, setTitle] = useState();
    const [artist, setArtist] = useState();
    const [genre, setGenre] = useState();
    const [year, setYear] = useState();

    const userData = useContext(UserContext);

    const history = useHistory();

    const submit = async (e) => {
        e.preventDefault();
      
           const newAlbum = { title, artist, genre, year };
           await Axios.post("/albums/add-album", newAlbum)
           history.push("/albums")
            // the page allows to input the album when i remove the checkauth from the routes
            // i need to find a way for certain page to only be shown if there's a login user 
            // I need to give this page some credentials to be able to post a new album
 
    }

    return (
        <div>
          <div className="page">
          <h2>Add new album</h2>
          <form className="form" onSubmit={submit}>
            <label htmlFor="album-title">Title</label>
            <input
              id="album-title"
              type="text"
              onChange={(e) => setTitle(e.target.value)}
            />

            <label htmlFor="album-artist">Artist</label>
            <input
              id="album-artist"
              type="text"
              onChange={(e) => setArtist(e.target.value)}
            />

            <label htmlFor="album-genre">Genre</label>
            <input
              id="album-genre"
              type="text"
              onChange={(e) => setGenre(e.target.value)}
            />        
            
            <label htmlFor="album-year">Year</label>
            <input
              id="album-year"
              type="number"
              onChange={(e) => setYear(e.target.value)}
            />

            <input type="submit" value="album" />
          </form>
        </div>
        </div>
    )
}

export default AddAlbum
