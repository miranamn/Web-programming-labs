import './App.css';
import { Routes, Route } from "react-router-dom";
import Header from './Header/Header';
import EditCreatePage from './EditCreatePage/EditCreatePage';
import SearchBar from './SearchBar/SearchBar.jsx';
import MoviePage from './MoviePage/MoviePage';

function App() {
  return (
    <>
      <Header></Header>
      <div className='row-wrap'>
        <Routes>
          <Route path="/movie/:id" element={<MoviePage />} />
          <Route path='/movie/:id/edit' element={<EditCreatePage type="edit" />} />
          <Route path='/createMovie' element={<EditCreatePage type="create" />} />
          <Route path="/*" element={<SearchBar></SearchBar>} />
        </Routes>
      </div>
    </>
  );
}

export default App;
