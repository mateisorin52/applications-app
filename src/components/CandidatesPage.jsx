import React, { useEffect, useState, createContext } from "react";
import "./componentsCss/CandidatesPage.css";
import CandidateCard from "./CandidateCard";
import ProfilePage from "./ProfilePage";
import { CardContext } from "./CardContext";
const axios = require("axios");
const CandidatesPage = () => {
  const [candidates, setCandidates] = useState([]);
  const [showProfile, setShowProfile] = useState(false);
  //fetch Candidates from the api.json file
  const fetchCandidates = () => {
    axios
      .get("http://localhost:3010/candidates")
      .then((res) => setCandidates(res.data));
  };
  useEffect(() => {
    fetchCandidates();
  }, []);

  return (
    <CardContext.Provider value={{ showProfile, setShowProfile }}>
      <div className="main-container">
        {candidates.map((candidate) => {
          return (
            <CandidateCard
              id={candidate.id}
              name={candidate.name}
              applicationId={candidate.applicationId}
            />
          );
        })}
      </div>
      {showProfile ? <ProfilePage profileId={showProfile} /> : ""}
    </CardContext.Provider>
  );
};
export default CandidatesPage;
