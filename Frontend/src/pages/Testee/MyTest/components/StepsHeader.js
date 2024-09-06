import React, { useState } from "react";
import "../style.css";

const StepsHeader = (props) => {
  // State to manage the visibility of MultiStepHeader
  const [showMultiStepHeader, setShowMultiStepHeader] = useState(true);

  const handleCreateButtonClick = () => {
    // Toggle the visibility of MultiStepHeader when the button is clicked
    setShowMultiStepHeader(!showMultiStepHeader);
    // Add any other logic you want to perform when the button is clicked
  };

  return (
    <>
      {showMultiStepHeader && (
        <div className="d-flex mt-4">
          <div className="MultiStepHeader">
            <h4
              className="heading4"
              style={{
                backgroundColor:
                  props.obj.tabSelected === "PROPERTIES" ? "#3B4647" : "blue",
                opacity: props.obj.tabSelected === "PROPERTIES" ? 1 : 0.5,
              }}
              id="1"
              onClick={() => {
                props.obj.showTab("PROPERTIES");
              }}
            >
              <span id="1">1</span>Properties{" "}
            </h4>
            <h4
              className="heading4"
              style={{
                backgroundColor:
                  props.obj.tabSelected === "CATEGORIES" ? "#3B4647" : "blue",
                opacity: props.obj.tabSelected === "CATEGORIES" ? 1 : 0.5,
              }}
              id="2"
              onClick={() => {
                props.obj.showTab("CATEGORIES");
              }}
            >
              <span id="2">2</span>Categories{" "}
            </h4>
            <h4
              className="heading4"
              style={{
                opacity: props.obj.tabSelected === "QUESTIONS" ? 1 : 0.5,
                backgroundColor:
                  props.obj.tabSelected === "QUESTIONS" ? "#3B4647" : "blue",
              }}
              id="3"
              onClick={() => {
                props.obj.showTab("QUESTIONS");
              }}
            >
              <span id="3">3</span>Questions{" "}
            </h4>
            <h4
              className="heading4"
              style={{
                opacity: props.obj.tabSelected === "LAYOUT" ? 1 : 0.5,
                backgroundColor:
                  props.obj.tabSelected === "LAYOUT" ? "#3B4647" : "blue",
              }}
              id="4"
              onClick={() => {
                props.obj.showTab("LAYOUT");
              }}
            >
              <span id="4">4</span>Layout{" "}
            </h4>
            <h4
              className="heading4"
              style={{
                opacity: props.obj.tabSelected === "RESULT STRUCTURE" ? 1 : 0.5,
                backgroundColor:
                  props.obj.tabSelected === "RESULT STRUCTURE"
                    ? "#3B4647"
                    : "blue",
              }}
              id="5"
              onClick={() => {
                props.obj.showTab("RESULT STRUCTURE");
              }}
            >
              <span id="5">5</span>Result structure{" "}
            </h4>
            <h4
              className="heading4"
              style={{
                opacity: props.obj.tabSelected === "AUTOMATIC TEXT" ? 1 : 0.5,
                backgroundColor:
                  props.obj.tabSelected === "AUTOMATIC TEXT"
                    ? "#3B4647"
                    : "blue",
              }}
              id="6"
              onClick={() => {
                props.obj.showTab("AUTOMATIC TEXT");
              }}
            >
              <span id="6">6</span>Automatic Text{" "}
            </h4>
            {/* <h4
              className="heading4"
              style={{
                opacity: props.obj.tabSelected === "Preview" ? 1 : 0.5,
                backgroundColor: props.obj.tabSelected === "Preview" ? "#3B4647" : "blue",
              }}
              id="7"
              onClick={() => { props.obj.showTab("Preview") }}
            >
              <span id="7">7</span>Preview{" "}
            </h4> */}
          </div>
        </div>
      )}
    </>
  );
};

export default StepsHeader;
