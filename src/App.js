import './App.css';
import React, { useState, useEffect } from "react";
import axios from 'axios';


function App() {
  const [triviaCategories, setTriviaCategory] = React.useState([]);

  useEffect(() => {
    axios.get('https://opentdb.com/api_category.php')
    .then((res) => {
      const newCategories = res.data.trivia_categories.map(obj => obj.name);
      
    setTriviaCategory(newCategories);
  });
}, []);

  return (
    <div>
      <h1>Trivia Categories</h1>
      <div className="grid">
        <ul>
          { triviaCategories.map(trivCat => (
            <li>{trivCat}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
