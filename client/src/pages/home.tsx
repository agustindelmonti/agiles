import React from "react";
import { Form, Formik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { ConfigValues } from "../components/lobby/ConfigValues";

const initialValues: ConfigValues = {
  username: "",
  difficulty: 5,
  language: "es",
};

function HomePage() {
  const navigate = useNavigate();

  const handleSubmit = async () => {
    const url = process.env.REACT_APP_API_URL;
    
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    };

    const id = await fetch(`${url}/lobby/start`, {
      ...requestOptions,
      body: JSON.stringify(initialValues),
    })
      .then((res) => res.json())
      .then((res) => res.id)
      .catch((err) => console.log(err));

    navigate(`/lobby/${id}`);
  };

  return (
    <div>
      <h1>Wordle</h1>

      <Formik onSubmit={handleSubmit} initialValues={{}}>
        <Form>
          <button type="submit">Jugar</button>
        </Form>
      </Formik>
    </div>
  );
}

export default HomePage;
