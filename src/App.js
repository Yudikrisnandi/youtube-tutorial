import { useState } from 'react';
import './App.css';
import image from './images/naruto.png';

const baseUrl = 'https://api.jikan.moe/v3/search/anime'

function App() {
  const [query, setQuery] = useState('');
  const [animes, setAnimes] = useState([]);
  const [loading, setLoading] = useState(false);
  async function searchAnime(e){
    e.preventDefault()
    if(!query) return;
    try{
      setLoading(true);
      const response = await window.fetch(`${baseUrl}?q=${query}`);
      const data = await response.json();
      console.log('data', data)
      setAnimes(data.results)
      setLoading(false);
    }catch(e){
      setLoading(false);
      console.error(e)
    }
  }
  return (
    <div className="App">
      <div>
        <img src={image} alt="naruto" className="logo" />
      </div>
      <form className="form-wrapper" onSubmit={searchAnime}>
        <input 
          type="text" 
          placeholder="Search here..." 
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>
      {loading && <div style={{ marginTop: '30px' }}>loading...</div>}
      <div className="container-anime">
        {!loading && animes && animes.map(anime => (
          <div className="anime-card" key={anime.mal_id}>
            <img src={anime.image_url} alt={anime.title} className="image"/>
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
