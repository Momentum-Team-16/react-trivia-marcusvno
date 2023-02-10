import './App.css';
import React, { useState, useEffect } from "react";
import axios from 'axios';
import { categoryRandomizer } from './components/categoryRandomizer.js';
import { requestQuestion } from './components/requestQuestion'


function App() {
  
  const [title, setTitle] = useState(["Trivia Bonanza!"]);
//  const [triviaGame, setTriviaGame] = useState(["Trivia Bonanza!"]);

  return (
    <div>
      <h1>{title}</h1>
        <QuizGame 
          setTitle={setTitle}/>
    </div>
  );
}

function QuizGame({setTitle}){

  const [triviaCategories, setTriviaCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    axios.get('https://opentdb.com/api_category.php')
    .then((res) => {
      setTriviaCategories(res.data.trivia_categories);
    });
  }, []);

  return (
    <div>
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
