import React, { Component, useState } from "react";
import { EditorState } from "draft-js";
import { useEffect } from "react";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { convertToHTML } from "draft-convert";
import "../../style.css";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import ArrowBackIosRoundedIcon from "@mui/icons-material/ArrowBackIosRounded";
var conditionCounter = 0;

const categoryTracking = {};
function AutomaticText(props) {
  const [html, setHtml] = useState({});
  const [automaticText, setAutomaticText] = useState({});
  const [showSubmit, setShowSubmit] = useState(false);
  const [beforeTextState, setBeforeTextState] = React.useState(() =>
    EditorState.createEmpty()
  );
  const [beforeTestTextHtml, setBeforeTestTextHtml] = useState();
  const [currentText, setCurrentText] = useState();
  console.log(props.obj?.mainObj);
  useEffect(() => {
    let html = convertToHTML(beforeTextState.getCurrentContent());
    setBeforeTestTextHtml(html);
  }, [beforeTextState]);

  const AutomaticTextAdder = (e, name) => {
    if (name == "category") {
      categoryTracking[e.target.id]
        ? (categoryTracking[e.target.id] = categoryTracking[e.target.id])
        : (categoryTracking[e.target.id] = {});
    } else {
      setAutomaticText((prev) => {
        let prevObj = Object.assign({}, prev);

        prevObj[e.target.id]
          ? (prevObj[e.target.id] = { ...prevObj[e.target.id] })
          : (prevObj[e.target.id] = { min: 0, max: 0, text: "", category: "" });
        prevObj[e.target.id][name] = e.target.value;
        return {
          ...prevObj,
        };
      });
    }
    props.obj.mainObjectAdderForAutomaticText(e, "automaticText", name);
    return 0;
  };
  console.log(props.obj.mainObj);
  function addAutomatictextRule() {
    setShowSubmit(true);
    setHtml((prevState) => {
      let name = Object.assign({}, prevState);
      name["condition" + conditionCounter] = (
        <>
          <div className="questionSetter">
            <select
              id={"condition" + conditionCounter}
              className="automatic-text-select-cat"
              onChange={(e) => AutomaticTextAdder(e, "category")}
            >
              <option style={{ backgroundColor: "yellow " }}>
                Overall Score
              </option>
              {Object.keys(props.obj.categoryStore).map((ele) => {
                return (
                  <option value={props.obj.categoryStore[ele].categoryName}>
                    {props.obj.categoryStore[ele].categoryName}
                  </option>
                );
              })}
            </select>
            <label className="form-label">Minimum Value</label>
            <input
              id={"condition" + conditionCounter}
              type="number"
              name="min"
              onChange={(e) => AutomaticTextAdder(e, "min")}
              placeholder="Min Value"
              className="form-control mb-3 pt-3 pb-3"
              required
            />
            <label className="form-label">Maximum Value</label>
            <input
              id={"condition" + conditionCounter}
              type="number"
              name="max"
              onChange={(e) => AutomaticTextAdder(e, "max")}
              placeholder="Max Value"
              className="form-control mb-3 pt-3 pb-3"
              required
            />
            <label className="form-label">Text for the range</label>
            <input
              id={"condition" + conditionCounter}
              type="text"
              name="text"
              onChange={(e) => AutomaticTextAdder(e, "text")}
              placeholder="Enter text"
              className="form-control mb-3 pt-3 pb-3"
              required
            />
            {/* <Editor

              onEditorStateChange={setBeforeTextState}
              id="beforeTestText"
              wrapperClassName="wrapper-class"
              editorClassName="editor-class"
              toolbarClassName="toolbar-class"
            /> */}
            <br />
          </div>
        </>
      );
      ++conditionCounter;
      return name; // return new object jasper object
    });
  }

  function addQuestiontextRule() {
    setShowSubmit(true);
    setHtml((prevState) => {
      let name = Object.assign({}, prevState);
      name["qcondition" + conditionCounter] = (
        <>
          <div className="questionSetter">
            <select
              id={"qcondition" + conditionCounter}
              className="automatic-text-select-cat"
              onChange={(e) => AutomaticTextAdder(e, "questionAnswer")}
            >
              <option>Select Question</option>
              {Object.keys(props.obj.categoryStore).map((ele) => {
                return (
                  <option value={props.obj.categoryStore[ele].categoryName}>
                    {props.obj.categoryStore[ele].categoryName}
                  </option>
                );
              })}
            </select>
            <label className="form-label">Text for the range</label>
            <input
              id={"qcondition" + conditionCounter}
              type="text"
              name="text"
              onChange={(e) => AutomaticTextAdder(e, "text")}
              placeholder="Enter text"
              className="form-control mb-3 pt-3 pb-3"
              required
            />
            <br />
          </div>
        </>
      );
      ++conditionCounter;
      return name; // return new object jasper object
    });
  }

  const deleteRule = () => {
    const updatedHtml = { ...html };
    const lastKey = Object.keys(updatedHtml).pop();
    delete updatedHtml[lastKey];
    setHtml(updatedHtml);

    // You may also want to decrement the conditionCounter if needed
    conditionCounter -= 1;
  };

  return (
    <>
      <div
        className="automatic-text-content "
        hidden={props.obj.tabSelected === "AUTOMATIC TEXT" ? false : true}
        style={{ textAlign: "start" }}
      >
        <div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              props.obj.apiCallToCreateTest(e);
            }}
            className="formClass w-[65%] lg:w-[80%] mx-auto mb-20"
          >
            <h3>#6 - AUTOMATIC TEXT</h3>
            {Object?.keys(props.obj?.mainObj?.automaticText || {})?.map(
              (key, index) => {
                //check if html is an empty object
                if (html[key]) {
                  return;
                }
                const condition = props.obj?.mainObj?.automaticText[key];
                return key.startsWith("qcondition") ? (
                  <div key={key}>
                    <div className="questionSetter ">
                      <label className="form-label">Text for the range</label>
                      <select
                        id={key}
                        className="automatic-text-select-cat"
                        onChange={(e) =>
                          AutomaticTextAdder(e, "questionAnswer")
                        }
                        value={
                          props.obj?.mainObj?.automaticText[key].questionAnswer
                        }
                      >
                        <option>Select Question/Answer</option>
                        {Object.keys(props.obj.mainObj?.questions).map(
                          (ele) => {
                            if (ele.startsWith("question")) {
                              const question =
                                props.obj.mainObj?.questions[ele]?.question;
                              console.log(question);
                              if (question) {
                                const answers = Object.keys(
                                  props.obj.mainObj.questions
                                )
                                  .filter((ansEle) =>
                                    ansEle.startsWith(ele + "-answer")
                                  )
                                  .map((ansEle) => {
                                    const answer =
                                      props.obj.mainObj.questions[ansEle]
                                        .answer;
                                    return (
                                      answer?.length > 0 && (
                                        <option key={ansEle} value={answer}>
                                          {answer}
                                        </option>
                                      )
                                    );
                                  });
                                return (
                                  <optgroup key={ele} label={question}>
                                    {answers}
                                  </optgroup>
                                );
                              }
                            }
                          }
                        )}
                      </select>

                      <input
                        id={key}
                        type="text"
                        name="text"
                        onChange={(e) => AutomaticTextAdder(e, "text")}
                        placeholder="Enter text"
                        className="form-control mb-3 pt-3 pb-3"
                        required
                        value={props.obj?.mainObj?.automaticText[key].text}
                      />
                      <br />
                    </div>
                  </div>
                ) : (
                  <div key={key}>
                    <div className="questionSetter">
                      <select
                        id={key}
                        className="automatic-text-select-cat"
                        onChange={(e) => AutomaticTextAdder(e, "category")}
                        value={condition.category}
                        style={{
                          backgroundColor:
                            condition.category === "Overall Score" && "yellow",
                        }}
                      >
                        <option>Overall Score</option>
                        {Object.keys(props.obj.categoryStore).map((ele) => {
                          return (
                            <option
                              key={ele}
                              value={props.obj.categoryStore[ele].categoryName}
                            >
                              {props.obj.categoryStore[ele].categoryName}
                            </option>
                          );
                        })}
                      </select>
                      <label className="form-label">Minimum Value</label>
                      <input
                        id={key}
                        type="number"
                        name="min"
                        onChange={(e) => AutomaticTextAdder(e, "min")}
                        placeholder="Min Value"
                        className="form-control mb-3 pt-3 pb-3"
                        required
                        value={condition.min}
                      />
                      <label className="form-label">Maximum Value</label>
                      <input
                        id={key}
                        type="number"
                        name="max"
                        onChange={(e) => AutomaticTextAdder(e, "max")}
                        placeholder="Max Value"
                        className="form-control mb-3 pt-3 pb-3"
                        required
                        value={condition.max}
                      />
                      <label className="form-label">Text for the range</label>
                      <input
                        id={key}
                        type="text"
                        name="text"
                        onChange={(e) => AutomaticTextAdder(e, "text")}
                        placeholder="Enter text"
                        className="form-control mb-3 pt-3 pb-3"
                        required
                        value={condition.text}
                      />
                      <br />
                    </div>
                  </div>
                );
              }
            )}

            {Object.keys(html).map(function (key, i) {
              return key.startsWith("qcondition") ? (
                <div key={key}>
                  <div className="questionSetter ">
                    {/* <label className="form-label">Minimum Value</label>
                  <input
                    id={key}
                    type="number"
                    name="min"
                    onChange={(e) => AutomaticTextAdder(e, "min")}
                    placeholder="Min Value"
                    className="form-control mb-3 pt-3 pb-3"
                    required
                  // value={condition.min}
                  />
                  <label className="form-label">Maximum Value</label>
                  <input
                    id={key}
                    type="number"
                    name="max"
                    onChange={(e) => AutomaticTextAdder(e, "max")}
                    placeholder="Max Value"
                    className="form-control mb-3 pt-3 pb-3"
                    required
                  // value={condition.max}
                  /> */}
                    <div className="flex gap-3">
                      <label className="form-label">Text for the range</label>
                      <select
                        id={key}
                        className="automatic-text-select-cat"
                        onChange={(e) =>
                          AutomaticTextAdder(e, "questionAnswer")
                        }
                      >
                        <option>Select Question/Answer</option>
                        {props.obj.mainObj &&
                          Object.keys(props.obj?.mainObj?.questions).map(
                            (ele) => {
                              if (ele.startsWith("question")) {
                                const question =
                                  props.obj.mainObj?.questions[ele].question;
                                console.log(question);
                                if (question) {
                                  const answers = Object.keys(
                                    props.obj.mainObj.questions
                                  )
                                    .filter((ansEle) =>
                                      ansEle.startsWith(ele + "-answer")
                                    )
                                    .map((ansEle) => {
                                      const answer =
                                        props.obj.mainObj.questions[ansEle]
                                          .answer;
                                      return (
                                        answer?.length > 0 && (
                                          <option key={ansEle} value={answer}>
                                            {answer}
                                          </option>
                                        )
                                      );
                                    });
                                  return (
                                    <optgroup key={ele} label={question}>
                                      {answers}
                                    </optgroup>
                                  );
                                }
                              }
                            }
                          )}
                      </select>
                    </div>
                    <input
                      id={key}
                      type="text"
                      name="text"
                      onChange={(e) => AutomaticTextAdder(e, "text")}
                      placeholder="Enter text"
                      className="form-control mb-3 pt-3 pb-3"
                      required
                      // value={condition.text}
                    />
                    {/* <Editor

                onEditorStateChange={setBeforeTextState}
                id="beforeTestText"
                wrapperClassName="wrapper-class"
                editorClassName="editor-class"
                toolbarClassName="toolbar-class"
              /> */}
                    <br />
                  </div>
                </div>
              ) : (
                <div key={key}>
                  <div className="questionSetter">
                    <div className="label ">
                      <label className="form-label">Choose Category</label>

                      <select
                        id={key}
                        className="automatic-text-select-cat"
                        onChange={(e) => AutomaticTextAdder(e, "category")}
                        // value={condition.category}
                      >
                        <option className="right-0">Overall Score</option>
                        {Object.keys(props.obj.categoryStore).map((ele) => {
                          return (
                            <option
                              key={ele}
                              value={props.obj.categoryStore[ele].categoryName}
                            >
                              {props.obj.categoryStore[ele].categoryName}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                    <label className="form-label">Minimum Value</label>

                    <input
                      id={key}
                      type="number"
                      name="min"
                      onChange={(e) => AutomaticTextAdder(e, "min")}
                      placeholder="Min Value"
                      className="form-control mb-3 pt-3 pb-3"
                      required
                      // value={condition.min}
                    />
                    <label className="form-label">Maximum Value</label>

                    <input
                      id={key}
                      type="number"
                      name="max"
                      onChange={(e) => AutomaticTextAdder(e, "max")}
                      placeholder="Max Value"
                      className="form-control mb-3 pt-3 pb-3"
                      required
                      // value={condition.max}
                    />
                    <label className="form-label">Text for the range</label>

                    <input
                      id={key}
                      type="text"
                      name="text"
                      onChange={(e) => AutomaticTextAdder(e, "text")}
                      placeholder="Enter text"
                      className="form-control mb-3 pt-3 pb-3"
                      required
                      // value={condition.text}
                    />
                    <button
                      style={{ position: "relative", marginBottom: "5px" }}
                      type="button"
                      onClick={deleteRule}
                    >
                      Delete Rule
                    </button>

                    {/* <Editor

                    onEditorStateChange={setBeforeTextState}
                    id="beforeTestText"
                    wrapperClassName="wrapper-class"
                    editorClassName="editor-class"
                    toolbarClassName="toolbar-class"
                  /> */}
                    <br />
                  </div>
                </div>
              );
            })}

            <button
              className="w-1/4 md:w-1/4 m-1"
              style={{ position: "relative" }}
              onClick={addAutomatictextRule}
            >
              Add a rule For Category
            </button>
            <button
              className="w-1/4 md:w-1/4 m-1"
              type="button"
              style={{ position: "relative" }}
              onClick={addQuestiontextRule}
            >
              Add a rule For Question
            </button>
            <div className="fixed  bottom-0 left-0 shadow-lg p-3 bg-white w-full">
              <div className="w-[90%]">
                <button
                  type="submit"
                  className="float-end w-max   bg-blue-500 text-white py-2 rounded"
                  onClick={(e) => {
                    props.obj.apiCallToCreateTest(e);
                  }}
                >
                  Save Test & Close
                </button>
              </div>
            </div>
          </form>
        </div>
        <button
          onClick={() => props.obj.setTabSelected("RESULT STRUCTURE")}
          className="fixed ml-4 top-1/2 transform -translate-y-1/2 bg-blue-500 text-white p-4 rounded-full shadow-lg flex "
        >
          <ArrowBackIosRoundedIcon />
        </button>
      </div>
    </>
  );
}
export default AutomaticText;
