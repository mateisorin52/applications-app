import React, { useContext, useState } from "react";
import "./componentsCss/CandidateCard.css";
import { CardContext } from "./CardContext";
const CandidateCard = ({ id, name,applicationId }) => {
    const {showProfile,setShowProfile} = useContext(CardContext)
    //updates the global context so that the upper component will update it's state
    const goToProfile = (id) =>{
        if(id) setShowProfile(id)
        else(alert("No application added"))
    }
    
  return (
    <div className="card">
      <div className="card-id">{id}</div>
      <div className="card-body">
        <label className="card-name">{name}</label>
      </div>
      <button onClick={()=>goToProfile(applicationId)} className="card-button">See profile</button>
    </div>
  );
};

export default CandidateCard;
