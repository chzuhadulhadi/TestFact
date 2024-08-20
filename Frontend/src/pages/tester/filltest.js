
import { useState, useEffect, useSearchParams } from "react";
import { userTestDetails, startUserTest, endUserTest, serverUrl, updateLandingPageInResult } from '../../apiCalls/apiRoutes'
import { apiCall } from "../../apiCalls/apiCalls";
import FillQuestion from "../questionaire/components/fillquestion";
import Countdown from 'react-countdown';
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import './style.css'
function MainQuestionaire() { 
  const [formObj, setFormObj] = useState({});
  const [displayTest, setDisplayTest] = useState(0);
  const [uuid, setUuid] = useState();
  const [timeRemaining, setTimeRemaining] = useState();
  const [invalidTest, setInvalidTest] = useState(0);
  const [testCompleted, setTestCompleted] = useState(0);
  const [apiMessage, setApiMessage] = useState();
  const [landingPage, setLandingPage] = useState(0);

  const navigate = useNavigate()

  var queryParameters = new URLSearchParams(window.location.search)
  var emailToDeal = queryParameters.get("email")

  useEffect(() => {
    const allUrl = window.location.href.split("?");

    const url = allUrl[0].split("/");

    setUuid(url[url.length - 1]);
    apiCall('post', userTestDetails, { id: url[url.length - 1] })
      .then((res) => {
        if (res.status == 200) {
          const data = res.data.data;
          // setFormObj(res.data.data)
          setFormObj(prevState => {
            let name = Object.assign({}, prevState);
            name = data;
            return data;
          })

          res.data.data.testStart ? setDisplayTest(1) : setDisplayTest(0)


          if (data.testStart) {
            var startDate = new Date(data.testStart);
            var endDate = new Date(data.testStart)
            endDate.setHours(endDate.getHours(), endDate.getMinutes() + data.timeLimit, 0 + startDate.getSeconds());
            setTimeRemaining(endDate);
            setTimeout(() => {
              document.getElementById("end-button-id").click()
            }, endDate - Date.now());


          }
          formObj.test?.landingPage?.html ? setLandingPage(1) : setLandingPage(0)

        }
        else {
          console.log("error")
        }
      }).catch((e) => {
        setInvalidTest(1);
        // console.log(e)
        setApiMessage(e.response.data.data.specificError)
      })

  }, [])
  var formData = {}

  useEffect(() => {

    setTimeout(() => {
      var handler = document.getElementsByName('formfieldDynamic')
      handler.forEach((ele) => {
        ele.addEventListener('input', (e) => {
          formData[e.target.id] = e.target.value
        })
      })
      document.getElementsByTagName("forms");

    }, 2000);
  }, [])

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
  function submitFunction(e) {
    e.preventDefault();

    const url = window.location.href.split("/");

    // console.log("Submitted", formData)
    apiCall('post', updateLandingPageInResult, { ...formData, id: url[url.length - 1] }, true)
      .then((res) => {

        setLandingPage(0)
        if (res.status == 200) {

        }
        else {
          //handle error
        }
      })
  }


  function startTest() {

    //Call backend api to initite test
    apiCall('post', startUserTest, { id: uuid })
      .then((res) => {
        var startDate = new Date()
        showToastMessage("Test started ", "green", 1);
        if (res.status == 200) {
          res.data.data[0] == 1 ? setDisplayTest(1) : setDisplayTest(0)
          // var startDate = new Date(formObj.testStart);
          var endDate = startDate;
          endDate.setHours(endDate.getHours(), endDate.getMinutes() + formObj.timeLimit, 0 + startDate.getSeconds());
          setTimeRemaining(endDate);

        }
        else {
          //handle error
        }
      }).catch((err) => {
        showToastMessage(err?.response?.data?.message, "red", 2);

      })
  }

  function endTest() {
    //Call backend api to initite test
    apiCall('post', endUserTest, { id: uuid })
      .then((res) => {
        if (res.status == 200) {
          setDisplayTest(0);
          setTestCompleted(1);
          showToastMessage("Test ended ", "green", 1);
        }
        else {
          //handle error
        }
      }).catch((err) => {
        showToastMessage(err?.response?.data?.message, "red", 2);

      })
    // setDisplayTest(1)
  }
  // function myfunc() {
  //   setDisplayTest(0);
  //   setTestCompleted(1);
  // }

  return (
    <div className="filltest" >
    <div className="Send">
    <img src='/4.webp' alt="some image" width='300px' height='300px' className="pic" />
<h3 style={{marginTop:'0',marginBottom:'0',paddingTop:'0',paddingBottom:'0',color:'orange'}} onClick={() => { navigate('/') }}><span style={{ color: 'black' }}>{"Test "}</span>Factory</h3>
    </div>
      {//Landing page
        (!displayTest == 1 && invalidTest != 1 && !testCompleted && landingPage == 1) &&
        <div className="testStartClass">
          {/* <img className="test-start-img" src={serverUrl + formObj?.layout?.imageUrl} /> */}
          {/* <h2 className="test-title">{formObj?.name}</h2> */}
          <br />
          <div
            dangerouslySetInnerHTML={{ __html: formObj.test?.landingPage?.html }}
          />
          <br />
          {/* <button onClick={startTest}>Start Test</button> */}
        </div>
      }
      {//Test started and is valid
        (displayTest == 1 && invalidTest != 1 && !testCompleted) &&
        <div>
          {
            formObj?.layout?.imageUrl &&
          <img className="test-logo" src={serverUrl + formObj?.layout?.imageUrl} />
          }
          {formObj.timeLimit > 0 && <h2 className="timer">
           <Countdown className="count-down" date={timeRemaining} />
          </h2>
        }
          {/* <button id="end-button-id" className="end-button" onClick={endTest}>End Test</button> */}
          <FillQuestion questionData={formObj} language={formObj.language} />

          <button className="end-button" onClick={endTest}>End Test</button>

        </div>

      }

      {//Test not started
        (!displayTest == 1 && invalidTest != 1 && !testCompleted && landingPage == 0) &&
        <div className="testStartClass">
          {/* <img className="test-start-img" src={serverUrl + formObj?.layout?.imageUrl} /> */}
          <h2 className="test-title">{formObj?.additionalDetails?.note}</h2>
          <br />
          <div
            dangerouslySetInnerHTML={{ __html: formObj.beforeTestText }}
          />
          <br />
          <button onClick={startTest}>Start Test</button>
        </div>
      }

      {//Test Invalid
        invalidTest == 1 && <div className="textValidate"><h2>
          {apiMessage}
          {apiMessage == "Alloted time for questions is over" ? <div className="end-test-text"
            dangerouslySetInnerHTML={{ __html: formObj.afterTestText }}
          /> : ""}
        </h2>
        </div>
      }

      {//Test Completed
        testCompleted == 1 && <div className="textValidate"><h2>
          {/* {apiMessage} */}
          {<div className="end-test-text"
            dangerouslySetInnerHTML={{ __html: formObj.afterTestText }}
          />}
        </h2>
        </div>
      }

    </div>

  )
}
export default MainQuestionaire;