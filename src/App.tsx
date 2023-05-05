import { useEffect, useReducer, useState } from "react";
import sentences from "./assets/sentences.json";
import about from "./assets/about.json";
//import "./App.css";
import styles from "./App.module.css";

// Define the shape of the state object
interface AppState {
  sentencesArray: string[];
  displayedSentences: {
    [key: string]: string;
  };
}

const NUMOFSENTENCES = 4;

// Define the possible actions that can be dispatched to the reducer
type AppAction = { type: string; sentenceIndex?: string };

// Utility function to get a random index from an array
function getRandomIndex(arrayLength: number): number {
  return Math.floor(Math.random() * arrayLength);
}

// Utility function to initialize the state
function initializeState(sentences: string[]): AppState {
  const sentencesArray = [...sentences];
  const randomSentences: { [key: string]: string } = {};

  for (let i = 1; i <= NUMOFSENTENCES; i++) {
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
      if (action.sentenceIndex !== undefined) {
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
      }
    case "swapAllSentences":
      const sentencesArray = [...state.sentencesArray];
      Object.keys(state.displayedSentences).forEach((key: string) => {
        sentencesArray.push(state.displayedSentences[key]);
      });
      const displayedSentences: { [key: string]: string } = {};
      for (let i = 1; i <= NUMOFSENTENCES; i++) {
        const index = getRandomIndex(sentencesArray.length);
        displayedSentences[i] = sentencesArray[index];
        sentencesArray.splice(index, 1);
      }
      return {
        ...state,
        sentencesArray,
        displayedSentences,
      };

    default:
      return state;
  }
}

// Define the initial state of the app
const initialState: AppState = initializeState(sentences);

// Define the App component
function App(): JSX.Element {
  const [showAbout, setShowAbout] = useState<boolean>(false);
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleClick = (sentenceIndex: string) => {
    dispatch({ type: "swapSentence", sentenceIndex });
  };

  return (
    <section className={styles.pageWrapper}>
      <div className={styles.linkWrapper}>
        <a
          className={styles.link}
          onClick={(e) => {
            e.preventDefault();
            setShowAbout(false);
          }}
        >
          Home
        </a>
        <a
          className={styles.link}
          onClick={(e) => {
            e.preventDefault();
            setShowAbout(true);
          }}
        >
          About
        </a>
      </div>
      {showAbout ? (
        <div className={styles.aboutContainer}>
          <div>{about.about}</div>
          <div className={styles.cursive}>"{about.quote}"</div>
        </div>
      ) : (
        <>
          <h1 className={styles.title}>Alter Altar</h1>
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
          <div className={styles.button} onClick={() => dispatch({ type: "swapAllSentences" })}>
            Generate Memory Word
          </div>
        </>
      )}
    </section>
  );
}

export default App;
