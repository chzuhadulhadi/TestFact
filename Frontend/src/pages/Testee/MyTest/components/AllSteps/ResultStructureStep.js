import React, { Component, useState } from "react";

import "../../style.css";
import showResultInGraphImg from "../../../../homepage/css/images/showresultingraph.png";
import tableSummaryImg from "../../../../homepage/css/images/imagetablesummary.png";
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';
import ArrowBackIosRoundedIcon from '@mui/icons-material/ArrowBackIosRounded';

function ResultStructureStep(props) {
  const [tableSummaryChecked, setTableSummaryChecked] = useState(
    props.obj.mainObj?.resultStructure.tableSummary || true
  );
  const [graphChecked, setGraphChecked] = useState(
    props.obj.mainObj?.resultStructure.graph || true
  );

  function handleTickChange(e, type) {
    if (type === "tableSummary") {
      setTableSummaryChecked(e.target.checked);
      setGraphChecked(e.target.checked);
    } else {
      setGraphChecked(e.target.checked);
      setTableSummaryChecked(e.target.checked);
    }
    props.obj.mainObjectAdderForResultStructure(e, "resultStructure", type);
  }

  return (
    <>
    <div hidden={props.obj.tabSelected === "RESULT STRUCTURE" ? false : true} >
    <div
      className="result-structure-content w-[80%] mx-auto"
      
      style={{ textAlign: "initial" }}
    >
      <h3>#5 - Result Structure</h3>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          props.obj.showTab("AUTOMATIC TEXT");
        }}
      >
        <label
          className="form-label m-2 fw-bold"
          style={{ fontSize: "1.6rem" }}
        >
          <input
            className="form-field"
            type="checkbox"
            id="tableSummary"
            onChange={(e) => handleTickChange(e, "tableSummary")}
            checked={tableSummaryChecked}
          />{" "}
          &nbsp; Table summary
        </label>
        <img style={{ width: "30%" }} src={tableSummaryImg} />
        <br />
        <label
          className="form-label m-2 fw-bold"
          style={{ fontSize: "1.6rem" }}
        >
          <input
            type="checkbox"
            id="showResultInGraph"
            onChange={(e) => handleTickChange(e, "graph")}
            checked={graphChecked}
          />{" "}
          &nbsp; Show Result in Graph
        </label>
        <img style={{ width: "20%" }} src={showResultInGraphImg} />
        <br />
        <div className="fixed  bottom-0 left-0 shadow-lg p-3 bg-white w-full">
          <div className="w-[90%]">
            <button
              type="submit"
              className="float-end w-max    bg-blue-500 text-white py-2 rounded"
              onClick={(e) => {
                props.obj.apiCallToCreateTest(e);
              }}
            >
              Save Test & Close
            </button>
          </div>
        </div>
        {/* <button type="submit" style={{ position: "relative", right: "20px" }}>
          Next
        </button> */}{" "}
      </form>
      
    </div>
    <button
                onClick={() => props.obj.setTabSelected("LAYOUT")}
                className="fixed LEFT-0 top-1/2 transform -translate-y-1/2 bg-blue-500 text-white p-4 rounded-full shadow-lg flex "
              >
                <ArrowBackIosRoundedIcon/>
              </button>
                <button
                onClick={() => props.obj.setTabSelected("AUTOMATIC TEXT")} 
                className="fixed right-0 top-1/2 transform -translate-y-1/2 bg-blue-500 text-white p-4 rounded-full shadow-lg flex "
              >
                <ArrowForwardIosRoundedIcon/>
              </button>
    </div>
    </>
  );
}

export default ResultStructureStep;
