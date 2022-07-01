import React, { useState } from "react";
import { Formik, Form, FormikHelpers, Field } from "formik";
import { langOptions } from "./langOptions";
import { difficultyOptions } from "./difficultyOptions";
import { ConfigValues } from "./ConfigValues";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";

const initialValues: ConfigValues = {
  username: "",
  difficulty: 5,
  language: "es",
};

const LobbyConfigForm = () => {
  const { id } = useParams<string>();
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (
    values: ConfigValues,
    actions: FormikHelpers<ConfigValues>
  ) => {
    setError(null);
    actions.setSubmitting(false);

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    };

    const url = process.env.REACT_APP_API_URL;

    const res = await fetch(`${url}/lobby/${id}/game-start`, {
      ...requestOptions,
      body: JSON.stringify(values),
    })
      .then((res) => {
        if (res.status === 200) {
          return navigate(`/lobby/${id}/game`);
        } else {
          return res.json();
        }
      })
      .catch((_) => setError("Servicio no disponible"));

    setError(res.message);
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values, actions) => handleSubmit(values, actions)}
    >
      <StyledForm>
        <div>
          <FormRow>
            <label htmlFor="username">Username:</label>
            <Field id="username" name="username" type="text" />
          </FormRow>

          <FormRow>
            <label htmlFor="language">Lenguaje:</label>
            <Field id="language" name="language" as="select">
              {langOptions.map((lang) => (
                <option key={lang.id} value={lang.value}>
                  {lang.label}
                </option>
              ))}
            </Field>
          </FormRow>

          <FormRow>
            <label htmlFor="difficulty">Dificultad:</label>
            <Field name="difficulty" id="difficulty" as="select">
              {difficultyOptions.map((dif) => (
                <option key={dif.id} value={dif.value}>
                  {dif.label}
                </option>
              ))}
            </Field>
          </FormRow>
        </div>

        <Button type="submit">Iniciar</Button>
        {error && <p>{error}</p>}
      </StyledForm>
    </Formik>
  );
};

export default LobbyConfigForm;

const Button = styled.button`
  text-transform: uppercase;
  font-size: 20px;
  color: rgb(217 119 6);
  font-weight: 700;
  padding-inline: 2rem;
  padding-block: 1rem;
  background-color: rgb(253 230 138);
  border: 0px;
  border-radius: 0.5rem;
  justify-content: center;
  align-content: center;
`;

const StyledForm = styled(Form)`
  display: flex;
  align-content: center;
  flex-direction: column;
  width: 300px;
  margin-inline: 3rem;
  padding-block: 2rem;
  gap: 15px;
`;

const FormRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding-block: 5px;
`;
