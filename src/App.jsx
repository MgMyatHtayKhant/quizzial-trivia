import Start from "./components/Start";
import Questions from "./components/Questions";
import Loading from "./components/Loading";

import "./App.scss";

import { useEffect, useReducer, useState } from "react";
import { decode } from 'html-entities';


function App() {
  const [state, dispatch] = useReducer((state, action) => ({
    ...state,
    ...action
  }), {
    start: false,
    loading: false,
    check: false,
  });

  const [playTimes, setPlayTimes] = useState(0);

  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    state.start && dispatch({ loading: true });

    async function callingApi() {
      try {
        const url = "https://opentdb.com/api.php?amount=5&category=9&difficulty=medium&type=multiple";
        const resposne = await fetch(url);
        const data = await resposne.json();

        const questions = data.results.map(question => ({
          description: question.question,
          correct_answer: question.correct_answer,
          selected_id: "",
          answers: shuffle([question.correct_answer, ...question.incorrect_answers])
        }));

        setTimeout(() => {
          console.log("Get Data!!");
          dispatch({ loading: false });
          setQuestions(questions);
        }, 3000);


      } catch (error) {
        console.log(error);
      }
    }

    state.start && setTimeout(() => {
      callingApi();
    }, 2000);

  }, [state.start, playTimes]);


  function shuffle(array) {
    let currentIndex = array.length;
    let randomIndex;

    while (currentIndex > 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
    return array;
  }

  function handleScore() {
    console.log("Score!");
    return questions.filter(question => (
      question.selected_id === question.answers.indexOf(question.correct_answer)
    )).length;
  }

  function handleSelected(questionIndex, selected_id) {
    console.log("Handle Selected!!");
    setQuestions(prevQuestions => prevQuestions.map((question, index) =>
      (index === questionIndex) ? { ...question, selected_id } : question));
  }

  function handleChecked(selected_id, index, answer, correct_answer) {
    return state.check ?
      (selected_id === index
        && answer === correct_answer
        || answer === correct_answer) ? " corrected" :
        (selected_id === index) ? " incorrected" : ""
      : (selected_id === index) ? " selected" : "";
  }

  const elements = questions.map((question, index) => (
    <div key={index} className="question">
      <p className="description">{decode(question.description)}</p>
      <div className="answers">
        {
          question.answers.map((answer, i) => (
            <button key={i}
              className={
                "ans-btn" +
                handleChecked(question.selected_id, i, answer, question.correct_answer)
              }
              onClick={() => handleSelected(index, i)}
              disabled={state.check}
            >
              {decode(answer)}
            </button>
          ))
        }
      </div>
    </div>));

  return (
    <>
      <div className="container">
        {
          state.start ?
            <Questions
              elements={elements}
              setPlayTimes={setPlayTimes}
              check={state.check}
              dispatch={dispatch}
              score={state.check ? handleScore() : 0} /> :
            <Start dispatch={dispatch} />
        }
      </div>
      <Loading loading={state.loading} />
    </>
  );
}

export default App;
