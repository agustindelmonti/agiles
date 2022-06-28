import { EmptyCell, StyledRow } from "../../pages/game";

export const EmptyRow = ({ length }: { length: number }) => {
  const emptyCells = Array.from(Array(length));

  return (
    <StyledRow>
      {emptyCells.map((_, x) => (
        <EmptyCell key={x} />
      ))}
    </StyledRow>
  );
};
