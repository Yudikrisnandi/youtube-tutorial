import { useState, useEffect, useCallback } from 'react';
import { useDebounce } from 'use-debounce';
import './App.css';
import image from './images/naruto.png';

const baseUrl = 'https://api.jikan.moe/v3/search/anime'

function App() {
  const [text, setText] = useState('');
  const [query] = useDebounce(text, 1000)
  const [animes, setAnimes] = useState([]);
  const [loading, setLoading] = useState(false);
  /*async function searchAnime(){
    if(!query) return;
    try{
      setLoading(true);
      const response = await window.fetch(`${baseUrl}?q=${query}`);
      const data = await response.json();
      setAnimes(data.results)
      setLoading(false);
    }catch(e){
      setLoading(false);
      console.error(e)
    }
  }*/

  const searchAnime = useCallback(async() => {
    if(!query) return;
    try{
      setLoading(true);
      const response = await window.fetch(`${baseUrl}?q=${query}`);
      const data = await response.json();
      setAnimes(data.results)
      setLoading(false);
    }catch(e){
      setLoading(false);
      console.error(e)
    }
  }, [query])

  useEffect(() => {
    searchAnime(query)
  }, [query, searchAnime])

  return (
    <div className="App">
      <div>
        <img src={image} alt="naruto" className="logo" />
      </div>
      <div className="form-wrapper">
        <input 
          type="text" 
          placeholder="Search here..." 
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button type="submit">Search</button>
      </div>
      {loading && <div style={{ marginTop: '30px' }}>loading...</div>}
      <div className="container-anime">
        {!loading && animes && animes.map(anime => (
          <div className="anime-card" key={anime.mal_id}>
            <img 
              src={anime.image_url} 
              alt={anime.title} 
              className="image"
            />
            <div className="anime-detail">
              <h3>{anime.title}</h3>
              <p>{anime.synopsis}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
