import './App.css';
import { useState, useEffect } from 'react';
import axios from 'axios';

import config from './config.json';

function App() {

  const CLIENT_ID = config.CLIENT_ID;
  const REDIRECT_URI = config.REDIRECT_URI;
  const AUTH_ENDPOINT = config.AUTH_ENDPOINT
  const RESPONSE_TYPE = config.RESPONSE_TYPE;

  const [token, setToken] = useState('');

  useEffect(() => {
    const hash = window.location.hash
    let token = window.localStorage.getItem("token")

    if (!token && hash) {
        token = hash.substring(1).split("&").find(elem => elem.startsWith("access_token")).split("=")[1]

        window.location.hash = ""
        window.localStorage.setItem("token", token)
    }

    setToken(token)

  }, [])

  const logout = () => {
    setToken("")
    window.localStorage.removeItem("token")
  }

  const [searchKey, setSearchKey] = useState("")
  const [artists, setArtists] = useState([])

  const searchArtists = async (e) => {
    e.preventDefault()
    const {data} = await axios.get("https://api.spotify.com/v1/search", {
        headers: {
            Authorization: `Bearer ${token}`
        },
        params: {
            q: searchKey,
            type: "artist"
        }
    })

    setArtists(data.artists.items)
  }

  const renderArtists = () => {
    return artists.map(artist => (
        <div key={artist.id}>
            {artist.images.length ? <img width={"100%"} src={artist.images[0].url} alt=""/> : <div>No Image</div>}
            {artist.name}
        </div>
    ))
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Spotify React</h1>
        {!token 
          ? <a href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`}>Login to Spotify</a>
          : <button onClick={logout}>Logout</button>}
      </header>
      <form onSubmit={searchArtists}>
        <input type="text" onChange={e => setSearchKey(e.target.value)}/>
        <button type={"submit"}>Search</button>
      </form>
      {renderArtists()}
    </div>
  );
}

export default App;