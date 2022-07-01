import React from "react";
import { Form, Formik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { ConfigValues } from "../components/lobby/ConfigValues";
import styled from "styled-components";

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
      <div className="centered">
        <h1>Wordle</h1>
        <p>Un juego para adivinar palabras y competir con tus amigos</p>
      </div>
      <div className="centered">
        <Button type="submit" onClick={handleSubmit}>
          Crear sala
        </Button>
      </div>
      <Footer>
        <FooterLinks>
          <Link to="/about">Acerca de</Link>
        </FooterLinks>
      </Footer>
    </div>
  );
}

export default HomePage;

const Footer = styled.footer`
  display: flex;
  justify-content: center;
  padding-left: 2rem;
  padding-right: 2rem;
  margin-top: 2.5rem;
`;

const FooterLinks = styled.div`
  display: flex;
  justify-content: center;
  max-width: 36rem;
  padding-left: 2rem;
  padding-right: 2rem;
  margin-top: 2.5rem;
  border-top: 1px solid #e5e7eb;
`;

const Button = styled.button`
  text-transform: uppercase;
  font-size: 30px;
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
