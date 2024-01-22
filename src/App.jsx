import Start from "./components/Start";
import Questions from "./components/Questions";
import Loading from "./components/Loading";

import "./App.scss";

import { useEffect, useMemo, useReducer } from "react";
import { decode } from 'html-entities';


function App() {
  const [state, dispatch] = useReducer((state, action) => ({
    ...state,
    ...action
  }), {
    start: false,
    questions: [],
    loading: false,
    count: 0,
  });

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

  useEffect(() => {

    state.start && dispatch({ loading: true });

    console.log("Use Effect!!");

    async function callingApi() {
      try {
        const url = "https://opentdb.com/api.php?amount=5&category=9&difficulty=medium&type=multiple";
        const resposne = await fetch(url);
        const data = await resposne.json();

        setTimeout(() => {
          console.log("Get Data!");
          dispatch({ loading: false, questions: data.results });
        }, 3000);


      } catch (error) {
        console.log(error);
      }
    }

    state.start && setTimeout(() => {
      callingApi();
      console.log("Calling Api!!");
    }, 2000);

  }, [state.start, state.count]);

  console.log("State: ", state);

  const elements = useMemo(
    () => {

      console.log("Memo Memo!!!");

      const questions = state.questions.map(question => ({
        description: question.question,
        answers: shuffle([question.correct_answer, ...question.incorrect_answers])
      }));

      return questions.map((question, index) => (
        <div key={index} className="question">
          <p className="description">{question.description}</p>
          <div className="answers">
            {
              question.answers.map((answer, index) => (
                <button key={index} className="ans-btn">{decode(answer)}</button>
              ))
            }
          </div>
        </div>
      ));
    }, [state.questions]);

  return (
    <>
      <div className="container">
        {
          state.start ? <Questions elements={elements} /> : <Start dispatch={dispatch} />
        }
      </div>
      <Loading loading={state.loading} />
    </>
  );
}

export default App;
