import { useReducer, useEffect } from "react";
import sentences from "./assets/sentences.json";
//import "./App.css";
import styles from "./App.module.css";

// Define the shape of the state object
interface AppState {
  sentencesArray: string[];
  displayedSentences: {
    [key: string]: string;
  };
}

// Define the possible actions that can be dispatched to the reducer
type AppAction = { type: "swapSentence"; sentenceIndex: string };

// Utility function to get a random index from an array
function getRandomIndex(arrayLength: number): number {
  return Math.floor(Math.random() * arrayLength);
}

// Utility function to initialize the state
function initializeState(sentences: string[]): AppState {
  const sentencesArray = [...sentences];
  const randomSentences: { [key: string]: string } = {};
  const numOfSentences = 3;

  for (let i = 1; i <= numOfSentences; i++) {
    const randomIndex = getRandomIndex(sentencesArray.length);
    randomSentences[i] = sentencesArray[randomIndex];
    sentencesArray.splice(randomIndex, 1);
  }

  return {
    sentencesArray,
    displayedSentences: randomSentences,
  };
}

// Define the reducer function, which updates the state in response to dispatched actions
function reducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case "swapSentence":
      const sentencesArray = [...state.sentencesArray];
      const index = getRandomIndex(sentencesArray.length);
      const newSentence = sentencesArray[index];

      sentencesArray.splice(index, 1);
      sentencesArray.push(state.displayedSentences[action.sentenceIndex]);

      return {
        ...state,
        sentencesArray,
        displayedSentences: {
          ...state.displayedSentences,
          [action.sentenceIndex]: newSentence,
        },
      };
    default:
      return state;
  }
}

// Define the initial state of the app
const initialState: AppState = initializeState(sentences);

// Define the App component
function App(): JSX.Element {
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleClick = (sentenceIndex: string) => {
    dispatch({ type: "swapSentence", sentenceIndex });
  };

  return (
    <section className={styles.pageWrapper}>
      <h1 className={styles.title}>Poetry</h1>
      <div className={styles.sentencesContainer}>
        {Object.keys(state.displayedSentences).map((key) => (
          <h3
            key={key}
            className={`${styles.sentence} ${styles["sentence-" + key]}`}
            onClick={() => handleClick(key)}
          >
            {state.displayedSentences[key]}
          </h3>
        ))}
      </div>
    </section>
  );
}

export default App;
