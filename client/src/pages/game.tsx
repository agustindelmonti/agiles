import { Field, Form, Formik } from "formik";

function Game() {
  return (
    <Formik initialValues={{}} onSubmit={() => {}}>
      <Form>
        <div>
          <label htmlFor="word"></label>
          <Field id="word" name="word" />
        </div>
      </Form>
    </Formik>
  );
}

export default Game;
