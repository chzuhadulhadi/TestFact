import React, { Component, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";
import StepsHeader from "./components/StepsHeader";
import PropertiesStep from "./components/AllSteps/PropertiesStep";
import CategoriesStep from "./components/AllSteps/CategoriesStep";
import QuestionStep from "./components/AllSteps/QuestionStep";
import AutomaticText from "./components/AllSteps/automaticText";
import TestLayout from "./components/AllSteps/layout";
import ResultStructureStep from "./components/AllSteps/ResultStructureStep";
import SideBar from "../../mainComponent/SideBar";
import Preview from "./components/AllSteps/Preview";
import { apiCall } from "../../../apiCalls/apiCalls";
import {
  createMyTest,
  getMyTest,
  getMySingleTest,
} from "../../../apiCalls/apiRoutes";
import { toast } from "react-toastify";

// var mainObj = {
//   orientation: 0,
//   scoringType: 0,
//   randomOrder: 0,
//   timeLimit: "",
//   questions: {},
//   resultStructure: {
//     tableSummary: false,
//     graph: false

//   },
//   automaticText: {

//   },
//   freeText: {}
// };

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

// function convertData(retObj) {
//   const obj = {
//     questions: {}
//   };

//   // Iterate through the categories and questions in retObj
//   for (const category in retObj) {
//     if (typeof retObj[category] === 'object') {
//       for (const questionId in retObj[category]) {
//         if (typeof retObj[category][questionId] === 'object') {
//           // Check if it's a free text question
//           if (retObj[category][questionId].freeText === 1) {
//             obj.questions[questionId] = {
//               question: retObj[questionId]?.question
//             };
//           } else {
//             // It's a category with multiple choice questions
//             obj.questions[questionId] = {
//               categoryName: category
//             };
//           }

//           // Iterate through the answer keys
//           for (const answerKey in retObj[category][questionId]) {
//             if (answerKey !== 'question' && answerKey !== 'category') {
//               const answerObj = retObj[category][questionId][answerKey];
//               const answerId = `${questionId}-answer-${answerKey}`;
//               obj.questions[answerId] = {
//                 answer: answerObj.answer,
//                 point: answerObj.points
//               };
//             }
//           }
//         }
//       }
//     }
//   }

//   return obj;
// }

function EditTest(props) {
  // console.log(props);
  var queryParameters = new URLSearchParams(window.location.search);
  var testId = queryParameters.get("id");
  // console.log(testId);
  const [newCategoryCreated, setNewCategoryCreated] = useState(0);
  const navigate = useNavigate();
  const [dto, setDto] = useState({
    id: testId,
  });
  const [tabSelected, setTabSelected] = useState("PROPERTIES");
  const [categoryStore, setCategoryStore] = useState({});
  const [mainObj, setMainObj] = useState({
    orientation: 0,
    scoringType: 0,
    randomOrder: 0,
    timeLimit: "",
    showuser: 0,
    questions: {},
    resultStructure: {
      tableSummary: false,
      graph: false,
    },
    automaticText: {},
    freeText: {},
    afterTestText: "",
    beforeTestText: "",
  });
  useEffect(() => {
    getTestData();
  }, []);
  const getTestData = () => {
    apiCall("post", getMySingleTest, { id: testId })
      .then((response) => {
        if (response.status == 200) {
          // console.log(response?.data?.data?.rows[0]);
          // const converted = convertData(response?.data?.data?.rows[0]);
          // console.log(converted);
          // mainObj = {
          // ...response?.data?.data?.rows[0],
          // ...converted
          // };
          const data = response?.data?.data;
          console.log(data);
          setMainObj({
            id: data.obj.id,
            sendAll: !!data.sendAll,
            orientation: data.orientation,
            scoringType: data.scoringType,
            randomOrder: data.randomOrder,
            timeLimit: data.timeLimit,
            questions: data.questions,
            resultStructure: data.resultStructure,
            automaticText: data.automaticText,
            freeText: data.freeText,
            beforeTestText: data.beforeTestText,
            afterTestText: data.afterTestText,
            name: data.name,
            categoryStore: data.categoryStore,
            layout: data.layout,
            testObj: data.getobj,
          });
          const filteredCategoryStore = Object.keys(response?.data?.data?.categoryStore).reduce((acc, key) => {
            if (key !== "categoryName" && key !== "noOfQuestion") {
              acc[key] = response?.data?.data?.categoryStore[key];
            }
            return acc;
          }, {});
          console.log(Object.keys(filteredCategoryStore));
          if (Object.keys(filteredCategoryStore).length > 0) {
            setCategoryStore(filteredCategoryStore);
          }
          // console.log(response?.data?.data);
          // return response?.data?.data?.rows[0];
          // setData(response?.data?.data?.rows);
          // setShowTable(true);
          // setTotalDataLenght(response?.data?.data?.count);
        } else {
          // setShowTable(false);
          return {};
        }
      })
      .catch((err) => {
        // setShowTable(false);
        console.log(err);
      });
  };

  function apiCallToCreateTest(draft) {
    console.log(mainObj);
    apiCall("post", createMyTest, { ...mainObj })
      .then((res) => {
        showToastMessage("Test created Successfully ", "green", 1);
        navigate("/dashboard/mytest");
      })
      .catch((err) => {
        showToastMessage("Please Fill all required fields", "red", 2);
      });
  }

  function showTab(tab) {
    setTabSelected(tab);
  }
  function mainObjectAdder(e, property, questionNo, type) {
    // console.log("mainObj[property]", mainObj[property], "type", type)
    console.log("mainObj", mainObj);

    setMainObj((prevMainObj) => ({
      ...prevMainObj,
      [property]: {
        ...prevMainObj[property],
        [questionNo]: {
          ...prevMainObj[property][questionNo],
          [type]: e.target.value,
        },
      },
    }));
  }

  function mainObjectRemover(e, property, questionNo, type) {
    try {
      let tempObj = mainObj;
      //we are deleting question0 from the mainObj also want to delete question0-answer0 from the mainObj
      Object.keys(tempObj[property]).forEach((key) => {
        if (key.includes(questionNo)) {
          console.log("key", key);
          delete tempObj[property][key];
        }
      });
      setMainObj(tempObj);
    } catch {
      console.log("error");
    }
  }
  // useEffect(() => {
  // console.log("mainObj", mainObj);
  // }, [mainObj]);
  function addCategoryStoreToMain() {
    let main = {
      ...mainObj,
      categoryStore,
    };
    // console.log("main", mainObj)
    setMainObj(main);
  }

  function mainObjectAdderForProperties(e, property) {
    // console.log("mainObj[property]", mainObj[property], "type", type)
    if (
      property == "beforeTestText" ||
      property == "afterTestText" ||
      property == "sendAll" ||
      property == "showuser"
    ) {
      let main = {
        ...mainObj,
        [property]: e,
      };
      setMainObj(main);
    } else {
      let main = {
        ...mainObj,
        [property]: e.target.value,
      };
      setMainObj(main);
    }

    // console.log("main", mainObj)
  }

  function mainObjectAdderForLayout(e, property, name, value) {
    // console.log("mainObj[property]", mainObj[property], "type", type)
    // console.log(e, property, name, value)
    let main = {
      ...mainObj,
      [property]: {
        ...mainObj[property],
        [name]: value,
      },
    };
    console.log("main");
    console.log(main);
    setMainObj(main);
    // console.log("main", mainObj)
  }
  function mainObjectAdderForResultStructure(e, property, name) {
    let main = {
      ...mainObj,
      [property]: {
        ...mainObj[property],
        [name]: e.target.checked,
      },
    };
    setMainObj(main);
    // console.log("main", mainObj)
  }
  function mainObjectAdderForAutomaticText(e, property, name) {
    let main = {
      ...mainObj,
      [property]: {
        ...mainObj[property],
        [e.target.id]: {
          ...mainObj[property][e.target.id],
          [name]: e.target.value,
        },
      },
    };
    setMainObj(main);
    // console.log("main", mainObj)
  }

  function getMainObj() {
    return mainObj;
  }

  function handleSaveTest(e) {
    // console.log("called")
    e.preventDefault();
    navigate("/dashboard/mytest");
  }

  return (
    <>
      <SideBar />
      <div className="dashboard-content">
        <StepsHeader
          obj={{ setTabSelected, tabSelected, showTab, mainObjectAdder }}
        />
        <PropertiesStep
          obj={{
            setTabSelected,
            mainObjectAdderForProperties,
            showTab,
            tabSelected,
            mainObj,
            handleSaveTest,
            apiCallToCreateTest,
          }}
        />
        <CategoriesStep
          obj={{
            setTabSelected,
            mainObjectAdder,
            showTab,
            tabSelected,
            setCategoryStore,
            categoryStore,
            apiCallToCreateTest,
            addCategoryStoreToMain,
            setNewCategoryCreated,
            mainObj,
          }}
        />
        <QuestionStep
          obj={{
            mainObjectAdder,
            showTab,
            setTabSelected,
            tabSelected,
            setCategoryStore,
            categoryStore,
            mainObj,
            apiCallToCreateTest,
            mainObjectAdder,
            getMainObj,
            newCategoryCreated,
            mainObjectRemover,
          }}
        />
        <TestLayout
          obj={{
            mainObjectAdder,
            showTab,
            tabSelected,
            mainObjectAdderForLayout,
            setTabSelected,
            mainObj,
            apiCallToCreateTest,
          }}
        />
        <ResultStructureStep
          obj={{
            showTab,
            setTabSelected,
            tabSelected,
            mainObjectAdderForResultStructure,
            mainObj,
            apiCallToCreateTest,
          }}
        />
        <AutomaticText
          obj={{
            mainObjectAdderForAutomaticText,
            showTab,
            tabSelected,
            categoryStore,
            setTabSelected,
            mainObj,
            apiCallToCreateTest,
          }}
        />
      </div>
    </>
  );
}

export default EditTest;
