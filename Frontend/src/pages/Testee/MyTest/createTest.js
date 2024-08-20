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
import { apiCall } from "../../../apiCalls/apiCalls";
import { createMyTest } from "../../../apiCalls/apiRoutes";
import { toast } from "react-toastify";
import Preview from "./components/AllSteps/Preview";

// var mainObj = {
//   orientation: 0,
//   categoryStore:{},
//   scoringType: 0,
//   randomOrder: 0,
//   timeLimit: "",
//   language: "english",
//   layout: {},
//   questions: {},
//   resultStructure: {
//     tableSummary: true,
//     graph: true

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

function CreateTest() {
  const [mainObj, setMainObj] = useState({
    orientation: 0,
    scoringType: 0,
    randomOrder: 0,
    timeLimit: "",
    language: "english",
    showuser: false,
    questions: {},
    resultStructure: {
      tableSummary: true,
      graph: true,
    },
    automaticText: {},
    freeText: {},
    afterTestText: "",
    beforeTestText: "",
  });

  useEffect(() => {
    console.log("called");
    // console.log("mainObj", mainObj)
  }, [mainObj]);
  const [newCategoryCreated, setNewCategoryCreated] = useState(0);
  const navigate = useNavigate();

  const [tabSelected, setTabSelected] = useState("PROPERTIES");
  const [categoryStore, setCategoryStore] = useState({});
  console.log(categoryStore);
  // const [mainObj, setMainObj] = useState({
  //   orientation: 0,
  //   scoringType: 0,
  //   randomOrder: 0,
  //   questions: {}
  // });
  useEffect(() => {
    // console.log("mainObj", mainObj);
  }, [mainObj]);

  function apiCallToCreateTest(draft) {
    let tempobj = mainObj;
    if (!mainObj?.categoryStore) {
      tempobj.categoryStore = { categoryName: "No Category", noOfQuestion: 50 };
    }

    apiCall("post", createMyTest, tempobj)
      .then((res) => {
        showToastMessage("Test created Successfully ", "green", 1);
        navigate("/dashboard/mytest");
      })
      .catch((err) => {
        showToastMessage("Please fill All required fields first", "red", 2);
      });
  }

  function showTab(tab) {
    setTabSelected(tab);
  }

  function mainObjectAdder(e, property, questionNo, type) {
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
            mainObjectAdder,
            showTab,
            tabSelected,
            setCategoryStore,
            categoryStore,
            apiCallToCreateTest,
            addCategoryStoreToMain,
            setNewCategoryCreated,
            setTabSelected,
            mainObj,
          }}
        />
        <QuestionStep
          obj={{
            mainObjectAdder,
            showTab,
            tabSelected,
            setCategoryStore,
            categoryStore,
            setTabSelected,
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
            apiCallToCreateTest,
            setTabSelected,
          }}
        />
        <ResultStructureStep
          obj={{
            showTab,
            tabSelected,
            mainObjectAdderForResultStructure,
            apiCallToCreateTest,
            setTabSelected,
          }}
        />
        <AutomaticText
          obj={{
            mainObjectAdderForAutomaticText,
            showTab,
            tabSelected,
            categoryStore,
            setTabSelected,
            apiCallToCreateTest,
            mainObj,
            getMainObj,
          }}
        />
      </div>
    </>
  );
}

export default CreateTest;
