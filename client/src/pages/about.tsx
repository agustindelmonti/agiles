import React from "react";
import styled from "styled-components";

function AboutPage() {
  return (
    <div>
      <CenteredContainer>
        <article>
          <h2>Cómo jugar</h2>
          <p>
            Adivina la palabra oculta en seis intentos. Cada intento debe ser
            una palabra válida de 5 letras. Después de cada intento el color de
            las letras cambia para mostrar qué tan cerca estás de acertar la
            palabra.
          </p>
          <ul>
            <li>⬜️ Gris: la letra no esta en la palabra</li>
            <li>
              🟨 Amarillo: la letra es correcta pero está en una posisión
              incorrecta
            </li>
            <li>
              🟩 Verde: la letra es correcta y está en una posisión incorrecta
            </li>
          </ul>
        </article>
      </CenteredContainer>
    </div>
  );
}

export default AboutPage;

const CenteredContainer = styled.div`
  max-width: 42rem;
  margin-top: 4rem;
  margin-inline: auto;
`;
