import { useReducer, useEffect } from "react";
import sentences from "./assets/sentences.json";
import "./App.css";

// Define the shape of the state object
interface AppState {
  sentencesArray: string[];
  1: string;
  2: string;
  3: string;
}

// Define the possible actions that can be dispatched to the reducer
type AppAction = { type: "swapSentence"; sentenceIndex: 1 | 2 | 3 };

// Define the reducer function, which updates the state in response to dispatched actions
function reducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case "swapSentence":
      // Create a new array containing the current state's sentences
      const sentencesArray = [...state.sentencesArray];
      // Pick a random index from the array
      const index = Math.floor(Math.random() * sentencesArray.length);
      // Get the new sentence to be displayed
      const newSentence = sentencesArray[index];
      // Remove the selected sentence from the array
      sentencesArray.splice(index, 1);
      // Add the currently displayed sentence back to the end of the array
      sentencesArray.push(state[action.sentenceIndex]);
      // Update the state with the new sentence and shuffled array
      return {
        ...state,
        sentencesArray,
        [action.sentenceIndex]: newSentence,
      };
    default:
      return state;
  }
}

// Define the initial state of the app
const initialState: AppState = (() => {
  // Create a new array containing all the sentences
  const sentencesArray = [...sentences];
  // Pick three random sentences to display initially
  const randomSentences = [];
  while (randomSentences.length < 3) {
    const randomIndex = Math.floor(Math.random() * sentencesArray.length);
    const randomSentence = sentencesArray[randomIndex];
    randomSentences.push(randomSentence);
    sentencesArray.splice(randomIndex, 1);
  }
  // Return the initial state object
  return {
    sentencesArray,
    1: randomSentences[0],
    2: randomSentences[1],
    3: randomSentences[2],
  };
})();

// Define the App component
function App(): JSX.Element {
  // Setup state using the useReducer hook
  const [state, dispatch] = useReducer(reducer, initialState);

  // Render the app UI
  return (
    <section className="pageWrapper">
      <h1>Sentences</h1>
      <h3 className="sentence" onClick={() => dispatch({ type: "swapSentence", sentenceIndex: 1 })}>
        {state[1]}
      </h3>
      <h3 className="sentence" onClick={() => dispatch({ type: "swapSentence", sentenceIndex: 2 })}>
        {state[2]}
      </h3>
      <h3 className="sentence" onClick={() => dispatch({ type: "swapSentence", sentenceIndex: 3 })}>
        {state[3]}
      </h3>
    </section>
  );
}

export default App;
