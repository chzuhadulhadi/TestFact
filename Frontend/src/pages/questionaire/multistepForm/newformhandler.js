import { useEffect, ChangeEvent, useState } from "react";
import "./style.css";
import { useAsyncError } from "react-router-dom";
import tableSummaryImg from '../../homepage/css/images/imagetablesummary.png'
import showResultInGraphImg from '../../homepage/css/images/showresultingraph.png'
import { apiCall } from '../../../apiCalls/apiCalls'
import { logoUploader, createMyTest } from '../../../apiCalls/apiRoutes'
import { toast } from "react-toastify";

function FormHandler(params) {
  var num = 1;
  const [lastObject, setLastObject] = useState({});
  var answer = 1;
  const [currentForm, setCurrentForm] = useState("");
  const [lastObj, setLastObj] = useState({});
  const [fullobject, setFullObject] = useState({
    name: "",
    noOfQuestions: null,
  });
  const [showTable, setShowTable] = useState(false);
  const [show, setShow] = useState(false);
  var options = [];
  const [confirmationText, setConfirmationText] = useState("");
  const [tabSelected, setTabSelected] = useState(0);
  const [categoryObject, setCategoryObject] = useState({});
  const [mainObject, setMainObject] = useState({
    name: "",
    orientation: null,
    beforeTestText: "",
    afterTestText: "",
    scoringType: null,
    randomOrder: null,
    layout: {
      backgroundColor: '',
      textColor: '',
      questionBackgroundColor: '',
      questionTextColor: '',
      answerColor: ' ',
      imageUrl: ""
    },
    resultStructure: {
      tableSummary: null,
      showResultInGraph: null
    },
    automaticText: {

    },
  });

  const [categoryValueChecker, setCategoryValueChecker] = useState(false);
  const [rendControl, setRendControl] = useState(false);
  //last answer logic

  const lastObjectHandler = (e) => {
    lastObj[e.target.id] = e.target.value;
    lastObj["current"] = e.target.name;
    console.log(lastObj);
  };

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
  const showTab = (e) => {
    const tab = document.querySelectorAll(".tab");
    console.log(tab);
    tab.forEach((ele) => {
      ele.style.display = "none";
    });
    tab[tabSelected].style.display = "block";
  };

  useEffect(() => {
    showTab();
    console.log(tabSelected)
  }, [tabSelected]);

  const [categoryStore, setCategoryStore] = useState({});
  const [catNum, setCatNum] = useState(1);
  const [number, setNumber] = useState(1);
  var someobject = {};

  const categoryValueAdder = (e) => {
    if (e.target.id == "name") {
      setCategoryStore((prev) => {
        return { ...prev, [catNum]: e.target.value };
      });
    }
    setFullObject((prev) => {
      return { ...prev, [e.target.id]: e.target.value };
    });
    console.log(categoryStore);
  };

  const mainObjectAdder = (e) => {
    setMainObject((prev) => {
      return { ...prev, [e.target.id]: e.target.value };
    });
    console.log(mainObject);
  };

  function QuestionCreator(num) {
    var count = 0;

    var object = {};
    const answerArray = (e) => {
      object[e.target.id] = e.target.value;
      console.log(object);
    };

    const submitHandler = (e) => {
      e.preventDefault();
      object[lastObj["current"]] = {
        answer: lastObj["answer"],
        point: lastObj["point"],
      };
      var namequestion = "question" + e.target.id;
      someobject = {
        [namequestion]: { ...object },
      };
      mainObject["testObj"][object.category] = { ...mainObject["testObj"][object.category], [namequestion]: {} }
      console.log(mainObject)
      categoryObject[object.category] = { ...someobject }
      mainObject['testObj'][object.category][namequestion] = { ...object }
      console.log(mainObject)
    };

    const newFieldAdder = (e) => {
      answer = answer + 1;
      submitHandler(e);
      const newid = "questionDiv" + e.target.id;
      setCurrentForm(newid);
      const divAdder = document.getElementById(newid);
      console.log(divAdder);
      const newField = document.createElement("input");
      newField.type = "text";
      newField.name = "answer" + answer;
      newField.className = "form-control w-50 float-start mb-3";
      newField.id = "answer";
      newField.onchange = lastObjectHandler;
      newField.placeholder = "Answer";
      const numberField = document.createElement("input");
      numberField.type = "number";
      numberField.name = "answer" + answer;
      numberField.className = "form-control w-50 float-end mb-3";
      numberField.id = "point";
      if (mainObject.scoringType == 0) {
        numberField.value = 0;
      }
      numberField.placeholder = "Points";
      numberField.onchange = lastObjectHandler;
      divAdder.appendChild(newField);
      divAdder.appendChild(numberField);
    };
    var questionDiv = document.querySelector(".questions");
    const formField = document.createElement("input");
    formField.placeholder = "Question...";
    formField.className = "form-control w-100 mb-2";
    formField.type = "text";
    formField.id = "question";
    formField.onchange = answerArray;
    formField.required = "true";

    const check = document.createElement("input");
    check.placeholder = "Choose free text...";
    check.type = "number";
    check.id = "freeText";
    check.className = "form-control w-50 float-start mb-2";
    check.onchange = answerArray;
    check.required = "true";
    check.min = 0;
    check.max = 1;

    const categorySelection = document.createElement("select");
    categorySelection.onchange = answerArray;
    categorySelection.className = "form-control w-50 float-end mb-2";
    categorySelection.id = "category";

    {
      Object.keys(categoryStore).forEach((key, index) => {
        options[index] = document.createElement("option");
        options[index].value = categoryStore[key];
        options[index].textContent = categoryStore[key];
      });
    }
    const newField = document.createElement("input");
    newField.type = "text";
    newField.name = "answer" + answer;
    newField.className = "form-control w-50 float-start";
    newField.id = "answer";
    newField.onchange = lastObjectHandler;
    newField.placeholder = "Answer";
    const numberField = document.createElement("input");
    numberField.type = "number";
    numberField.name = "answer" + answer;

    numberField.className = "form-control w-50 float-end";
    numberField.id = "point";

    if (mainObject.scoringType == 0) {
      numberField.value = 0;
    }
    numberField.placeholder = "Points";
    numberField.onchange = lastObjectHandler;

    const div = document.createElement("div");
    div.className = "questionsDiv";
    div.id = "questionDiv" + number;

    const button = document.createElement("button");
    button.type = "submit";
    button.textContent = "Submit";

    const form = document.createElement("form");
    form.onsubmit = submitHandler;
    form.id = number;

    const addNewAnswer = document.createElement("p");
    addNewAnswer.onclick = newFieldAdder;
    addNewAnswer.id = number;
    addNewAnswer.textContent = "Add new answer";
    options.forEach((ele) => {
      categorySelection.appendChild(ele);
    });
    div.appendChild(newField);
    div.appendChild(numberField);
    form.appendChild(formField);
    form.appendChild(check);
    form.appendChild(categorySelection);
    form.appendChild(div);
    form.appendChild(addNewAnswer);
    form.appendChild(button);
    questionDiv.appendChild(form);
  }
  useEffect(() => {
    show && QuestionCreator(number);
  }, [number]);

  function newCategoryCreator(e) {
    e.preventDefault();
    categoryObject[fullobject.name] = {};
    console.log(categoryObject);
    setCatNum(catNum + 1);
    setConfirmationText("Added Successfully");
    addNewCategoryFunctionality()
    setRendControl(!rendControl);
    setCategoryValueChecker(!categoryValueChecker);
  }
  const addNewCategoryFunctionality = () => {
    const fields = document.getElementsByName("categoryField");
    fields.forEach((ele) => {
      ele.value = "";
    });
  };

  useEffect(() => {
    console.log(categoryObject);
    if (Object.keys(categoryObject).length >= 1) {
      setShowTable(true);
    } else {
      setShowTable(false);
    }
  }, [categoryValueChecker]);

  const deleteEntryFromObject = (e) => {
    console.log(e.target.id);
    delete categoryObject[e.target.id];
    setCategoryValueChecker(!categoryValueChecker);
  };

  useEffect(() => {
    setTimeout(() => {
      setConfirmationText("");
    }, 3000);
  }, [rendControl]);
  useEffect(() => {
    var headng = document.querySelectorAll(".heading4");
    headng.forEach((ele) => {
      ele.style.opacity = "0.4";
    });
    headng[tabSelected].style.opacity = 1;
  }, [tabSelected]);



  const layoutFormHandler = (e) => {

    if (e.target.id && e.target.value) {
      mainObject['layout'][e.target.id] = e.target.value
    }
    console.log(mainObject)
  }


  const resultStructureHandler = (e) => {

    mainObject['resultStructure'][e.target.id] = (e.target.checked) ? 1 : 0
    console.log(mainObject['resultStructure'])
  }


  const [automatedText, setAutomationText] = useState({

  })
  const valueAdderForAutomatedText = (e) => {
    automatedText[e.target.id] = e.target.value
    console.log(automatedText)
  }
  const automatedFormHandler = (e) => {
    e.preventDefault()
    const conditionNum = "condition" + e.target.id
    mainObject['automaticText'][automatedText['category']] = { ...mainObject['automaticText'][automatedText['category']], [conditionNum]: {} }
    mainObject['automaticText'][automatedText['category']][conditionNum] = { ...automatedText }
    console.log(mainObject)
  }
  var counter = 1
  const automaticHandler = (e) => {
    var newdiv = document.querySelector(".automaticHandler")
    const form = document.createElement('form')
    form.id = counter
    form.onsubmit = automatedFormHandler

    const inputMin = document.createElement('input')
    inputMin.type = "number"
    inputMin.placeholder = "Min Value ..."
    inputMin.onchange = valueAdderForAutomatedText
    inputMin.className = "p-2 m-3 w-20"
    inputMin.id = "min"

    const btn = document.createElement('button')
    btn.type = "submit"
    btn.className = "btn btn-primary"
    btn.textContent = "Submit"

    const inputMax = document.createElement('input')
    inputMax.type = "number"
    inputMax.placeholder = "Max Value ..."
    inputMax.className = "p-2 m-3 w-20"
    inputMax.onchange = valueAdderForAutomatedText
    inputMax.id = "max"

    const categorySelection = document.createElement("select");
    categorySelection.onchange = valueAdderForAutomatedText;
    categorySelection.className = "p-2 m-3 w-20";
    categorySelection.id = "category";

    const textForRange = document.createElement("input")
    textForRange.type = "text"
    textForRange.className = "p-2 m-3 w-20"
    textForRange.onchange = valueAdderForAutomatedText
    textForRange.placeholder = "Enter the text for range ..."
    textForRange.id = "text"

    {
      Object.keys(categoryStore).forEach((key, index) => {
        options[index] = document.createElement("option");
        options[index].value = categoryStore[key];
        options[index].textContent = categoryStore[key];
      });
    }
    options.forEach((ele) => {
      categorySelection.appendChild(ele);
    });

    form.appendChild(inputMin)
    form.appendChild(inputMax)
    form.appendChild(textForRange)
    form.appendChild(categorySelection)
    form.appendChild(btn)
    newdiv.appendChild(form)
    ++counter
    console.log(mainObject)
  }


  const finalFormSubmission = () => {
    apiCall('post', createMyTest, mainObject)
      .then((res) => {
        console.log(res)
        showToastMessage("Test created Successfully ", "green", 1);
      })
      .catch((err) => {
        showToastMessage(err?.response?.data?.message, "red", 2);

      })
  }
  return (
    <>
      <div className="d-flex mt-4">
        <div className="MultiStepHeader">
          <h4
            className="heading4"
            style={{ backgroundColor: "#0488b9" }}
            id="1"
            onClick={() => { setTabSelected(0) }}
          >
            <span id="1">1</span>Properties{" "}
          </h4>
          <h4
            className="heading4"
            style={{ backgroundColor: "#e7880a" }}
            id="2"
            onClick={() => { setTabSelected(1) }}
          >
            <span id="2">2</span>Categories{" "}
          </h4>
          <h4
            className="heading4"
            style={{ backgroundColor: "#852c24" }}
            id="3"
            onClick={() => { setTabSelected(2) }}
          >
            <span id="3">3</span>Questions{" "}
          </h4>
          <h4
            className="heading4"
            style={{ backgroundColor: "#852c24" }}
            id="4"
            onClick={() => { setTabSelected(3) }}
          >
            <span id="4">4</span>Layout{" "}
          </h4>
          <h4
            className="heading4"
            style={{ backgroundColor: "#852c24" }}
            id="5"
            onClick={() => { setTabSelected(4) }}
          >
            <span id="5">5</span>Result structure{" "}
          </h4>
          <h4
            className="heading4"
            style={{ backgroundColor: "#852c24" }}
            id="6"
            onClick={() => { setTabSelected(5) }}
          >
            <span id="6">6</span>Automatic Text{" "}
          </h4>
        </div>

      </div>
      {/* Tab 1 */}

      <div className="tab">
        <br />
        <form
          className="formClass"
          onSubmit={(e) => {
            e.preventDefault();
            setTabSelected(1);
          }}
        >
          <h3>Properties</h3>
          <label className="form-label"> Name </label>
          <input
            id="name"
            type="text"
            className="form-control mb-3 pt-3 pb-3"
            placeholder="Enter here the name of the test"
            onChange={mainObjectAdder}
            required
          />

          <label className="form-label">Test structure</label>
          <select
            id="orientation"
            onChange={mainObjectAdder}
            className="form-select mb-3 pt-3 pb-3"
            required
          >
            <option value="0">Single page</option>
            <option value="1">One by One</option>
          </select>
          <label className="form-label">Scoring type</label>
          <select
            id="scoringType"
            onChange={mainObjectAdder}
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
            onChange={mainObjectAdder}
            className="form-select mb-3 pt-3 pb-3"
            required
          >
            <option value="0">Random</option>
            <option value="1">Sequence</option>
          </select>
          <label className="form-label">
            The test that will appear before doing the test
          </label>
          <input
            type="text"
            id="beforeTestText"
            placeholder="The test that will appear before doing the test"
            onChange={mainObjectAdder}
            className="form-control mb-3 pt-3 pb-3"
            required
          />
          <label className="form-label">
            The test that will appear after doing the test
          </label>
          <input
            type="text"
            id="afterTestText"
            placeholder="The test that will appear after doing the test"
            onChange={mainObjectAdder}
            className="form-control mb-3 pt-3 pb-3"
            required
          />
          <button type="submit"> Save </button>
        </form>
        <br />
        <br />
      </div>

      {/* Tab 2 */}

      <div className="tab">
        <div className="leftHalf" style={{ float: "left" }} >
          <form onSubmit={newCategoryCreator} className="formClass">
            <h3>Categories</h3>

            <div className="questionSetter">
              <label className="form-label">Name of Category</label>
              <input
                id="name"
                type="text"
                name="categoryField"
                placeholder="Name Of Category"
                onChange={categoryValueAdder}
                className="form-control mb-3 pt-3 pb-3"
                required
              />
              <label className="form-label">No of Questions</label>
              <input
                type="number"
                id="noOfQuestions"
                name="categoryField"
                placeholder="No Of Qs"
                onChange={categoryValueAdder}
                className="form-control mb-3 pt-3 pb-3"
                required
              ></input>

              <button type="submit">+ Add</button>


              <br />
            </div>
            <button
              onClick={() => {
                setShow(true);
                mainObject["testObj"] = { ...categoryObject };
                mainObject['automaticText'] = { ...categoryObject }
                setNumber(number + 1);
                setTabSelected(tabSelected + 1);
                console.log(mainObject);
              }}
            >
              Save Test & Close
            </button>
          </form>

        </div>
        <div className="rightHalf" style={{ float: 'left' }}>

          {showTable && (
            <>
              <h2>
                Categories Created
              </h2>
              <table className="table table-striped">

                <thead>
                  <tr>
                    <th scope="col">Category</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.keys(categoryObject).map((key, index) => {
                    return (
                      <tr key={index}>
                        <td>{key}</td>
                        <td id={key} onClick={deleteEntryFromObject}>
                          Delete
                        </td>
                      </tr>
                    );
                  })}
                </tbody>

              </table>
            </>
          )}
        </div>
      </div>

      {/* Tab 3 */}

      <div
        className="tab"
        style={{
          width: "100%",
          margin: "auto",
          paddingTop: "4rem",
          textAlign: "center",
        }}
      >
        <h3>Questions</h3>
        <br />
        <div className="questions"></div>
        <p className="float-start m-5" onClick={() => {
          setNumber(number + 1);
        }}>+ Add New Question</p>
        <br />
        <br />
        <button className="w-25 float-center"
          onClick={() => {
            setTabSelected(tabSelected + 1);
          }}
        >
          Save
        </button>
      </div>

      {/* TAB 4  */}

      <div className="tab">
        <h3>Test Layout setting </h3>
        <form onSubmit={(e) => { e.preventDefault(); setTabSelected(tabSelected + 1) }}>
          <label for="formFile" className="form-label">
            Please select your logo
          </label>
          <input className="form-control w-25 mb-4" type="file" id="formFile" accept="image/*" />
          <label for="backgroundColor" className="form-label">
            Choose background Color
          </label>
          <input
            type="color"
            className="form-control form-control-color mb-4"
            id="backgroundColor"
            title="Choose Background Color"
            onChange={layoutFormHandler}
          />

          <label for="textColor" className="form-label">
            Choose Text Color
          </label>
          <input
            type="color"
            className="form-control form-control-color mb-4"
            id="textColor"
            title="Choose Background Color"
            onChange={layoutFormHandler}
          />

          <label for="questionBackgroundColor" className="form-label">
            Question Background Color
          </label>
          <input
            type="color"
            className="form-control form-control-color mb-4"
            id="questionBackgroundColor"
            title="Choose Background Color"
            onChange={layoutFormHandler}
          />

          <label for="questionTextColor" className="form-label">
            Question Text Color
          </label>
          <input
            type="color"
            className="form-control form-control-color mb-4"
            id="questionTextColor"
            title="Choose Background Color"
            onChange={layoutFormHandler}
          />


          <label for="answerColor" className="form-label">
            Answer Color
          </label>
          <input
            type="color"
            className="form-control form-control-color mb-4"
            id="answerColor"
            title="Choose Background Color"
            onChange={layoutFormHandler}
          />

          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>

      {/* TAB 5  */}

      <div className="tab">
        <h3> Result Structure</h3>
        <form onSubmit={(e) => { e.preventDefault(); setTabSelected(tabSelected + 1) }}>
          <label className="form-label m-2 fw-bold" style={{ fontSize: "1.6rem" }}>Table summary</label>
          <input className="form-field" type="checkbox" id="tableSummary" onChange={resultStructureHandler} />
          <img style={{ width: "30%" }} src={tableSummaryImg} />
          <br />
          <label className="form-label m-2 fw-bold" style={{ fontSize: "1.6rem" }}>Show Result in Graph</label>

          <input type="checkbox" id="showResultInGraph" onChange={resultStructureHandler} />
          <img style={{ width: "20%" }} src={showResultInGraphImg} />
          <br />
          <button type="submit">Save Test & Close</button>
        </form>
      </div>

      {/* tab 6 */}

      <div className="tab">

        <div className="automaticHandler">
          <button className="btn btn-primary" onClick={automaticHandler}> + </button>
        </div>
        <button onClick={finalFormSubmission}>Submit Form</button>      </div>
    </>
  )
}
export default FormHandler;