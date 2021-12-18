import { useEffect, useState } from 'react';
import { useDebounce } from 'use-debounce';
import './App.css';
import logo from './images/naruto.png';

const baseUrl = 'https://api.jikan.moe/v3/search/anime';

function App() {
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);
  const [query] = useDebounce(text, 1000);
  const [animes, setAnimes] = useState([]);
  
  useEffect(() =>{
    async function searchAnime(){
      try{
        setLoading(true);
        const response = await window.fetch(`${baseUrl}?q=${query}`);
        const data = await response.json();
        setAnimes(data.results)
        setLoading(false);
      }catch(e){
        setLoading(false);
        console.log(e)
      }
    }
    searchAnime()
  }, [query])
  return (
    <div className="App">
      <div>
        <img src={logo} alt="anime-search-logo" className="logo"/>
      </div>
      <div className="form-wrapper">
        <input 
          type="text"
          placeholder="search here..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button>submit</button>
      </div>
      <div className="container-anime">
      {loading && <div>loading...</div>}
      {!loading && animes && animes.map(anime => (
        <div className="anime-card" key={anime.mai_id}>
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
