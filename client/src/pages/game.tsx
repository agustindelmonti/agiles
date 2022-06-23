import { Field, Form, Formik, FormikHelpers } from "formik";
import { Stats } from "fs";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { Attempt } from "../components/lobby/Guess";
import { WordValues } from "../components/lobby/WordValues";

const initialValues: WordValues = {
  word: "",
};

function Game() {
  const { id } = useParams<string>();
  const [attempts, setAttempts] = useState<Attempt[]>([]);
  const [gameEnded, setGameEnded] = useState(false);
  const [gameStatus, setGameStatus] = useState("");
  const handleSubmit = async (
    values: WordValues,
    actions: FormikHelpers<WordValues>
  ) => {
    actions.setSubmitting(false);
    
    
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json"},
    };
    const url = process.env.REACT_APP_API_URL;
    const res = await fetch(`${url}/lobby/${id}/${values.word}`, requestOptions );
    const data = await res.json();
    
    if (res && res.status === 200){
      if (data.ended) {
        setGameEnded(true);
        setGameStatus(data.status)
      }
      const newAttempt : Attempt = {guess: data.guess, result: data.result};
      setAttempts((attempts) => [...attempts, newAttempt]);
    }
    
    
  }
  return (
    <>
    { attempts.length > 0 && 
    <pre>
      {JSON.stringify(attempts, null, 2)}
    </pre>}
    <Formik initialValues={initialValues} onSubmit={(values, actions) => handleSubmit(values, actions)}>
      <Form>
        <div>
          <label htmlFor="word"></label>
          <Field id="word" name="word" />
        </div>
        {!gameEnded && <button type="submit">Intentar</button>}
      </Form>
    </Formik>

    {gameStatus !== "" && <p>You have {gameStatus}!</p>}
    </>
  );
}

export default Game;
