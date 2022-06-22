import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import LobbyConfigForm from "../components/lobby/lobbyConfigForm";

function Lobby() {
  const { id } = useParams<string>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchLobby();
    setLoading(false);
  }, []);

  const fetchLobby = async () => {
    const url = process.env.REACT_APP_API_URL;
    return await fetch(`${url}/lobby/${id}`).then((res) => {
      if (res.status === 200) return;
      else return navigate("/404");
    });
  };

  if (loading) return <h4>loading</h4>;

  return (
    <div>
      <h1>Lobby</h1>
      <div>
        Room code: {id} <button>Copy</button>
      </div>
      <LobbyConfigForm />
    </div>
  );
}

export default Lobby;
