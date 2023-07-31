import { useEffect, useState } from "react";
import "../Styles/TeamCard.css";
import Loader from "../Components/Loader";
import { Input } from "antd";

function TeamCard({ setIsModelOpen, activeGame }) {
  const [inTeam, setInTeam] = useState(false);
  const email = JSON.parse(localStorage.getItem("user")).email;
  const [step, setStep] = useState(0);
  const [players, setPlayers] = useState([]);
  const [loading,setLoading]=useState(false);
  const [player, setPlayer] = useState("");
  const [teamName,setTeamName]=useState("");

  useEffect(() => {
    console.log("ActiveGame: " + JSON.stringify(activeGame));
  }, []);

  const sendInvite = () => {
    const currentPlayers = players;
    currentPlayers.push(player);
    setPlayer('');
    setPlayers(currentPlayers);
  };

  const renderPlayers = () => {
    if (players.length === 0)
      return (
        <p style={{ marginLeft: "10px", marginBottom: "10px" }}>No Players Yet.</p>
      );
    return players.map((player) => {
      return (
        <p style={{ marginLeft: "10px", marginBottom: "10px" }}>{player}</p>
      );
    });
  };

  return (
    <>
      <div
        style={{
          position: "fixed",
          top: "0px",
          width: "100%",
          zIndex: "9999",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
        }}
      >
        <div
          className="team-card-bg"
          onClick={() => setIsModelOpen(false)}
        ></div>
        <div
          className="team-card-body"
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          {step === 0 ? (
            <div className="create-team-body">
              <p className="create-team-title">Create Your Team !!!</p>
              <div onClick={() =>{
                  //make api call to create a team name
                  setLoading(true)
                  fetch("http://127.0.0.1:5001/trivia-titans-390605/us-central1/app/createTeam",{
                    method:"POST",
                    headers:{
                      "content-type":"application/json"
                    },
                    body: JSON.stringify({
                      email:email,
                      game:"Sample_game"
                    })
                  }).then((res)=>res.json())
                  .then((data)=>{
                    //
                    console.log(data);
                    setTeamName(data.team_name);
                    setStep(1);
                  })
              }} className="create-team-btn">
                Generate Team Name
              </div>
            </div>
          ) : step === 1 ? (
            <div className="create-team-body">
              <p className="create-team-title">Invite Players to {teamName} !!!</p>
              <div style={{ display: "flex", justifyContent: "space-between", width: '100%' }}>
                <div style={{ width: "40%", display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <Input
                    value={player}
                    onChange={(e) => setPlayer(e.target.value)}
                  />
                  <div className="send-invite-btn" onClick={() => sendInvite()}>
                    Send Invite
                  </div>
                </div>
                <div style={{ width: "40%" }}>{renderPlayers()}</div>
              </div>
            </div>
          ) : null}
        </div>
      </div>
      {<Loader isLoading={loading}/>}
    </>
  );
}

export default TeamCard;
