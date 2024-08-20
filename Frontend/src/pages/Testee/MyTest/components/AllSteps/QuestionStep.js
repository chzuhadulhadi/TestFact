import React, { useEffect, useState } from "react";
import { apiCall } from "../../../../../apiCalls/apiCalls";
import {
  logoUploader,
  getAllPreviousQuestions,
} from "../../../../../apiCalls/apiRoutes";
import { toast } from "react-toastify";
import { serverImageUrl } from "../../../../../apiCalls/apiRoutes";
import { useHistory } from "react-router-dom";
import XLSX from "sheetjs-style";
import { Grid, Box } from "@mui/material";
// import '../../style.css'
import "./steps.css";
import Modal from "react-bootstrap/Modal";
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';
import ArrowBackIosRoundedIcon from '@mui/icons-material/ArrowBackIosRounded';

var questionCounter = 0;
var answerCounter = 0;
var imageCounter = 0;
// var object = [];

function QuestionStep(props) {
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
  const [html, setHtml] = useState({});
  const [htmlAnswer, setHtmlAnswer] = useState({});
  const [selectedFile, setSelectedFile] = useState(null);
  const [handleRend, setHandleRend] = useState(0);
  const [questionCount, setQuestionCount] = useState(0);
  const [questionbank, setQuestionBank] = useState([]);
  const [showExampleModal, setShowExampleModal] = useState(false);
  useEffect(() => {
    apiCall("post", getAllPreviousQuestions)
      .then((res) => {
        if (res.status == 200) {
          setQuestionBank(res.data.data);
        }
      })
      .catch((err) => {
        showToastMessage(err?.response?.data?.message, "red", 2);
      });
  }, []);
  console.log("questionbank", questionbank);
  const handleFileSelect = (event) => {
    console.log(event.target.files[0]);
    setSelectedFile(event.target.files[0]);
    setHandleRend(handleRend + 1);
    questionphoto(event);
  };

  const handleAnswerFileSelect = (event) => {
    console.log(event.target.files[0]);
    setSelectedFile(event.target.files[0]);
    setHandleRend(handleRend + 1);
    answerphoto(event);
  };
  const answerphoto = (e) => {
    const lastIndex = e.target.id.lastIndexOf("-");
    const result = e.target.id.substring(0, lastIndex);
    // console.log('answerphoto',e.target.files[0]);
    console.log("answerphoto", e.target.id);
    console.log(result);
    const formData = new FormData();
    formData.append("file", e.target.files[0]);
    apiCall("post", logoUploader, formData)
      .then((res) => {
        if (res.status == 200) {
          let url = res.data.data;
          document.getElementById(`img_${result}`).src = serverImageUrl + url;
          // change position
          document.getElementById(`img_${result}`).style.position = "relative";
          document.getElementById(`img_${result}`).style.right = "0px";
          document.getElementById(`img_${result}`).style.top = "0px";
          props.obj.mainObjectAdder(
            { target: { id: result, value: url } },
            "questions",
            result,
            "image"
          );
          // console.log(url);
        }
      })
      .catch((err) => {
        showToastMessage(err?.response?.data?.message, "red", 2);
      });
  };

  const questionphoto = (e) => {
    console.log("questionphoto", e.target.id);
    const formData = new FormData();
    formData.append("file", e.target.files[0]);
    apiCall("post", logoUploader, formData)
      .then((res) => {
        if (res.status == 200) {
          let url = res.data.data;
          // console.log(url);
          props.obj.mainObjectAdder(
            { target: { id: e.target.id.split("-")[0], value: url } },
            "questions",
            e.target.id.split("-")[0],
            "image"
          );
          showToastMessage("Question updated Successfully ", "green", 1);
          // console.log('img_question0', `img_${e.target.id.split('-')[0]}`);
          document.getElementById(`img_${e.target.id.split("-")[0]}`).src =
            serverImageUrl + url;
          // change position
          document.getElementById(
            `img_${e.target.id.split("-")[0]}`
          ).style.position = "relative";
          document.getElementById(
            `img_${e.target.id.split("-")[0]}`
          ).style.right = "0px";
          document.getElementById(
            `img_${e.target.id.split("-")[0]}`
          ).style.top = "0px";

          imageCounter++;
        }
      })
      .catch((err) => {
        showToastMessage(err?.response?.data?.message, "red", 2);
      });
  };

  const checkquestions = () => {
    const questionsData = props?.obj?.mainObj?.questions || {};
    const freeTextData = props?.obj?.mainObj?.freeText || {};

    // Initialize html state for questions
    setHtml((prevState) => {
      let newState = { ...prevState };

      for (const key in questionsData) {
        if (key.startsWith("question") && !key.includes("-")) {
          const index = key.split("question")[1];
          newState[key] = (
            <>
              <Grid id={key} className="QuesAns" container>
                <Grid id="singleQuestion" className="question" xs={12}>
                  <label className="form-label">Question</label>
                </Grid>
                <Grid item xs={10}>
                  <input
                    type="file"
                    id={`question${index}-image`}
                    onChange={(e) => {
                      handleFileSelect(e);
                    }}
                  />

                  {questionsData[key].image ? (
                    <img
                      id={`img_question${index}`}
                      height={"200px"}
                      width={"200px"}
                      src={
                        questionsData[key].image
                          ? serverImageUrl + questionsData[key].image
                          : null
                      }
                    />
                  ) : (
                    <img
                      id={`img_question${index}`}
                      height={"200px"}
                      width={"200px"}
                      style={{
                        position: "fixed",
                        right: "-200px",
                        top: "-200px",
                      }}
                    />
                  )}
                </Grid>
                <Grid
                  item
                  xs={2}
                  sx={{ display: "flex", flexDirection: "column" }}
                >
                  {Object.keys(props.obj.categoryStore).length > 0 && (
                    <select
                      name="selectCategory"
                      className="select-category question-div"
                      id={"question" + index}
                      defaultValue={
                        props.obj.mainObj["questions"][`question${index}`]
                          ?.categoryName
                      }
                      onChange={(e) => categoryValueAdder(e, "categoryName")}
                    >
                      <option>Select Category</option>
                      {Object.keys(props.obj.categoryStore).map(
                        (key, index) => {
                          return (
                            <option
                              value={
                                props.obj.categoryStore[key]["categoryName"]
                              }
                            >
                              {props.obj.categoryStore[key]["categoryName"]}
                            </option>
                          );
                        }
                      )}
                    </select>
                  )}
                  <div style={{ display: "flex", flexDirection: "row" }}>
                    <input
                      id={"freeText" + index}
                      name={"question" + index}
                      type="checkbox"
                      className="free-text-check question-div"
                      onChange={handleFreeTextChange}
                      defaultChecked={questionsData[key].freeText}
                    />
                    <label
                      className="form-label question-div"
                      class="free-text-label question-div"
                    >
                      Free Text
                    </label>
                  </div>
                </Grid>
                <Grid item xs={9}>
                  <input
                    id={key}
                    type="text"
                    name="categoryField"
                    onChange={(e) => categoryValueAdder(e, "question")}
                    placeholder="Question"
                    className="form-control mb-3 pt-3 pb-3"
                    required
                    defaultValue={questionsData[key].question}
                  />
                </Grid>
                <Grid item xs={3}>
                  <button
                    style={{
                      position: "relative",
                      top: "-10px",
                      fontSize: "",
                    }}
                    className="add-answer-text question-div "
                    id={"answer" + answerCounter}
                    name={"question" + index}
                    onClick={(e) => addHtmlAnswer(e)}
                  >
                    Add Answer
                  </button>
                </Grid>
              </Grid>
            </>
          );
          ++questionCounter;
        }
      }

      return newState;
    });

    // Initialize htmlAnswer state for questions
    setHtmlAnswer((prevState) => {
      let newState = { ...prevState };

      for (const key in questionsData) {
        if (
          key.startsWith("question") &&
          questionsData[key].hasOwnProperty("answer")
        ) {
          answerCounter++;
          newState[key] = (
            <>
              <div className="question-div QuesAns">
                <label className="form-label" hidden>
                  Answer
                </label>
                <input
                  type="file"
                  id={`question${
                    key.split("question")[1]
                  }-answer${answerCounter}-image`}
                  onChange={handleAnswerFileSelect}
                />
                {questionsData[key].image ? (
                  <img
                    id={`img_question${
                      key.split("question")[1]
                    }-answer${answerCounter}`}
                    height={"200px"}
                    width={"200px"}
                    src={
                      questionsData[key].image
                        ? serverImageUrl + questionsData[key].image
                        : null
                    }
                  />
                ) : (
                  <img
                    id={`img_question${
                      key.split("question")[1]
                    }-answer${answerCounter}`}
                    height={"200px"}
                    width={"200px"}
                    style={{
                      position: "fixed",
                      right: "-200px",
                      top: "-200px",
                    }}
                  />
                )}
                <input
                  id={key}
                  type="text"
                  name="categoryField"
                  onChange={(e) => answerAdder(e, "answer")}
                  placeholder="Answer"
                  className="form-control mb-3 pt-3 pb-3 answers-field"
                  required
                  defaultValue={questionsData[key].answer}
                />
                {props.obj.getMainObj().scoringType == 1 ? (
                  <>
                    <label className="form-label" hidden>
                      Points
                    </label>
                    <input
                      id={key}
                      type="number"
                      onChange={(e) => answerAdder(e, "point")}
                      placeholder="points"
                      min="0"
                      max="10"
                      defaultValue={questionsData[key].point}
                      className="form-control mb-3 pt-3 pb-3 answers-field-points"
                      required
                    ></input>
                  </>
                ) : (
                  // console.log('questionsData[key].point', questionsData[key].point),
                  <>
                    <label className="form-label" hidden>
                      Type
                    </label>
                    <select
                      className="form-control mb-3 pt-3 pb-3 answers-field-points"
                      id={key}
                      defaultValue={questionsData[key].point}
                      onChange={(e) => answerAdder(e, "point")}
                      // style={{ backgroundColor: (questionsData[key].point === null || questionsData[key].point === 0) ? 'red' : 'green' }}
                    >
                      <option value={0} style={{ color: "red" }}>
                        False
                      </option>
                      <option value={10} style={{ color: "green" }}>
                        True
                      </option>
                    </select>
                  </>
                )}
              </div>
            </>
          );
        }
      }

      return newState;
    });

    // Initialize html state for free-text questions
    // setHtml((prevState) => {
    //   let newState = { ...prevState };
    //   console.log(freeTextData);
    //   for (const key in freeTextData) {
    //     console.log(key);
    //     if (key.startsWith("question")) {
    //       newState[key] = (
    //         <>
    //           <div id={key}>
    //             <div id="singleQuestion" className="question">
    //               <label className="form-label">Question</label>
    //               <input
    //                 id={key}
    //                 type="text"
    //                 name="categoryField"
    //                 onChange={(e) => categoryValueAdder(e, "question")}
    //                 placeholder="Question"
    //                 className="form-control mb-3 pt-3 pb-3"
    //                 required
    //                 defaultValue={freeTextData[key].question}
    //               />
    //             </div>
    //             <input
    //               id={"freeText" + questionCounter}
    //               name={"question" + questionCounter}
    //               type="checkbox"
    //               class="free-text-check"
    //               onChange={handleFreeTextChange}
    //               defaultValue={freeTextData[key].freeText}
    //             />
    //             <label className="form-label" class="free-text-label">
    //               Free Textsss
    //             </label>
    //             {/* ... other form elements */}
    //           </div>
    //         </>
    //       );
    //     }
    //   }

    //   return newState;
    // });
  };
  useEffect(() => {
    if (props?.obj?.mainObj && Object.keys(html).length === 0) {
      // const ques=setTimeout(() => {
      checkquestions();
      // }, 3000);
    }
    // return () => {
    // clearTimeout(ques);
    // }
  }, [props?.obj?.mainObj]);

  const [selectedCategory, setSelectedCategory] = useState();
  const [freeText, setFreeText] = useState({});
  const [allQUestionView, setAllQUestionView] = useState("See Only Questions");
  const [lenght, setLength] = useState(null);

  const categoryValueAdder = (e, name) => {
    props.obj.mainObjectAdder(e, "questions", e.target.id, name);
    return 0;
  };

  const handleUpload = async (e) => {
    e.preventDefault();

    const reader = new FileReader();
    reader.readAsArrayBuffer(selectedFile);

    reader.onload = async (e) => {
      try {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: "array" });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const xlData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
        xlData.forEach((row, index) => {
          // console.log(!!(row[0] && row[1] && row[2] && row[3]));
          console.log(row[0], row[1], row[2], row[3]);
          // console.log(row[0] == undefined && row[1] && row[2] && row[3]);
          if (
            (row[2] + "")?.toLowerCase() == "true" ||
            (row[2] + "")?.toLowerCase() == "false"
          ) {
            if (!!(row[0] && row[1] && row[3])) {
              console.log("quesiton", row);
              questionCounter++;
              props.obj.mainObjectAdder(
                { target: { id: `question${questionCounter}`, value: row[0] } },
                "questions",
                `question${questionCounter}`,
                "question"
              );
              props.obj.mainObjectAdder(
                { target: { id: `question${questionCounter}`, value: row[3] } },
                "questions",
                `question${questionCounter}`,
                "categoryName"
              );
              props.obj.mainObjectAdder(
                {
                  target: {
                    id: `question${questionCounter}-answer${answerCounter}`,
                    value: row[1],
                  },
                },
                "questions",
                `question${questionCounter}-answer${answerCounter}`,
                "answer"
              );
              props.obj.mainObjectAdder(
                {
                  target: {
                    id: `question${questionCounter}-answer${answerCounter}`,
                    value: (row[2] + "")?.toLowerCase() == "true" ? 10 : 0,
                  },
                },
                "questions",
                `question${questionCounter}-answer${answerCounter}`,
                "point"
              );
              answerCounter++;
            } else if (
              !!(
                row[0] == undefined &&
                row[1] &&
                ((row[2] + "")?.toLowerCase() == "true" ||
                  (row[2] + "")?.toLowerCase() == "false")
              )
            ) {
              console.log("ans row", row);
              props.obj.mainObjectAdder(
                {
                  target: {
                    id: `question${questionCounter}-answer${answerCounter}`,
                    value: row[1],
                  },
                },
                "questions",
                `question${questionCounter}-answer${answerCounter}`,
                "answer"
              );
              props.obj.mainObjectAdder(
                {
                  target: {
                    id: `question${questionCounter}-answer${answerCounter}`,
                    value: (row[2] + "")?.toLowerCase() == "true" ? 10 : 0,
                  },
                },
                "questions",
                `question${questionCounter}-answer${answerCounter}`,
                "point"
              );
              answerCounter++;
            } else {
              showToastMessage("Invalid Excel Format", "red", 2);
            }
          }
        });
        showToastMessage("Questions added successfully", "green", 1);
        setShowExampleModal(false);
      } catch (error) {
        console.log(error);
        showToastMessage("Error reading the Excel file", "red", 2);
      }
    };
  };

  // function handleCategoryChange(e) {
  //     setSelectedCategory(e.target.value)
  // }
  function handleCloseExampleModal() {
    setShowExampleModal(false);
  }

  function handleFreeTextChange(e) {
    // setFreeText((prev) => {
    //     let prevObj = Object.assign({}, prev);
    //     prevObj[e.target.id] = e.target.checked == true ? 1 : 0
    //     return prevObj
    // })
    var str = e.target.id.split("freeText");
    e.target.checked == true
      ? document.getElementById("answer" + str[1])?.setAttribute("hidden", true)
      : document.getElementById("answer" + str[1])?.removeAttribute("hidden");
    var temp = e;
    temp.target.value = e.target.checked == true ? 1 : 0;
    // e.target.value == 0 ? document.getElementById("freeTextField" + str[1]).setAttribute("hidden", true) :
    // document.getElementById("freeTextField" + str[1]).removeAttribute("hidden")

    props.obj.mainObjectAdder(temp, "freeText", e.target.name, "freeText");
  }

  function handleCollapse(id) {
    var question = document.getElementById(id);
    var delbtn = document.getElementById("del" + id);
    var btns = question.querySelector("#collapse-button");
    btns.innerHTML == "-" ? (btns.innerHTML = "+") : (btns.innerHTML = "-");
    delbtn.style.display = btns.innerHTML == "+" ? "none" : "block";
    var answers = question.querySelectorAll(".squestion-div");
    answers.forEach((answer) => {
      var display = btns.innerHTML == "+" ? "none" : "block";
      answer.style.display = display;
    });
  }

  function handleCollapseForAll() {
    var allQuestions = document.getElementsByClassName("all-questions");

    for (let question of allQuestions) {
      console.log(question);
      var answers = question.querySelectorAll(".question-div");
      answers.forEach((answer) => {
        console.log(answer);
        if (allQUestionView == "See Only Questions") {
          answer.style.display = "none";
        } else {
          answer.style.display = "block";
        }
        // var display = answer.style.display == "none" ? "block" : "none";
        // answer.style.display = display;
      });
    }
    allQUestionView == "See Only Questions"
      ? setAllQUestionView("See All")
      : setAllQUestionView("See Only Questions");
  }

  useEffect(() => {
    var namee = document.querySelectorAll(".select-category");

    if (props.obj.categoryStore.lenght !== 0) {
      namee.forEach((item) => {
        while (item.firstChild) {
          item.removeChild(item.firstChild);
        }
      });

      // Object.keys(props.obj.categoryStore).map(async (key,ele)=>{
      for (let key of Object.keys(props.obj.categoryStore)) {
        if (namee?.length) {
          namee.forEach(async (item1, index) => {
            let name = document.createElement("option");
            name.value = props.obj.categoryStore[key]["categoryName"];
            name.textContent = props.obj.categoryStore[key]["categoryName"];
            if (
              name.value ==
              props.obj.mainObj["questions"][`question${index}`]?.categoryName
            ) {
              const att = document.createAttribute("selected");
              name.setAttributeNode(att);
            }
            namee[index].appendChild(name.cloneNode(true));
          });
        }
      }
    }
    setLength(props.obj.categoryStore.length);
  }, [props.obj.newCategoryCreated]);
  console.log(props.obj.mainObj);
  // console.log(props.obj.mainObj["questions"]);
  // console.log(Object.keys(props.obj.categoryStore));
  function addQuestion() {
    setHtml((prevState) => {
      let name = Object.assign({}, prevState);
      name["question" + questionCounter] = (
        <>
          <Grid
            id={"question" + questionCounter}
            className="all-questions"
            container
          >
            <Grid id="singleQuestion" className="question" xs={12} item>
              <label className="form-label">Question</label>
            </Grid>
            <Grid xs={10} item>
              <input
                type="file"
                id={`question${questionCounter}-image`}
                onChange={(e) => {
                  handleFileSelect(e);
                }}
              />
              <img
                id={`img_question${questionCounter}`}
                height={"200px"}
                width={"200px"}
                style={{ position: "fixed", right: "-200px", top: "-200px" }}

                //  src={serverImageUrl + props.obj.mainObj["questions"][`question${questionCounter}`]?.question}
              />
            </Grid>
            <Grid xs={2} item sx={{ display: "flex", flexDirection: "column" }}>
              {Object.keys(props.obj.categoryStore).length != 0 && (
                <select
                  onChange={(e) => categoryValueAdder(e, "categoryName")}
                  className="select-category question-div"
                  id={"question" + questionCounter}
                  name={"question" + questionCounter}
                >
                  <option>Select Category</option>
                  {Object.keys(props.obj.categoryStore).map((key, index) => (
                    <option
                      value={props.obj.categoryStore[key]["categoryName"]}
                      key={index}
                    >
                      {props.obj.categoryStore[key]["categoryName"]}
                    </option>
                  ))}
                </select>
              )}

              <div style={{ display: "flex", flexDirection: "row" }}>
                <input
                  id={"freeText" + questionCounter}
                  name={"question" + questionCounter}
                  type="checkbox"
                  className="free-text-check question-div"
                  onChange={handleFreeTextChange}
                />
                <label
                  className="form-label question-div"
                  class="free-text-label question-div"
                >
                  Free Text
                </label>
              </div>
            </Grid>
            <Grid xs={9} item>
              <input
                id={`question${questionCounter}`}
                type="text"
                name="categoryField"
                value={
                  props.obj.mainObj["questions"][`question${questionCounter}`]
                    ?.question
                }
                onChange={(e) => categoryValueAdder(e, "question")}
                placeholder="Question"
                className="form-control mb-3 pt-3 pb-3"
                required
              />
            </Grid>
            <Grid xs={3} item>
              <button
                className="add-answer-text question-div"
                style={{ position: "relative", top: "-10px" }}
                id={"answer" + questionCounter}
                name={"question" + questionCounter}
                onClick={(e) => addHtmlAnswer(e)}
              >
                Add Answer
              </button>
            </Grid>
          </Grid>
        </>
      );
      setQuestionCount((prevCount) => prevCount + 1);

      ++questionCounter;
      return name;
    });
  }

  function addHtmlAnswer(e) {
    var qstnCounter = e.target.getAttribute("name");

    qstnCounter = qstnCounter.split("question");
    qstnCounter = qstnCounter[1];
    // console.log(props?.obj?.mainObj);

    setHtmlAnswer((prevState) => {
      let name = Object.assign({}, prevState); // creating copy of state variable jasper
      const clr = "red";
      name["answer" + answerCounter] = (
        <>
          <div className="question-div">
            <label className="form-label" hidden>
              Answer
            </label>
            <input
              type="file"
              id={`question${qstnCounter}-answer${answerCounter}-image`}
              onChange={handleAnswerFileSelect}
            />
            <img
              id={`img_question${qstnCounter}-answer${answerCounter}`}
              height={"200px"}
              width={"200px"}
              style={{ position: "fixed", right: "-200px", top: "-200px" }}
            />
            <input
              id={"question" + qstnCounter + "-answer" + answerCounter}
              type="text"
              name="categoryField"
              onChange={(e) => answerAdder(e, "answer")}
              placeholder="Answer"
              className="form-control mb-3 pt-3 pb-3 answers-field"
              required
            />
            <>
              {props.obj.getMainObj().scoringType == 1 ? (
                <>
                  <label className="form-label" hidden>
                    Points
                  </label>
                  <input
                    id={"question" + qstnCounter + "-answer" + answerCounter}
                    type="number"
                    onChange={(e) => answerAdder(e, "point")}
                    placeholder="points"
                    min="0"
                    max="10"
                    className="form-control mb-3 pt-3 pb-3 answers-field-points"
                    required
                  ></input>
                </>
              ) : (
                <>
                  <label className="form-label" hidden>
                    Type
                  </label>
                  <select
                    defaultValue={"Select Option"}
                    className="form-control mb-3 pt-3 pb-3 answers-field-points"
                    id={"question" + qstnCounter + "-answer" + answerCounter}
                    onChange={(e) => answerAdder(e, "point")}
                    // style={{ backgroundColor: props.mainObj?.questions[`question${qstnCounter}`]?.point == 0 ? 'red' : 'green' }}
                  >
                    <option value={-1} style={{ backgroundColor: "white" }}>
                      Select Option
                    </option>
                    <option
                      value={0}
                      style={{ color: "red", backgroundColor: "white" }}
                    >
                      False
                    </option>
                    <option
                      value={10}
                      style={{ color: "green", backgroundColor: "white" }}
                    >
                      True
                    </option>
                  </select>
                </>
              )}
            </>
          </div>
        </>
      );

      ++answerCounter;
      return name;
    });
  }
  function answerAdder(e, property) {
    // console.log('answer', e.target.id, property);
    //change color if point is 0 or 10 if green
    if (property == "point") {
      if (e.target.value == 0) {
        e.target.style.backgroundColor = "red";
      } else if (e.target.value == 10) {
        e.target.style.backgroundColor = "green";
      } else {
        e.target.style.backgroundColor = "white";
      }
    }
    props.obj.mainObjectAdder(e, "questions", e.target.id, property);
  }

  async function search(e) {
    const allQuestions = await document.getElementsByClassName("all-questions");

    for (let singleQuestion of allQuestions) {
      document.getElementById(singleQuestion.id).style.display = "block";
      var inputElements = singleQuestion.querySelectorAll("input");
      var fieldTxt = inputElements[0].value.toLowerCase();
      var contains = fieldTxt.includes(e.target.value.toLowerCase());
      // var tempDoc = new DOMParser().parseFromString(str, "text/html")
      if (contains == true) {
      } else {
        document.getElementById(singleQuestion.id).style.display = "none";
      }
    }
  }

  function deleteQuestion(topkey) {
    const questionKey = topkey;
    if (questionCounter > 0) {
      setQuestionCount((prevCount) => prevCount - 1);

      setHtml((prevState) => {
        const newState = { ...prevState };
        delete newState[questionKey];
        return newState;
      });
      setHtmlAnswer((prevState) => {
        const newState = { ...prevState };
        Object.keys(htmlAnswer).map(function (key, i) {
          {
            var temp =
              htmlAnswer[key]?.props.children?.props.children[1].props.id.split(
                "-"
              )[0];
            if (topkey == temp) {
              delete newState[key];
              --answerCounter;
            }
          }
        });
        return newState;
      });
      props.obj.mainObjectRemover(
        { target: { id: questionKey, value: "" } },
        "questions",
        questionKey,
        "question"
      );
      --questionCounter;
    }
  }
  const handleQuestionBank = (e) => {
    console.log(`quesotn counter`, questionCounter);

    const questionIndex = e.target.value.split("-");
    // console.log('questionIndex', questionIndex);
    // console.log('question', questionbank[questionIndex[0]]);
    const question_data = Object.values(questionbank[questionIndex[0]])[
      questionIndex[1]
    ];
    // console.log('question_data', question_data);
    const question = question_data.question;

    props.obj.mainObjectAdder(
      { target: { id: `question${questionCounter}`, value: question } },
      "questions",
      `question${questionCounter}`,
      "question"
    );
    props.obj.mainObjectAdder(
      {
        target: {
          id: `question${questionCounter}`,
          value: question_data.category,
        },
      },
      "questions",
      `question${questionCounter}`,
      "categoryName"
    );
    Object.keys(question_data).map((key, index) => {
      if (key.includes("answer")) {
        props.obj.mainObjectAdder(
          {
            target: {
              id: `question${questionCounter}-${key}`,
              value: question_data[key].answer,
            },
          },
          "questions",
          `question${questionCounter}-${key}`,
          "answer"
        );
        props.obj.mainObjectAdder(
          {
            target: {
              id: `question${questionCounter}-${key}`,
              value: question_data[key].points,
            },
          },
          "questions",
          `question${questionCounter}-${key}`,
          "point"
        );
      }
    });
    console.log(`quesotn counter`, questionCounter);

    setHtml((prevState) => {
      let name = Object.assign({}, prevState);
      name["question" + questionCounter] = (
        <>
          <Grid
            id={"question" + questionCounter}
            className="all-questions"
            container
          >
            <Grid id="singleQuestion" className="question" xs={12} item>
              <label className="form-label">Question</label>
            </Grid>
            <Grid xs={10} item>
              <input
                type="file"
                id={`question${questionCounter}-image`}
                onChange={(e) => {
                  handleFileSelect(e);
                }}
              />
              {question_data.image ? (
                <img
                  id={`img_question${questionCounter}`}
                  height={"200px"}
                  width={"200px"}
                  src={
                    question_data.image
                      ? serverImageUrl + question_data.image
                      : null
                  }
                />
              ) : (
                <img
                  id={`img_question${questionCounter}`}
                  height={"200px"}
                  width={"200px"}
                  style={{ position: "fixed", right: "-200px", top: "-200px" }}
                />
              )}
            </Grid>
            <Grid xs={2} item sx={{ display: "flex", flexDirection: "column" }}>
              {Object.keys(props.obj.categoryStore).length != 0 && (
                <select
                  onChange={(e) => categoryValueAdder(e, "categoryName")}
                  className="select-category question-div"
                  id={"question" + questionCounter}
                  name={"question" + questionCounter}
                >
                  <option>Select Category</option>
                  {Object.keys(props.obj.categoryStore).map((key, index) => (
                    <option
                      value={props.obj.categoryStore[key]["categoryName"]}
                      key={index}
                    >
                      {props.obj.categoryStore[key]["categoryName"]}
                    </option>
                  ))}
                </select>
              )}
              <div style={{ display: "flex", flexDirection: "row" }}>
                <input
                  id={"freeText" + questionCounter}
                  name={"question" + questionCounter}
                  type="checkbox"
                  className="free-text-check question-div"
                  onChange={handleFreeTextChange}
                />
                <label
                  className="form-label question-div"
                  class="free-text-label question-div"
                >
                  Free Text
                </label>
              </div>
            </Grid>
            <Grid xs={9} item>
              <input
                id={`question${questionCounter}`}
                type="text"
                name="categoryField"
                value={question}
                onChange={(e) => categoryValueAdder(e, "question")}
                placeholder="Question"
                className="form-control mb-3 pt-3 pb-3"
                required
              />
            </Grid>
            <Grid xs={2} item>
              <button
                className="add-answer-text question-div "
                style={{ position: "relative", top: "-10px" }}
                id={"answer" + questionCounter}
                name={"question" + questionCounter}
                onClick={(e) => addHtmlAnswer(e)}
              >
                Add Answer
              </button>
            </Grid>
          </Grid>
          {/* <div id={"question" + questionCounter}>
            <div id="singleQuestion" className="question">
              <label className="form-label">Question</label>
              <input
                type="file"
                id={`question${questionCounter}-image`}
                onChange={(e) => {
                  handleFileSelect(e);
                }}
              />
              <img id={`img_question${questionCounter}`}
                height={'200px'}
                width={'200px'}
                

              />
              <input
                id={`question${questionCounter}`}
                type="text"
                name="categoryField"
                value={question_data.question}
                onChange={(e) => categoryValueAdder(e, "question")}
                placeholder="Question"
                className="form-control mb-3 pt-3 pb-3"
                required
              />
            </div>
            <label className=" form-label" hidden></label>
            <div>
              {Object.keys(props.obj.categoryStore).length != 0 && <select
                onChange={(e) => categoryValueAdder(e, "categoryName")}
                id={"question" + questionCounter}
                name={"question" + questionCounter}
                className="question-div"
              >
                <option>Select Category</option>
                {Object.keys(props.obj.categoryStore).map((key, index) => (
                  <option value={props.obj.categoryStore[key]["categoryName"]} key={index}>
                    {props.obj.categoryStore[key]["categoryName"]}
                  </option>
                ))}
              </select>}

              <div style={{ display: 'flex' }}>
                <input
                  id={"freeText" + questionCounter}
                  name={"question" + questionCounter}
                  type="checkbox"
                  className="free-text-check question-div"
                  onChange={handleFreeTextChange}
                />
                <label className="form-label question-div" class="free-text-label question-div">
                  Free Text
                </label>
              </div>
            </div>
            <button
              className="add-answer-text question-div"
              id={"answer" + questionCounter}
              name={"question" + questionCounter}
              onClick={(e) => addHtmlAnswer(e)}
            >
              Add Answer
            </button>

            <br />
          </div> */}
        </>
      );

      return name;
    });

    setHtmlAnswer((prevState) => {
      let newState = { ...prevState };

      for (const key in question_data) {
        if (key.startsWith("answer")) {
          newState[`question${questionCounter - 1}-answer${answerCounter}`] = (
            <>
              <div className="question-div QuesAns">
                <label className="form-label" hidden>
                  Answer
                </label>
                <input
                  type="file"
                  id={`question${
                    questionCounter - 1
                  }-answer${answerCounter}-image`}
                  onChange={handleAnswerFileSelect}
                />
                {question_data[key].image ? (
                  <img
                    id={`img_question${
                      questionCounter - 1
                    }-answer${answerCounter}`}
                    height={"200px"}
                    width={"200px"}
                    src={
                      question_data[key].image
                        ? serverImageUrl + question_data[key].image
                        : null
                    }
                  />
                ) : (
                  <img
                    id={`img_question${
                      questionCounter - 1
                    }-answer${answerCounter}`}
                    height={"200px"}
                    width={"200px"}
                    style={{
                      position: "fixed",
                      right: "-200px",
                      top: "-200px",
                    }}
                  />
                )}
                <input
                  id={`question${questionCounter - 1}-answer${answerCounter}`}
                  type="text"
                  name="categoryField"
                  onChange={(e) => answerAdder(e, "answer")}
                  placeholder="Answer"
                  className="form-control mb-3 pt-3 pb-3 answers-field"
                  required
                  defaultValue={question_data[key].answer}
                />
                {props.obj.getMainObj().scoringType == 1 ? (
                  <>
                    <label className="form-label" hidden>
                      Points
                    </label>
                    <input
                      id={key}
                      type="number"
                      onChange={(e) => answerAdder(e, "point")}
                      placeholder="points"
                      min="0"
                      max="10"
                      defaultValue={question_data[key].points}
                      className="form-control mb-3 pt-3 pb-3 answers-field-points"
                      required
                    ></input>
                  </>
                ) : (
                  // console.log('questionsData[key].point', questionsData[key].point),
                  <>
                    <label className="form-label" hidden>
                      Type
                    </label>
                    <select
                      className="form-control mb-3 pt-3 pb-3 answers-field-points"
                      id={key}
                      defaultValue={question_data[key].points}
                      onChange={(e) => answerAdder(e, "point")}
                      // style={{ backgroundColor: (questionsData[key].point === null || questionsData[key].point === 0) ? 'red' : 'green' }}
                    >
                      <option value={0} style={{ color: "red" }}>
                        False
                      </option>
                      <option value={10} style={{ color: "green" }}>
                        True
                      </option>
                    </select>
                  </>
                )}
              </div>
            </>
          );
          ++answerCounter;
        }
      }

      return newState;
    });
    setQuestionCount((prevCount) => prevCount + 1);
    ++questionCounter;
    // checkquestions();
  };

  console.log("html", html);
  console.log("htmlAnswer", htmlAnswer);

  return (
    <>
    <div hidden={props.obj.tabSelected == "QUESTIONS" ? false : true}>
      <div
        style={{ textAlign: "start",  }}
        className="question-content ml-8 w-[80%] mx-auto pb-20"
        hidden={props.obj.tabSelected == "QUESTIONS" ? false : true}
      >
        <div class="wrapper">
          <div>
            <h3>#3 - Questions</h3>
            <p className="counterq">{`Questions Created: ${questionCount}`}</p>

            <div>
              <label htmlFor="questionDropdown">
                Select a Question from question bank:
              </label>
              <select id="questionDropdown" onChange={handleQuestionBank}>
                <option value="" disabled selected>
                  Select a question{" "}
                </option>
                {questionbank.map((questions, index) => {
                  return (
                    <>
                      {Object.values(questions).map(
                        (question, questionIndex) =>
                          question?.question && (
                            <React.Fragment key={questionIndex}>
                              <option
                                value={`${index}-${questionIndex}`}
                                style={{ fontWeight: "bold" }}
                              >
                                {question?.question}
                              </option>
                            </React.Fragment>
                          )
                      )}
                    </>
                  );
                })}
              </select>
            </div>
            {showExampleModal && (
              <Modal
                show={showExampleModal}
                onHide={handleCloseExampleModal}
                animation={false}
              >
                <Modal.Header closeButton>
                  <Modal.Title>Import Questions</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <label htmlFor={`question${questionCounter}`}>
                    Supported File Structure:
                  </label>
                  <img src="/ques.png" alt="question structure" />
                  <input
                    type="file"
                    id={`question${questionCounter}`}
                    onChange={(e) => {
                      setSelectedFile(e.target.files[0]);
                    }}
                  />
                  <button
                    style={{ position: "relative", right: "20px" }}
                    onClick={handleUpload}
                    disabled={selectedFile == null}
                  >
                    Upload Questions from excel
                  </button>
                </Modal.Body>
              </Modal>
            )}
            <button
              className="text-xs px-6"
              onClick={() => setShowExampleModal(true)}
            >
              Import Questions from excel
            </button>
            <br />
            <br />
            <br />
          </div>
          <div className="mt-36 text-xs px-6">
            {" "}
            <button
              className="QuestionButtonClass"
              onClick={() => handleCollapseForAll()}
            >
              {allQUestionView}
            </button>
          </div>
          <div>
            {" "}
            <input
              type="search"
              style={{
                padding: "10px",
                marginTop: "0px",
                marginLeft: "120px",
              }}
              placeholder="Search"
              className="search-for-question"
              onChange={search}
            />
          </div>
        </div>
        <Grid container spacing={3}>
          {Object.keys(html).map(function (topkey, i) {
            return (
              <>
                <Grid item xs={12} id={"all-questions-" + i}>
                  <Grid container key={i} className="all-questions">
                    <Grid item xs={12}>
                      <button
                        id="collapse-button"
                        onClick={() => handleCollapse("all-questions-" + i)}
                      >
                        -
                      </button>
                    </Grid>
                    <Grid xs={12} className="QuesAns squestion-div">
                      {html[topkey]}
                    </Grid>
                    <Grid
                      xs={12}
                      className="QuesAns question-div squestion-div"
                    >
                      {Object.keys(htmlAnswer).map(function (key, i) {
                        {
                          var temp =
                            htmlAnswer[
                              key
                            ]?.props.children?.props.children[1].props.id.split(
                              "-"
                            )[0];
                          if (topkey == temp) {
                            return htmlAnswer[key];
                          } else {
                            return null;
                          }
                        }
                      })}
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12} id={"delall-questions-" + i}>
                  <button
                    className="question-div QuesAns"
                    onClick={() => deleteQuestion(topkey)}
                  >
                    Delete a Question
                  </button>
                </Grid>
              </>
            );
          })}
        </Grid>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <button
              style={{ position: "relative", right: "20px" }}
              onClick={addQuestion}
            >
              Add a Question
            </button>
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
           
          </Grid>
        </Grid>
        
      </div>
      <button
                onClick={() => props.obj.setTabSelected("CATEGORIES")}
                className="fixed LEFT-0 top-1/2 transform -translate-y-1/2 bg-blue-500 text-white p-4 rounded-full shadow-lg flex "
              >
                <ArrowBackIosRoundedIcon/>
              </button>
                <button
                onClick={() => props.obj.setTabSelected("LAYOUT")}
                className="fixed right-0 top-1/2 transform -translate-y-1/2 bg-blue-500 text-white p-4 rounded-full shadow-lg flex "
              >
                <ArrowForwardIosRoundedIcon/>
              </button>
      </div>
    </>
  );
}

export default QuestionStep;
