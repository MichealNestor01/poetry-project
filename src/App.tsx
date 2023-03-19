import { useReducer, useEffect } from "react";
import sentences from "./assets/sentences.json";
import "./App.css";

function reducer(state, action) {
  switch (action.type) {
    case "swapSentence":
      const sentencesArray = [...state.sentencesArray];
      const index = Math.floor(Math.random() * sentencesArray.length);
      const newSentence = sentencesArray[index];
      sentencesArray.splice(index, 1);
      sentencesArray.push(state[action.sentence]);
      switch (action.sentence) {
        case 1:
          return {
            ...state,
            sentencesArray,
            1: newSentence,
          };
        case 2:
          return {
            ...state,
            sentencesArray,
            2: newSentence,
          };
        case 3:
          return {
            ...state,
            sentencesArray,
            3: newSentence,
          };
        default:
          return state;
      }
    default:
      return state;
  }
}

const initialState = (() => {
  const sentencesArray = [...sentences];
  const randomSentences = [];
  while (randomSentences.length < 3) {
    const randomIndex = Math.floor(Math.random() * sentencesArray.length);
    const randomSentence = sentencesArray[randomIndex];
    randomSentences.push(randomSentence);
    sentencesArray.splice(randomIndex, 1);
  }
  return {
    sentencesArray,
    1: randomSentences[0],
    2: randomSentences[1],
    3: randomSentences[2],
  };
})();

function App() {
  // setup state
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <section className="pageWrapper">
      <h1>Sentences</h1>
      <h3 className="sentence" onClick={() => dispatch({ type: "swapSentence", sentence: 1 })}>
        {state[1]}
      </h3>
      <h3 className="sentence" onClick={() => dispatch({ type: "swapSentence", sentence: 2 })}>
        {state[2]}
      </h3>
      <h3 className="sentence" onClick={() => dispatch({ type: "swapSentence", sentence: 3 })}>
        {state[3]}
      </h3>
    </section>
  );
}

export default App;
