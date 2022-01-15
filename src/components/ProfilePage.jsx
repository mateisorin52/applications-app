import React, { useEffect, useState, useContext } from "react";
import "./componentsCss/ProfilePage.css";
import { CardContext } from "./CardContext";
import { AiOutlineCloseCircle } from "react-icons/ai";
const axios = require("axios");
const ProfilePage = ({ profileId }) => {
  const [applications, setApplications] = useState();
  const [videoNumber, setVideoNumber] = useState(0);
  const [questions, setQuestions] = useState();
  const [videoSrc, setVideoSrc] = useState();
  const [comment, setComment] = useState();
  const [comments, setComments] = useState("");
  const { showProfile, setShowProfile } = useContext(CardContext);
  //fetching applications from the api.json
  const fetchApplications = () => {
    axios.get("http://localhost:3010/applications").then((res) => {
      res.data.map((application) => {
        if (application.id == profileId) {
          setApplications(application);
          console.log(application.videos);
        }
      });
    });
  };
  //fetching questions from the api.json
  const fetchQuestions = () => {
    console.log("fets");
    axios.get("http://localhost:3010/questions").then((res) => {
      res.data.map((question) => {
        console.log(applications);
        if (question.id == applications.videos[videoNumber].questionId)
          setQuestions(question);
        setComments(applications.videos[videoNumber].comments);
      });
    });
  };
  //incrementVideo goes to the next video of the same application
  const incrementVideo = () => {
    if (videoNumber < applications.videos.length - 1) {
      setVideoNumber(videoNumber + 1);
      setVideoSrc(applications.videos[videoNumber + 1].src);
    }
  };
  //addComment updates the info from the api.json file
  const addComment = () => {
    applications.videos[videoNumber].comments += " " + comment;
    axios
      .put(
        `http://localhost:3010/applications/${applications.id}`,
        applications
      )
      .then((res) => {
        setComments(applications.videos[videoNumber].comments);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    fetchApplications();
  }, []);
  useEffect(() => {
    if (applications) {
      fetchQuestions();
      setVideoSrc(applications.videos[videoNumber].src);
    }
  }, [applications, videoNumber]);
  return (
    <div className="profile-page">
      <div className="videos">
        {videoSrc ? (
          <video key={videoSrc} controls className="video">
            <source src={videoSrc} type="video/mp4"></source>
          </video>
        ) : (
          <div>Loading Video...</div>
        )}
        <button onClick={incrementVideo}>Next Video</button>
        {videoNumber}
        <div className="questions">
          {questions ? questions.question : "Loading Question"}
        </div>
        <div className="comments">
          {comments != ""
            ? comments.split(" ").map((comment, index) => {
                return (
                  <label className="comment">
                    {index + 1}. {comment}
                  </label>
                );
              })
            : "No comments yet"}
        </div>
        <input
          onChange={(e) => setComment(e.target.value)}
          placeholder="Write your comment"
          className="add-comment"
        ></input>
        <button onClick={addComment} className="comment-button">
          Add Commnent
        </button>
      </div>
      <AiOutlineCloseCircle
        onClick={() => setShowProfile(false)}
        className="close-window"
      ></AiOutlineCloseCircle>
    </div>
  );
};

export default ProfilePage;
