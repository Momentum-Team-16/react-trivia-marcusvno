import './App.css';
import React, { useState, useEffect } from "react";
import axios from 'axios';
import { categoryRandomizer } from './components/categoryRandomizer.js';


function App() {
  const [triviaCategories, setTriviaCategories] = React.useState([]);

  useEffect(() => {
    axios.get('https://opentdb.com/api_category.php')
    .then((res) => {
      const newCategories = res.data.trivia_categories;
      const randomCats = categoryRandomizer(newCategories);
      console.log(randomCats);
    setTriviaCategories(randomCats);
  });
}, []);

  return (
    <div>
      <h1>Trivia Categories</h1>
      <div className="grid">
        <ul>
          { triviaCategories.map(trivCat => (
            <li key={trivCat.id}>{trivCat.id} : {trivCat.name}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
