
import { useState, useEffect } from "react";
import { userTestDetails, startUserTest } from '../../apiCalls/apiRoutes'
import { apiCall } from "../../apiCalls/apiCalls";
import FillQuestion from "./components/fillquestion";
import Countdown from 'react-countdown';
import { useNavigate } from "react-router-dom";

var questionCounter = 1;
var mainObj = {}

function MainQuestionaire() {
    const [html, setHtml] = useState({})
    // const [mainObj, setMainObj] = useState({})

    function handleFieldChange(e, changeType) {
        const questionNo = e.target.id;

        mainObj[questionNo][changeType] = e.target.value

        console.log(mainObj)

    }
    function handleCategoryChange(e, questionNo) {

    }
    function addQuestion() {
        if(!mainObj["question" + questionCounter]){
            mainObj["question" + questionCounter] = {
                "name":"",
                "point":"",
                "category":""
            }
        }
        console.log(mainObj)

        setHtml(prevState => {
            let name = Object.assign({}, prevState);  // creating copy of state variable jasper
            name["question" + questionCounter] = (<div key={"question" + questionCounter}>
                <input type="text" id={"question" + questionCounter} onChange={(e) => handleFieldChange(e, "name")} />
                <input type="text" id={"question" + questionCounter} onChange={(e) => handleFieldChange(e, "point")} />

                <select onChange={(e) => handleCategoryChange(e, "question" + questionCounter)}>
                    <option value="A">Apple</option>
                    <option value="B">Banana</option>
                    <option value="C">Cranberry</option>
                </select>
                <button onClick={addQuestion}>Add Question</button>
            </div>)
            ++questionCounter;
            return name;                                 // return new object jasper object
        })
    }
    function addAnswer() {

    }

    return (
        <div>
            <button onClick={addQuestion}>+</button>
            {Object.keys(html).map(function (key, i) {
                <button>Add Question</button>
                return html[key]
            })
            }
        </div>
    );
}


export default MainQuestionaire;
