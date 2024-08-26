import React, { Component, useEffect, useState } from "react";
import "../../style.css";
import { EditorState, ContentState, convertToRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import htmlToDraft from "html-to-draftjs";
import draftToHtml from "draftjs-to-html";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import ArrowBackIosRoundedIcon from "@mui/icons-material/ArrowBackIosRounded";

function PropertiesStep(props) {
  const [timeLimited, setTimeLimited] = useState(false);
  const [sendAll, setsendAll] = useState(false);
  const [showuser, setshowuser] = useState(false);
  useEffect(() => {
    if (props.obj.mainObj?.timeLimit) {
      setTimeLimited(true);
    }
  }, [props.obj.mainObj?.timeLimit]);
  console.log(props.obj.mainObj);

  useEffect(() => {
    if (props.obj.mainObj?.sendAll) {
      setsendAll(props.obj.mainObj?.sendAll);
    }
    if (props.obj.mainObj?.showuser) {
      setshowuser(props.obj.mainObj?.showuser);
    }
  }, [props.obj.mainObj?.sendAll, props.obj.mainObj?.showuser]);

  const [beforeTextState, setBeforeTextState] = useState(() =>
    EditorState.createEmpty()
  );
  const [afterTextState, setAfterTextState] = useState(() =>
    EditorState.createEmpty()
  );
  useEffect(() => {
    const isEmpty = beforeTextState.getCurrentContent().hasText() === false;
    if (!isEmpty) {
      // console.log("beforeTextState",beforeTextState)
      let html = draftToHtml(convertToRaw(beforeTextState.getCurrentContent()));
      props.obj.mainObjectAdderForProperties(html, "beforeTestText");
    }
  }, [beforeTextState]);
  useEffect(() => {
    document.querySelectorAll(".rdw-option-wrapper")?.forEach((ele, index) => {
      if (
        index == "3" ||
        index == "4" ||
        index == "5" ||
        index == "6 " ||
        index == "15" ||
        index == "18" ||
        index == "21" ||
        index == "27" ||
        index == "28" ||
        index == "29" ||
        index == "30 " ||
        index == "39" ||
        index == "42" ||
        index == "45"
      ) {
        ele.style.display = "none";
      }
    });
    document.querySelectorAll(".rdw-block-wrapper").forEach((ele) => {
      ele.style.display = "none";
    });
  }, []);
  useEffect(() => {
    const isEmpty = beforeTextState.getCurrentContent().hasText() === false;
    if (isEmpty && props?.obj.mainObj?.beforeTestText?.length > 0) {
      setBeforeTextState(
        EditorState.createWithContent(
          ContentState.createFromBlockArray(
            htmlToDraft(props?.obj.mainObj?.beforeTestText)
          )
        )
      );
    }
    const isafterEmpty = afterTextState.getCurrentContent().hasText() === false;
    if (isafterEmpty && props?.obj.mainObj?.afterTestText?.length > 0) {
      setAfterTextState(
        EditorState.createWithContent(
          ContentState.createFromBlockArray(
            htmlToDraft(props?.obj.mainObj?.afterTestText)
          )
        )
      );
    }
  }, [props.obj.mainObj?.beforeTestText, props.obj.mainObj?.afterTestText]);

  useEffect(() => {
    const isEmpty = afterTextState.getCurrentContent().hasText() === false;
    if (!isEmpty) {
      // console.log("afterTextState",afterTextState)
      let html = draftToHtml(convertToRaw(afterTextState.getCurrentContent()));
      props.obj.mainObjectAdderForProperties(html, "afterTestText");
    }
  }, [afterTextState]);
  return (
    <div
      hidden={props.obj.tabSelected == "PROPERTIES" ? false : true}
      className="categories-content w-[90%] mx-auto"
    >
      <div className="leftHalf  ">
        <br />
        <form
          className="formClass w-[80%] mx-auto mb-10"
          onSubmit={(e) => {
            e.preventDefault();
            props.obj.showTab("CATEGORIES");
          }}
        >
          <h3> #1 - Properties</h3>
          <label className="form-label"> Name </label>
          <input
            id="name"
            type="text"
            className="form-control mb-3 pt-3 pb-3"
            placeholder="Enter here the name of the test"
            value={props.obj.mainObj?.name}
            onChange={(e) => props.obj.mainObjectAdderForProperties(e, "name")}
            required
          />
          <label className="form-label"> Test structure </label>
          <select
            id="orientation"
            // value={orientation}
            onChange={(e) =>
              props.obj.mainObjectAdderForProperties(e, "orientation")
            }
            className="form-select mb-3 pt-3 pb-3"
            required
          >
            <option value="0">
              All the questions should appear in one page
            </option>
            <option value="1">Questions are shown one by one</option>
          </select>
          <label className="form-label">Language</label>
          <select
            id="language"
            onChange={(e) =>
              props.obj.mainObjectAdderForProperties(e, "language")
            }
            className="form-select mb-3 pt-3 pb-3"
            required
          >
            <option value="english">English</option>
            <option value="hebrew">Hebrew</option>
          </select>
          <label className="form-label">Scoring type</label>
          <select
            id="scoringType"
            // value={props.obj.mainObj?.scoringType }
            onChange={(e) =>
              props.obj.mainObjectAdderForProperties(e, "scoringType")
            }
            className="form-select mb-3 pt-3 pb-3"
            required
          >
            <option value="0">
              Answers could be only totally right or totally wrong
            </option>
            <option value="1">
              Answers could be right, wrong and the shades that in between
            </option>
          </select>
          <label className="form-label">Questions order</label>
          <select
            id="randomOrder"
            // value={props.obj.mainObj?.randomOrder}
            onChange={(e) =>
              props.obj.mainObjectAdderForProperties(e, "randomOrder")
            }
            className="form-select mb-3 pt-3 pb-3"
            required
          >
            <option value="0">Sequence</option>

            <option value="1">Random</option>
          </select>
          <input
            type="checkbox"
            onClick={(e) => {
              props.obj.mainObjectAdderForProperties(
                e.target.checked,
                "sendAll"
              );
              e.target.checked ? setsendAll(true) : setsendAll(false);
            }}
            checked={sendAll}
          />
          &nbsp;
          <label> Also send results to Testee</label>
          <br />
          <br />
          <input
            type="checkbox"
            onClick={(e) => {
              props.obj.mainObjectAdderForProperties(
                e.target.checked,
                "showuser"
              );
              e.target.checked ? setshowuser(true) : setshowuser(false);
            }}
            checked={showuser}
          />
          &nbsp;<label>Show Right Answer to testee</label>
          <br />
          <br />
          <input
            type="checkbox"
            onClick={(e) => {
              e.target.checked ? setTimeLimited(true) : setTimeLimited(false);
              props.obj.mainObjectAdderForProperties(
                { target: { value: 0 } },
                "timeLimit"
              );
            }}
            checked={timeLimited}
          />
          &nbsp; <label> Time Limited Test </label> <br />
          <div style={timeLimited ? { display: "block" } : { display: "none" }}>
            <label className="form-label">
              {" "}
              How long the test is going to be in minutes{" "}
            </label>
            <input
              id="timeLimit"
              type="number"
              min="1"
              max="100"
              name="timeLimit"
              className="form-control mb-3 pt-3 pb-3"
              placeholder="mins"
              value={props.obj.mainObj?.timeLimit}
              onChange={(e) =>
                props.obj.mainObjectAdderForProperties(e, "timeLimit")
              }
            />
          </div>
          <label className="form-label">
            The text that will appear before doing the test
          </label>
          <Editor
            editorState={beforeTextState}
            onEditorStateChange={setBeforeTextState}
            id="beforeTestText"
            wrapperClassName="wrapper-class"
            editorStyle={{ border: "1px solid black" }}
            // editorClassName="editor-class"
            toolbarClassName="toolbar-class"
          />
          <label className="form-label mt-4">
            The text that will appear after doing the test
          </label>
          <Editor
            editorState={afterTextState}
            onEditorStateChange={setAfterTextState}
            id="afterTestText"
            wrapperClassName="wrapper-class"
            editorStyle={{ border: "1px solid black" }}
            // editorClassName="editor-class"
            toolbarClassName="toolbar-class"
          />
          <div className="fixed  bottom-0 left-0 shadow-lg p-3 bg-white w-full">
            <div className="w-[90%]">
              <button
                type="submit"
                className="float-end  w-max   bg-blue-500 text-white py-2 rounded"
                onClick={(e) => {
                  props.obj.apiCallToCreateTest(e);
                }}
              >
                Save Test & Close
              </button>
            </div>
          </div>
          {/* <button
            className="next-button"
            type="submit"
            style={{ position: "relative", right: "20px" }}
          >
            {" "}
            Next{" "}
          </button> */}
        </form>
        <br />
        <br />
      </div>
      <button
        onClick={() => props.obj.setTabSelected("CATEGORIES")}
        className="fixed right-4 top-1/2 transform -translate-y-1/2 bg-blue-500 text-white p-4 rounded-full shadow-lg flex "
      >
        <ArrowForwardIosRoundedIcon />
      </button>
      {/* <button
        onClick={() => props.obj.setTabSelected("CATEGORIES")}
        className="fixed right-4 top-1/2 transform -translate-y-1/2 bg-blue-500 text-white p-4 rounded-full shadow-lg flex hidden "
      >
        <ArrowBackIosRoundedIcon />
      </button> */}
    </div>
  );
}

export default PropertiesStep;
