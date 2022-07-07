import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClone } from "@fortawesome/free-solid-svg-icons";
import LobbyConfigForm from "../components/lobby/lobbyConfigForm";

const url = process.env.REACT_APP_API_URL;

function Lobby() {
  const { id } = useParams<string>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(true);
  const [copiedClipboard, setCopiedClipboard] = useState<boolean>(false);
  const link = `${url}/lobby/${id}`;

  useEffect(() => {
    fetchLobby();
    setLoading(false);
  }, []);

  const fetchLobby = async () => {
    return await fetch(`${url}/lobby/${id}`).then((res) => {
      if (res.status === 200) return;
      else return navigate("/404");
    });
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(link);
    setCopiedClipboard(true);
  };

  if (loading) return <h4>loading</h4>;

  return (
    <div className="centered">
      <h1>Lobby</h1>
      <div className="flex column ">
        <p>Enviá este link para que se unan al lobby</p>
        <div className="flex">
          <div className="link">{link}</div>
          <button
            className={`button ${copiedClipboard ? "ok" : ""}`}
            onClick={copyToClipboard}
          >
            <FontAwesomeIcon icon={faClone} />
          </button>
        </div>
      </div>
      <LobbyConfigForm />
    </div>
  );
}

export default Lobby;
