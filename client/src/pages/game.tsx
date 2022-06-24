import { Field, Form, Formik, FormikHelpers } from "formik";
import { useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { Attempt } from "../components/lobby/Guess";
import { WordValues } from "../components/lobby/WordValues";

const initialValues: WordValues = {
  word: "",
};

const CHALLANGES = 5;
const WORD_LENGHT = 5;

function Game() {
  const { id } = useParams<string>();
  const navigate = useNavigate();
  const [attempts, setAttempts] = useState<Attempt[]>([]);
  const [gameEnded, setGameEnded] = useState(false);
  const [gameStatus, setGameStatus] = useState("");

  const textInput = useRef<HTMLInputElement | null>(null);

  const handleSubmit = async (
    values: WordValues,
    actions: FormikHelpers<WordValues>
  ) => {
    actions.setSubmitting(false);

    if (gameEnded) return;

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    };
    const url = process.env.REACT_APP_API_URL;
    const res = await fetch(
      `${url}/lobby/${id}/${values.word}`,
      requestOptions
    );
    const data = await res.json();

    if (res && res.status === 200) {
      if (data.ended) {
        setGameEnded(true);
        setGameStatus(data.status);
      }
      const newAttempt: Attempt = { guess: data.guess, result: data.result };
      setAttempts((attempts) => [...attempts, newAttempt]);
      actions.resetForm();
    }
  };

  const autoFocus = () => {
    textInput.current?.focus();
  };

  return (
    <>
      <StyledContainer>
        <StyledGrid>
          {attempts.map((a, x) => (
            <StyledRow key={x}>
              {a.guess.split("").map((letter, i) => (
                <FilledCell status={a.result[i]} key={i}>
                  {letter}
                </FilledCell>
              ))}
            </StyledRow>
          ))}

          {!gameStatus && (
            <div style={{ height: "62.5px" }}>
              <Formik
                initialValues={initialValues}
                onSubmit={(values, actions) => handleSubmit(values, actions)}
              >
                {({ values }) => (
                  <Form style={{ height: "100%" }}>
                    <StyledRow>
                      {values.word.split("").map((letter, i) => (
                        <EmptyCell key={i}>{letter}</EmptyCell>
                      ))}
                      {[
                        ...Array(WORD_LENGHT - values.word.split("").length),
                      ].map((letter, i) => (
                        <EmptyCell key={i}>{letter}</EmptyCell>
                      ))}
                    </StyledRow>
                    <Field
                      id="word"
                      name="word"
                      autoComplete="off"
                      type="text"
                      autoFocus
                      innerRef={textInput}
                      onBlur={autoFocus}
                      maxLength={WORD_LENGHT}
                      style={{
                        width: "0px",
                        height: "0px",
                        outline: "none",
                        border: "none",
                      }}
                    />
                    <button type="submit" hidden disabled={gameEnded} />
                  </Form>
                )}
              </Formik>
            </div>
          )}

          {[...Array(CHALLANGES - attempts.length - 1)].map((_, i) => (
            <StyledRow key={i}>
              {[...Array(WORD_LENGHT)].map((_, x) => (
                <EmptyCell key={x} />
              ))}
            </StyledRow>
          ))}
        </StyledGrid>
      </StyledContainer>

      {gameStatus && (
        <div>
          <button onClick={() => navigate(`/lobby/${id}`)}>Go back</button>
          <p>You have {gameStatus}!</p>
        </div>
      )}
    </>
  );
}

export default Game;

const StyledContainer = styled.div`
  height: 600px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-grow: 1;
  flex-direction: row;
`;

const StyledGrid = styled.div`
  display: grid;
  gap: 5px;
  grid-template-rows: repeat(6, 1fr);
  width: 100%;
  height: 100%;
  max-width: 352.5px;
  max-height: 420px;
  padding: 10px;
`;

const StyledRow = styled.div`
  display: grid;
  gap: 5px;
  grid-template-columns: repeat(5, 1fr);
  max-width: 100%;
  width: 100%;
  height: 100%;
`;

const Cell1 = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 62px;
  height: 100%;
  max-height: 62px;

  font-size: 1.875rem;
  font-weight: bold;
  text-transform: uppercase;
  user-select: none;
`;

const FilledCell = styled<any>(Cell1)`
  color: white;
  background-color: ${(p) =>
    p.status === "*" ? "#c9b458" : p.status === "1" ? "#6aaa64" : "#787c7e"};
`;

const EmptyCell = styled(Cell1)`
  color: black;
  background-color: inherit;
  border: 2px solid #e2e8f0;
`;
