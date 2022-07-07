import { Field, Form, Formik, FormikHelpers } from "formik";
import { useRef } from "react";
import { EmptyCell, StyledRow } from "../../pages/game";
import { WordValues } from "../lobby/WordValues";

type Props = {
  length: number;
  isDisabled: boolean;
  handleSubmit: (
    values: WordValues,
    actions: FormikHelpers<WordValues>
  ) => Promise<void>;
};

const initialValues: WordValues = {
  word: "",
};

export const CurrentRow = ({ length, isDisabled, handleSubmit }: Props) => {
  const textInput = useRef<HTMLInputElement | null>(null);

  const autoFocus = () => {
    textInput.current?.focus();
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values, actions) => handleSubmit(values, actions)}
    >
      {({ values }) => (
        <Form>
          <StyledRow columns={length}>
            {values.word.split("").map((letter, i) => (
              <EmptyCell key={i}>{letter}</EmptyCell>
            ))}
            {[...Array(length - values.word.length)].map((letter, i) => (
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
            maxLength={length}
            hidden={isDisabled}
            style={{
              width: "0px",
              height: "0px",
              outline: "none",
              border: "none",
            }}
          />
          <button type="submit" hidden disabled={isDisabled} />
        </Form>
      )}
    </Formik>
  );
};
