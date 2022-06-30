import { FormikHelpers } from "formik";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { CompletedRow } from "../components/grid/CompletedRow";
import { CurrentRow } from "../components/grid/CurrentRow";
import { EmptyRow } from "../components/grid/EmptyRow";
import { Attempt } from "../components/lobby/Guess";
import { WordValues } from "../components/lobby/WordValues";

const CHALLANGES = 5;
const WORD_LENGHT = 5;

function Game() {
  const { id } = useParams<string>();
  const navigate = useNavigate();
  const [attempts, setAttempts] = useState<Attempt[]>([]);
  const [gameEnded, setGameEnded] = useState(false);
  const [gameStatus, setGameStatus] = useState("");

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
        setGameStatus(data.message);
      }
      const newAttempt: Attempt = { guess: data.guess, result: data.result };
      setAttempts((attempts) => [...attempts, newAttempt]);
      actions.resetForm();
    }
  };

  const emptyRows = [...Array(Math.max(0, CHALLANGES - attempts.length - 1))];

  return (
    <>
      <StyledContainer>
        <StyledGrid>
          {attempts.map((a, i) => (
            <CompletedRow key={i} attempt={a} />
          ))}

          {!gameStatus && (
            <CurrentRow
              length={WORD_LENGHT}
              isDisabled={gameEnded}
              handleSubmit={handleSubmit}
            />
          )}

          {emptyRows.map((_, i) => (
            <EmptyRow key={i} length={WORD_LENGHT} />
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

export const StyledRow = styled.div`
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

export const FilledCell = styled<any>(Cell1)`
  color: white;
  background-color: ${(p) =>
    p.status === "*" ? "#c9b458" : p.status === "1" ? "#6aaa64" : "#787c7e"};
`;

export const EmptyCell = styled(Cell1)`
  color: black;
  background-color: inherit;
  border: 2px solid #e2e8f0;
`;
