import React, { useEffect, useRef, useState, useCallback } from "react";
import "../../style.css";
import { apiCall } from "../../../../../apiCalls/apiCalls";
import { logoUploader } from "../../../../../apiCalls/apiRoutes";
import { toast } from "react-toastify";
import { serverImageUrl } from "../../../../../apiCalls/apiRoutes";
import { SketchPicker, SwatchesPicker, ChromePicker } from "react-color";
import { debounce } from "lodash";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import ArrowBackIosRoundedIcon from "@mui/icons-material/ArrowBackIosRounded";

function TestLayout(props) {
  const [
    showColorPickerForBackgroundColor,
    setShowColorPickerForBackgroundColor,
  ] = useState(false);
  const [showColorPickerForTextColor, setShowColorPickerForTextColor] =
    useState(false);
  const [
    showColorPickerForQuestionBackgroundColor,
    setShowColorPickerForQuestionBackgroundColor,
  ] = useState(false);
  const [
    showColorPickerForQuestionTextColor,
    setShowColorPickerForQuestionTextColor,
  ] = useState(false);
  const [showColorPickerForAnswerColor, setShowColorPickerForAnswerColor] =
    useState(false);

  const BackgroundColor = useRef(null);
  const TextColor = useRef(null);
  const QuestionBackgroundColor = useRef(null);
  const QuestionTextColor = useRef(null);
  const AnswerColor = useRef(null);

  const debouncedSetTextLayout = useCallback(
    debounce((newLayout) => setTextLayout(newLayout), 300),
    []
  );

  const handleColorChange = (color, field) => {
    const newLayout = { ...textLayout, [field]: color };
    debouncedSetTextLayout(newLayout);
  };

  const [textLayout, setTextLayout] = useState({
    answerColor: "",
    backgroundColor: "",
    imageUrl: "",
    questionBackgroundColor: "",
    questionTextColor: "",
    textColor: "",
  });
  const handleSwatchHover = (color, id) => {
    console.log(color);
  };
  // useEffect(() => {
  //   // Update the background color of the paper div
  //   const paperDiv = document.getElementById("paperDiv");
  //   if (paperDiv) {
  //     paperDiv.style.backgroundColor = textLayout.backgroundColor;
  //   }
  // }, [textLayout.backgroundColor]);

  useEffect(() => {
    if (
      props.obj.mainObj?.layout &&
      props.obj.mainObj?.layout !=
        {
          answerColor: "",
          backgroundColor: "",
          imageUrl: "",
          questionBackgroundColor: "",
          questionTextColor: "",
          textColor: "",
        }
    ) {
      setTextLayout((prevTextLayout) => ({
        ...prevTextLayout,
        ...props.obj.mainObj?.layout,
      }));
    }
  }, [props.obj.mainObj?.layout]);

  const showToastMessage = (text, color, notify) => {
    if (notify == 1) {
      toast.success(text, {
        position: toast.POSITION.TOP_RIGHT,
        style: { color: color },
      });
    } else {
      toast.warning(text, {
        position: toast.POSITION.TOP_RIGHT,
        style: { color: color },
      });
    }
  };
  const layoutFieldsAdder = (e, name) => {
    setTextLayout((prev) => {
      return { ...prev, [e.target.id]: e.target.value };
    });
    console.log(textLayout);
    props.obj.mainObjectAdderForLayout(
      e,
      "layout",
      e.target.id,
      e.target.value
    );
  };

  const [selectedFile, setSelectedFile] = useState(null);
  const [handleRend, setHandleRend] = useState(0);
  useEffect(
    (e) => {
      if (handleRend) {
        const formData = new FormData();
        formData.append("file", selectedFile);
        apiCall("post", logoUploader, formData)
          .then((res) => {
            if (res.status == 200) {
              let url = res.data.data;
              console.log(url);
              props.obj.mainObjectAdderForLayout(e, "layout", "imageUrl", url);
              setTextLayout((prev) => {
                return { ...prev, imageUrl: url };
              });
              showToastMessage("Logo updated Successfully ", "green", 1);
            }
          })
          .catch((err) => {
            showToastMessage(err?.response?.data?.message, "red", 2);
          });
      }
    },
    [handleRend]
  );

  useEffect(() => {
    const handleClickedOutside = (e) => {
      if (
        BackgroundColor.current &&
        !BackgroundColor.current.contains(e.target)
      ) {
        setShowColorPickerForBackgroundColor(false);
      }
      if (TextColor.current && !TextColor.current.contains(e.target)) {
        setShowColorPickerForTextColor(false);
      }
      if (
        QuestionBackgroundColor.current &&
        !QuestionBackgroundColor.current.contains(e.target)
      ) {
        setShowColorPickerForQuestionBackgroundColor(false);
      }
      if (
        QuestionTextColor.current &&
        !QuestionTextColor.current.contains(e.target)
      ) {
        setShowColorPickerForQuestionTextColor(false);
      }
      if (AnswerColor.current && !AnswerColor.current.contains(e.target)) {
        setShowColorPickerForAnswerColor(false);
      }
    };
    document.addEventListener("mousedown", handleClickedOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickedOutside);
    };
  }, []);

  const handleFileSelect = (event) => {
    console.log(event.target.files[0]);
    setSelectedFile(event.target.files[0]);
    setHandleRend(handleRend + 1);
  };

  return (
    <>
      <div
        className="layout-content"
        hidden={props.obj.tabSelected == "LAYOUT" ? false : true}
      >
        <div className="leftHalf w-full lg:w-[70%] mx-auto mb-20">
          <form
            onSubmit={(e) => {
              e.preventDefault();
            }}
            className=""
          >
            <h2 className="ml-5 lg:ml-8">LAYOUT</h2>
            <div className="w-full flex flex-col lg:flex-row">
              <div className="lg:w-3/4 w-full mx-auto">
                <div
                  className="paper relative h-max pb-10 px-10"
                  style={{
                    backgroundColor: textLayout.backgroundColor,
                    color: textLayout.textColor,
                    textAlign: "start",
                  }}
                >
                  {textLayout.imageUrl ? (
                    <>
                      <svg
                        style={{ position: "absolute" }}
                        width="800"
                        height="80"
                        className="lg:block hidden"
                      >
                        <line
                          x1="350"
                          y1="70"
                          x2="530"
                          y2="70"
                          stroke="black"
                          marker-start="url(#arrow1)"
                          marker-end="url(#arrow1)"
                        />
                      </svg>

                      <img
                        className="mx-auto my-4"
                        style={{ height: "150px", width: "250px" }}
                        src={`${serverImageUrl}/api${textLayout.imageUrl}`}
                        alt="Selected Logo"
                      />
                    </>
                  ) : (
                    <p
                      className="mx-auto my-4"
                      style={{ height: "150px", width: "250px" }}
                    >
                      No file chosen
                    </p>
                  )}
                  <div
                    style={{ position: "absolute", marginTop: "-60px" }}
                    className="lg:block hidden"
                  >
                    <svg
                      style={{ position: "absolute" }}
                      width="800"
                      height="20"
                    >
                      <line
                        x1="400"
                        y1="10"
                        x2="530"
                        y2="10"
                        stroke="black"
                        marker-start="url(#arrow1)"
                        marker-end="url(#arrow1)"
                      />
                    </svg>
                  </div>
                  <div
                    style={{ position: "absolute", marginTop: "0px" }}
                    className="lg:block hidden"
                  >
                    <svg
                      style={{ position: "absolute" }}
                      width="800"
                      height="40"
                    >
                      <line
                        x1="320"
                        y1="10"
                        x2="530"
                        y2="10"
                        stroke="black"
                        marker-start="url(#arrow1)"
                        marker-end="url(#arrow1)"
                      />
                    </svg>
                  </div>
                  <h3 className="text-center">#4 - My Questionaire</h3>

                  <h4
                    className="mt-20"
                    style={{
                      backgroundColor: textLayout.questionBackgroundColor,
                      color: textLayout.questionTextColor,
                      padding: "0.2rem 0.3rem",
                    }}
                  >
                    What is Computer
                  </h4>
                  <div
                    style={{ position: "absolute", marginTop: "-50px" }}
                    className="lg:block hidden"
                  >
                    <svg
                      style={{ position: "absolute" }}
                      width="600"
                      height="35"
                    >
                      <defs>
                        <marker
                          id="arrow1"
                          markerWidth="10"
                          markerHeight="10"
                          refX="10"
                          refY="3"
                          orient="auto"
                          fill="black"
                        >
                          <circle cx={"6"} cy={"4"} r={"4"} fill="black" />
                        </marker>
                        <marker
                          id="circle1"
                          markerWidth="8"
                          markerHeight="8"
                          refX="5"
                          refY="5"
                          orient="auto"
                        ></marker>
                      </defs>
                      <line
                        x1="200"
                        y1="28"
                        x2="530"
                        y2="28"
                        stroke="black"
                        marker-start="url(#arrow1)"
                        marker-end="url(#arrow1)"
                      />
                    </svg>
                  </div>
                  <div
                    style={{ position: "absolute" }}
                    className="lg:block hidden"
                  >
                    <svg
                      style={{ position: "absolute" }}
                      width="600"
                      height="150"
                    >
                      <line
                        x1="140"
                        y1="110"
                        x2="530"
                        y2="110"
                        stroke="black"
                        marker-start="url(#arrow1)"
                        marker-end="url(#arrow1)"
                      />
                    </svg>
                  </div>
                  <div
                    className="answer"
                    style={{ color: textLayout.answerColor }}
                  >
                    <div className="flex justify-between lg:flex-row mt-3">
                      <p className="pr-0 lg:pr-[10rem]">Answer 1</p>
                      <p>Answer 2</p>
                    </div>
                    <div
                      style={{ position: "absolute", marginTop: "0px" }}
                      className="lg:block hidden"
                    >
                      <svg
                        style={{ position: "absolute" }}
                        width="600"
                        height="150"
                      >
                        <defs>
                          <marker
                            id="arrow"
                            markerWidth="10"
                            markerHeight="10"
                            refX="0"
                            refY="3"
                            orient="auto"
                            fill="black"
                          >
                            <path d="M0,0 L0,6 L9,3 z" />
                          </marker>
                        </defs>
                        <line
                          x1="440"
                          y1="130"
                          x2="530"
                          y2="130"
                          stroke="black"
                          marker-start="url(#arrow1)"
                          marker-end="url(#arrow1)"
                        />
                      </svg>
                    </div>
                    <div className="flex justify-between lg:flex-row">
                      <p className="pr-0 lg:pr-[10rem]">Answer 3</p>
                      <p>Answer 4</p>
                    </div>
                  </div>
                  <h4
                    className="mt-10"
                    style={{
                      backgroundColor: textLayout.questionBackgroundColor,
                      color: textLayout.questionTextColor,
                      padding: "0.2rem 0.3rem",
                    }}
                  >
                    What is Physics
                  </h4>
                  <div
                    className="answer"
                    style={{ color: textLayout.answerColor }}
                  >
                    <div className="flex justify-between lg:flex-row">
                      <p className="pr-0 lg:pr-[10rem]">Answer 1</p>
                      <p>Answer 2</p>
                    </div>
                    <div className="flex justify-between lg:flex-row">
                      <p className="pr-0 lg:pr-[10rem]">Answer 3</p>
                      <p>Answer 4</p>
                    </div>
                  </div>
                </div>
                <div className="fixed bottom-0 left-0 shadow-lg p-3 bg-white w-full">
                  <div className="w-[90%] mx-auto">
                    <button
                      type="submit"
                      className="float-end w-max bg-blue-500 text-white py-2 rounded"
                      onClick={(e) => {
                        props.obj.apiCallToCreateTest(e);
                      }}
                    >
                      Save Test & Close
                    </button>
                  </div>
                </div>
              </div>

              <div className="lg:w-1/4 w-full px-5 mt-3 lg:mt-0">
                <label className="form-label">Please select your logo</label>
                <input
                  onChange={(e) => {
                    handleFileSelect(e);
                  }}
                  type="file"
                  className="form-control mb-3 pt-3 pb-3"
                  placeholder="choose a file"
                />

                <div ref={BackgroundColor} className="color-picker mt-3">
                  <button
                    onClick={() =>
                      setShowColorPickerForBackgroundColor(
                        !showColorPickerForBackgroundColor
                      )
                    }
                  >
                    Background Color
                  </button>
                  {showColorPickerForBackgroundColor && (
                    <ChromePicker
                      color={textLayout.backgroundColor}
                      onChange={(color) => {
                        layoutFieldsAdder({
                          target: { id: "backgroundColor", value: color.hex },
                        });
                      }}
                    />
                  )}
                </div>

                <div ref={TextColor} className="color-picker">
                  <br />
                  <button
                    onClick={() =>
                      setShowColorPickerForTextColor(
                        !showColorPickerForTextColor
                      )
                    }
                  >
                    Text Color
                  </button>
                  {showColorPickerForTextColor && (
                    <ChromePicker
                      color={textLayout.textColor}
                      onChange={(color) => {
                        layoutFieldsAdder({
                          target: { id: "textColor", value: color.hex },
                        });
                      }}
                    />
                  )}
                </div>

                <div ref={QuestionBackgroundColor} className="color-picker">
                  <br />
                  <br />
                  <br />
                  <button
                    onClick={() =>
                      setShowColorPickerForQuestionBackgroundColor(
                        !showColorPickerForQuestionBackgroundColor
                      )
                    }
                  >
                    Question Bg Color
                  </button>
                  {showColorPickerForQuestionBackgroundColor && (
                    <ChromePicker
                      color={textLayout.questionBackgroundColor}
                      onChangeComplete={(color) => {
                        layoutFieldsAdder({
                          target: {
                            id: "questionBackgroundColor",
                            value: color.hex,
                          },
                        });
                      }}
                    />
                  )}
                </div>

                <br />
                <div ref={QuestionTextColor} className="color-picker">
                  <br />
                  <br />
                  <button
                    onClick={() =>
                      setShowColorPickerForQuestionTextColor(
                        !showColorPickerForQuestionTextColor
                      )
                    }
                  >
                    Question Text COLOR
                  </button>
                  {showColorPickerForQuestionTextColor && (
                    <ChromePicker
                      color={textLayout.questionTextColor}
                      onChange={(color) => {
                        layoutFieldsAdder({
                          target: { id: "questionTextColor", value: color.hex },
                        });
                      }}
                    />
                  )}
                </div>

                <br />
                <div ref={AnswerColor} className="color-picker">
                  <br />
                  <button
                    onClick={() =>
                      setShowColorPickerForAnswerColor(
                        !showColorPickerForAnswerColor
                      )
                    }
                  >
                    Answer COLOR
                  </button>
                  {showColorPickerForAnswerColor && (
                    <ChromePicker
                      color={textLayout.answerColor}
                      onChange={(color) => {
                        layoutFieldsAdder({
                          target: { id: "answerColor", value: color.hex },
                        });
                      }}
                    />
                  )}
                </div>
              </div>
            </div>
          </form>
        </div>
        <button
          onClick={() => props.obj.setTabSelected("QUESTIONS")}
          className="fixed ml-4 top-1/2 transform -translate-y-1/2 bg-blue-500 text-white p-4 rounded-full shadow-lg flex "
        >
          <ArrowBackIosRoundedIcon />
        </button>
        <button
          onClick={() => props.obj.setTabSelected("RESULT STRUCTURE")}
          className="fixed right-4 top-1/2 transform -translate-y-1/2 bg-blue-500 text-white p-4 rounded-full shadow-lg flex "
        >
          <ArrowForwardIosRoundedIcon />
        </button>
      </div>
    </>
  );
}

export default TestLayout;
