import React from "react";
import { useHistory } from "react-router";
import Replay from "@material-ui/icons/Replay";
import "../css/error.css";

const Error = () => {
  const history = useHistory();

  return (
    <div className='errorContainer'>
      <div>
        <button onClick={() => history.go(0)} className='actionsButton'>
          <Replay
            style={{
              margin: "auto",
              color: "#26c485",
              fontSize: 60,
              cursor: "pointer"
            }}
          />
        </button>

        <h1 className='errorMessage'>something went wrong please try again</h1>
      </div>
    </div>
  );
};

export default Error;
