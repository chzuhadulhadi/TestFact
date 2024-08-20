import { elements } from "chart.js";
import { useState } from "react";
function MSFDemo(params) {
  const [testCategories, setTestCategories] = useState({});
  const [questionNo, setQuestionNo] = useState(1);
  const [answer, setAnswer] = useState(1);
  const [quesObject, setQuesObject] = useState({
    question: "",
    freeText: null,
  });
  const [testData, setTestData] = useState({
    name: "",
    orientation: null,
    beforeTestText: "Welcome to my Test",
    afterTestText: "Thanks for the Test",
    scoringType: null,
    randomOrder: null,
    testCategories: {},
  });

  const [categoryObject, setCategoryObject] = useState({});
  const [answerObject, setAnswerOject] = useState({});
  const [newObject, setNewObject] = useState({});
  const valueSetter = (e) => {
    setTestData((prev) => {
      return {
        ...prev,
        [e.target.id]: e.target.value,
      };
    });
  };

  const answerObjectAdder = (e) => {
    setQuesObject((prev) => {
      return { ...prev, [e.target.id]: e.target.value };
    });
  };

  const answerArray = (e) => {
    const answer = e.target.value;
    setAnswerOject((prev) => {
      return { ...prev, [e.target.id]: answer };
    });
  };

  const categoryNameAdder = (e) => {};
  const categoryValueAdder = (e) => {
    setTestCategories((prev) => {
      return { ...prev, [e.target.id]: e.target.value };
    });
  };

  const questionsAdder = (e) => {
    setAnswer(answer + 1);
    const newanswer = "answer" + answer;
    setQuesObject((prev) => {
      return { ...prev, [newanswer]: answerObject };
    });
    var elem = document.querySelector(".someclass");
    const newField = document.createElement("input");
    newField.type = "text";
    newField.name = "newfield";
    newField.id = "answer";
    newField.onchange = answerArray;
    newField.placeholder = "Answer";
    const numberField = document.createElement("input");
    numberField.type = "number";
    numberField.name = "newfield";
    numberField.id = "point";
    numberField.placeholder = "Points";
    numberField.onchange = answerArray;
    elem.appendChild(newField);
    elem.appendChild(numberField);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    // console.log(someobject)
    // setCurrentCategoryName({
    //     [testCategories.name] : testCategories

    // })
    // testData.testCategories = currentCategoryName
    // console.log(testData)
    console.log(quesObject);
    console.log(categoryObject);
  };

  const addNewAnswer = (e) => {
    const question = "question" + questionNo;
    setCategoryObject((prev) => {
      return { ...prev, [question]: quesObject };
    });

    console.log(categoryObject);
    setAnswerOject({});
    setQuestionNo(questionNo + 1);
    setAnswer(1);
  };
  const newQuestionAdder = () => {
    const formField = document.createElement("input");
    formField.placeholder = "Question...";
    formField.type = "text";
    formField.id = "question";
    formField.onchange = { answerObjectAdder };

    const check = document.createElement("input");
    check.placeholder = "Choose free text...";
    check.type = "number";
    check.id = "freeText";
    check.onchange = { answerObjectAdder };

    const newField = document.createElement("input");
    newField.type = "text";
    newField.name = "newfield";
    newField.id = "answer";
    newField.onchange = answerArray;
    newField.placeholder = "Answer";
    const numberField = document.createElement("input");
    numberField.type = "number";
    numberField.name = "newfield";
    numberField.id = "point";
    numberField.placeholder = "Points";
    numberField.onchange = answerArray;

    var bodyElement = document.querySelector("body");

    bodyElement.appendChild(formField);
    bodyElement.appendChild(check);
    bodyElement.appendChild(newField);
    bodyElement.appendChild(numberField);
  };

  return (
    <div style={{ padding: "1rem 10rem" }}>
      <h1>Form</h1>
      <form onSubmit={submitHandler}>
        <h5>Tab3</h5>

        <div className="someclass">
          <input
            type="text"
            placeholder="question"
            onChange={answerObjectAdder}
            id="question"
            name="questionadder"
          />
          <select
            onChange={answerObjectAdder}
            name="questionadder"
            id="freeText"
          >
            <option value="1">desc</option>
            <option value="2">MCQ</option>
          </select>

          <input
            type="text"
            id="answer"
            onChange={answerArray}
            placeholder="answer"
            name="questionadder"
          />
          <input
            type="number"
            id="point"
            onChange={answerArray}
            placeholder="point"
            name="questionadder"
          />
          <p onClick={questionsAdder}>Submit and Add new Answer </p>
          <p onClick={addNewAnswer}> Add new question </p>
        </div>

        <button onClick={newQuestionAdder}> Next question </button>
        <button type="submit">submit</button>
      </form>
    </div>
  );
}
export default MSFDemo;
