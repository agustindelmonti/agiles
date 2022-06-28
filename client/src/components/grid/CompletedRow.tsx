import { FilledCell, StyledRow } from "../../pages/game";
import { Attempt } from "../lobby/Guess";

type Props = {
  attempt: Attempt;
};

export const CompletedRow = ({ attempt }: Props) => {
  const { guess, result } = attempt;
  const splitGuess = guess.split("");

  return (
    <StyledRow>
      {splitGuess.map((letter, i) => (
        <FilledCell status={result[i]} key={i}>
          {letter}
        </FilledCell>
      ))}
    </StyledRow>
  );
};
