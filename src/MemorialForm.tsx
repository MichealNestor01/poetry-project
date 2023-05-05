import { useState } from "react";
import { db } from "./firebase-config";
import { addDoc, collection } from "firebase/firestore";
import styles from "./MemorialForm.module.css";

function MemorialForm(): JSX.Element {
  const [about, setAbout] = useState<string>("");
  const [word, setWord] = useState<string>("");

  const postsCollectionRef = collection(db, "memorialWords");
  const createMemorial = async () => {
    await addDoc(postsCollectionRef, { about, word });
  };

  return (
    <div className={styles.container}>
      <h1>Alter altar</h1>
      <div className={styles.pair}>
        <label htmlFor="about">About: </label>
        <input id="about" type="text" value={about} onChange={(e) => setAbout(e.target.value)} />
      </div>
      <div className={styles.pair}>
        <label htmlFor="word">Word: </label>
        <input id="word" type="text" value={word} onChange={(e) => setWord(e.target.value)} />
      </div>
      <button className={styles.button} onClick={createMemorial}>
        Add Memorial
      </button>
    </div>
  );
}
export default MemorialForm;
