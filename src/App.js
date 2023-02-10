import './App.css';
import React, { useState, useEffect } from "react";
import axios from 'axios';
import he, {decode} from "he";
import shuffle from "lodash/shuffle";


function App() {
  const [isPlaying, setPlaying] = useState(null);
  const [title, setTitle] = useState(["Trivia Bonanza!"]);
  const [currentScore, setCurrentScore] = useState(0);
//  const [triviaGame, setTriviaGame] = useState(["Trivia Bonanza!"]);



  return (
    <div>
      <h1>{title}</h1>
      <div className="main">
        <QuizGame 
          setTitle={setTitle}
          setPlaying={setPlaying}
          currentScore={currentScore}
          setCurrentScore={setCurrentScore}/>
      </div>    
      
      <footer>{isPlaying ? (`Score: ${currentScore}`) : null}</footer>
    </div>
  );
}

function QuizGame({setTitle, setPlaying, currentScore, setCurrentScore}){

  const [triviaCategories, setTriviaCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    axios.get('https://opentdb.com/api_category.php')
    .then((res) => {
      setTriviaCategories(res.data.trivia_categories);
    });
  }, []);

  const handleCatSelection = (e) => {
    setSelectedCategory(e.id)
    setPlaying(true)
    setTitle(e.name)
  }


  if(selectedCategory){
    return(
      <TriviaQuestions 
        selectedCategory={selectedCategory}
        currentScore={currentScore}
        setScore={setCurrentScore}
        setSelectedCategory={setSelectedCategory}
        setPlaying={setPlaying}
      />
    )
  }

  return (
    <div>
      <div className="grid">
          { triviaCategories.map(triviaCat => (
            <div className="category-button" onClick={ () => (handleCatSelection(triviaCat))}  key={triviaCat.id}>{triviaCat.name}</div>

          ))}
      </div>
    </div>
  );

}

function TriviaQuestions({selectedCategory, currentScore, setScore, setSelectedCategory, setPlaying}){
  const [currentQuestion, setCurrentQuestion] = useState([])
  const [questionIndex, setQuestionIndex] = useState(0)
  
  useEffect(() => {
    axios
      .get(`https://opentdb.com/api.php?amount=10&category=${selectedCategory}`)
      .then((response) => {
        setCurrentQuestion(
          response.data.results.map((obj) => ({
            question: he.decode(obj.question),
            correctAnswer: he.decode(obj.correct_answer),
            answers: shuffle([obj.correct_answer, ...obj.incorrect_answers]),
          }))
        );
      });
  }, [selectedCategory]);

  return(
    currentQuestion.length > 0 && (
      <QuestionList 
        currentQuestion={currentQuestion}
        currentScore={currentScore}
        setScore={setScore}
        questionIndex={questionIndex}
        setQuestionIndex={setQuestionIndex}
        setSelectedCategory={setSelectedCategory}
        setPlaying={setPlaying}/>

    )
  )

 


}

function QuestionList({setPlaying, currentQuestion, currentScore, setScore, questionIndex, setQuestionIndex, setSelectedCategory} ){

  // console.log(setSelectedCategory)

  const handleClick = (a) => {
     if(he.decode(a)=== currentQuestion[questionIndex].correctAnswer){
      setScore(currentScore+1)
    }  
    setQuestionIndex(questionIndex +1)
    // console.log(questionIndex)
  }

  if(questionIndex > currentQuestion.length-1){
    setPlaying(null);
    return (
      <QuizEnd 
        currentScore={currentScore} 
        setScore={setScore}
        setSelectedCategory={setSelectedCategory}/>
    )
  }

  return(
    <div className="quizzing">
      <div>
        <h2 key={questionIndex}>{currentQuestion[questionIndex].question}</h2>
        <div className="answer-order">
          {currentQuestion[questionIndex].answers.map((a) =>(
            <div className="category-answer" onClick={()=>{handleClick(a)}}>{he.decode(a)}</div>
          ) )}
        </div>
      </div>
    </div>
  )

}

function QuizEnd({currentScore, setSelectedCategory, setScore}){

  const handleClick = () => {
    setSelectedCategory(null)
    setScore(0)
  }

  return(
    <div>
      <h1 className="congrats">Congraulations!</h1>
      <h1 className="endscore">You Scored: {currentScore}!</h1>
      <div className="playagain">
        <button className="category-answer playagain" onClick={handleClick}>Play Again?</button>
      </div>
    </div>
  )
}


export default App;
