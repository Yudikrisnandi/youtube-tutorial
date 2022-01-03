import './App.css';
//import ErrorBoundary from './ErrorBoundary';
import { ErrorBoundary } from 'react-error-boundary';
import { useState }from 'react';

function ErrorFallback({ error }){
  return <div>{error.message}</div>
}


function AnimeCard({ anime }){
  return(
    <div>
      <h3>{anime.title}</h3>
      <p>author : {anime.author}</p>
    </div>
  )
}

function App() {
  const [animeList] = useState([
    {
      id: 1,
      title: 'Naruto',
      author: 'Mashasi Kishimoto'
    },
    {
      id: 2,
      title: 'Saint Seiya',
      author: 'test'
    }
  ])
  return (
    <div className="App">
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <h1>Anime List App</h1>
        <AnimeCard anime={animeList[0]}/>
        <AnimeCard />
      </ErrorBoundary>
    </div>
  );
}

export default App;
