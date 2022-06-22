import React, { useState } from "react";
import { Formik, Form, FormikHelpers, Field } from "formik";
import { langOptions } from "./langOptions";
import { difficultyOptions } from "./difficultyOptions";
import { ConfigValues } from "./ConfigValues";
import { useParams, useNavigate } from "react-router-dom";

const initialValues: ConfigValues = {
  username: "",
  difficulty: 5,
  language: "es",
};

const LobbyConfigForm = () => {
  const { id } = useParams<string>();
  const [error, setError] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleSubmit = async (
    values: ConfigValues,
    actions: FormikHelpers<ConfigValues>
  ) => {
    actions.setSubmitting(false);

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    };

    const url = process.env.REACT_APP_API_URL;
    Promise.all([
      fetch(`${url}/lobby/${id}`, {
        ...requestOptions,
        method: "PATCH",
        body: JSON.stringify(values),
      }),
      fetch(`${url}/lobby/${id}/game-start`, requestOptions),
    ]).catch((_) => setError(true));

    return navigate(`/lobby/${id}/game`);
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values, actions) => handleSubmit(values, actions)}
    >
      <Form>
        <div>
          <label htmlFor="username">Username</label>
          <Field id="username" name="username" type="text" />
        </div>

        <div>
          <label htmlFor="language">Language</label>
          <Field id="language" name="language" as="select">
            {langOptions.map((lang) => (
              <option key={lang.id} value={lang.value}>
                {lang.label}
              </option>
            ))}
          </Field>
        </div>

        <div>
          <label htmlFor="difficulty">Difficulty</label>
          <Field name="difficulty" id="difficulty" as="select">
            {difficultyOptions.map((dif) => (
              <option key={dif.id} value={dif.value}>
                {dif.label}
              </option>
            ))}
          </Field>
        </div>
        <button type="submit">Iniciar</button>
        {error && <p>Ha ocurrido un error</p>}
      </Form>
    </Formik>
  );
};

export default LobbyConfigForm;
