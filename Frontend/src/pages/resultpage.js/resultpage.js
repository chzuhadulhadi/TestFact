
import Modal from 'react-bootstrap/Modal'
import React, { useState, useEffect } from 'react';
import Charts from './chart';
import Button from 'react-bootstrap/Button';
import { getResult } from '../../apiCalls/apiRoutes'
import { apiCall } from "../../apiCalls/apiCalls";
import TableRows from './components/tablerows';

function ResultPage() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [uuid, setUuid] = useState();
  const [invalidResult, setInvalidResult] = useState(0);
  const [formObj, setFormObj] = useState({});
  const [categoryData, setCategoryData] = useState({});
  const [autoText, setAutoText] = useState({});

  useEffect(() => {
    const url = window.location.href.split("/");
    setUuid(url[url.length - 1]);
    apiCall('post', getResult, { id: url[url.length - 1] })
      .then((res) => {
        if (res.status == 200) {
          const data = res.data.data;
          setFormObj(prevState => {
            let name = Object.assign({}, prevState);  // creating copy of state variable jasper
            name = data;
            return name;                                 // return new object jasper object
          })

          setCategoryData(prevState => {
            let name = Object.assign({}, prevState);  // creating copy of state variable jasper
            name = data.testObj;
            return name;                                 // return new object jasper object
          })
        }
        else {

        }
      }).catch((e) => {
        console.log(e)
        setInvalidResult(1);
      })

  }, [])
  useEffect(() => {
    if (!formObj) {
      return; // Handle the case where formObj is not defined or is falsy.
    }
    else {
      const selectedAnswers = [];
      const selectAnswer = [];

      for (const key in formObj.testObj) {
        for (const questionKey in formObj.testObj[key]) {
          const answer = formObj?.testObj[key][questionKey][formObj?.testObj[key][questionKey]["selectAnswer"]]?.answer;
          selectedAnswers.push(answer);
        }
      }
      // console.log( formObj.automaticText);
      for (const key in formObj.automaticText) {
        // console.log('key', key);
        if (key.includes('qcondition')) {

          const questionAnswer = formObj.automaticText[key]?.questionAnswer;
          // console.log('jete')

          if (selectedAnswers.includes(questionAnswer)) {
            const text = formObj.automaticText[key]?.text;
            selectAnswer.push(text);
          }
        }
      }

      // console.log(selectAnswer);
      setAutoText(selectAnswer);
    }

  }, [formObj]);




  function getTestStatus(testObj) {
    var status = "";
    if (testObj.testStart == null) {
      status = "The Test has Not started"
    }
    else if (testObj.testStart != null && testObj.testEnd == null) {
      status = "The Test is in progress"
    }
    else if (testObj.testStart != null && testObj.testEnd != null) {
      status = "The Test is complete"
    }
    return status;
  }
  // console.log('formob', formObj);
  return (
    <div className='resultpage'>
      {(!invalidResult && formObj && formObj.id) && (
        <div>
          <div className='result-header'>
            <h3 style={{ textAlign: 'center' }}>
              {/* //hebrew */}
              {formObj?.language == 'english' ?`Results for ${formObj?.additionalDetails?.name && formObj?.additionalDetails?.name != '' ? formObj.additionalDetails.name : formObj.userEmail}`: ` ${formObj?.additionalDetails?.name && formObj?.additionalDetails?.name != '' ? formObj.additionalDetails.name : formObj.userEmail}   תוצאות עבור`}
              
            </h3>
            {getTestStatus(formObj) == "The Test is complete" ? (
              <h5>
                {formObj?.language == 'english' ? `The Examinee answered ${formObj.resultStats.totalAnswer} questions out of ${formObj.resultStats.totalQuestion} Duration : ${formObj.resultStats.timeTakenForTest} Mins` : `המבחן נענה על ידי הבוחן ${formObj.resultStats.totalAnswer} שאלות מתוך ${formObj.resultStats.totalQuestion} משך : ${formObj.resultStats.timeTakenForTest} דקות`}
              </h5>) : getTestStatus(formObj)
            }
          </div>
          <table class="table result-table" style={{ margin: '0 auto', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th style={{ textAlign: 'center', paddingLeft: '200px' }}>{formObj?.language=='english' ? 'Category' : 'קטגוריה'}</th>
                <th style={{ textAlign: 'center', paddingRight: '200px' }}>{formObj?.language=='english' ? 'Percentage' : 'אחוזים'}</th>  
              </tr>
            </thead>

            <TableRows data={formObj} />
            <tbody>
              <tr style={{ "background-color": "yellow" }}>
                <td style={{ textAlign: 'center', paddingLeft: '200px' }}>{formObj?.language=='english' ? 'Total' : 'סה"כ'}</td>
                <td style={{ textAlign: 'center', paddingRight: '200px' }}> {(formObj.resultStats.totalPercentage / formObj.resultStats.totalCategories) ? (formObj.resultStats.totalPercentage / formObj.resultStats.totalCategories) : 0}
                  {" "}%
                </td>
              </tr>
            </tbody>
          </table>


          {/* Automatic text ends */}

          <div className='automatic-text'>
            <h6>
              {formObj?.language=='english' ? 'Graph' : 'גרף'}
            </h6>
          </div>
          <div className='chart' >
            <Charts dataRecieved={formObj.result} />
          </div>

          {/* Automatic text */}
          <div className='automatic-text'>
            <h6>
              {formObj?.language=='english' ? 'Additional Comments' : 'הערות נוספות'}
            </h6>
          </div>

          <div>
            {formObj.result &&
              formObj.result.map(function (categories) {
                return (
                  categories.category=='No Category' ? null :
                  <div style={{ textAlign: formObj?.language=='english' ? 'left' : 'right' }}>
                    <b> {categories.category + '-' + categories.percentage + '%'}</b>
                    <br />
                    {categories.text}
                    <hr style={{marginBottom:'0px'}}/>
                  </div>
                )
              })
            }
            {
              autoText.map(function (text) {
                return (
                  <div style={{ textAlign: 'left' }}>
                    {text}
                    <hr style={{marginBottom:'0px'}}/>
                  </div>
                )
              }
              )
            }
          </div>
          <div class="examinee-comments">
            <h5>{
              formObj?.language=='english' ? 'Answer Report For Admin' : 'דוח תשובות למנהל'}</h5>
            {
              Object.keys(categoryData).map(function (key) {
                return (
                  <div  style={{textAlign:formObj?.language=='english' ? 'left' : 'right '}}>
                    {Object.keys(categoryData[key]).map(function (questionKey) {
                      let color = 'red';
                      if (categoryData[key][questionKey][categoryData[key][questionKey]["selectAnswer"]]?.points >= 10) {
                        color = 'green';
                      }
                      else if (categoryData[key][questionKey][categoryData[key][questionKey]["selectAnswer"]]?.points >= 1) {
                        color = 'yellow';
                      }
                      return (
                        <>{categoryData[key][questionKey]["freeText"] == 1 ? (
                          <>
                            <b> {categoryData[key][questionKey]["question"]}</b>
                            <br />
                            {categoryData[key][questionKey]["selectAnswer"]}
                            <hr style={{marginBottom:'0px'}}/>
                          </>
                        ) :
                          (
                            <>
                              <b style={{textAlign:formObj?.language=='english' ? 'left' : 'right'}}> {categoryData[key][questionKey]["question"]}</b>
                              <br />
                              <p style={{ color: color,textAlign:formObj?.language=='english' ? 'left' : 'right' }}>
                                {formObj?.language == 'english' ? `Answer: ${categoryData[key][questionKey][categoryData[key][questionKey]["selectAnswer"]]['answer']}}`:` תשובה : ${categoryData[key][questionKey][categoryData[key][questionKey]["selectAnswer"]]['answer']} `
                                }
                              </p>
                              <hr style={{marginBottom:'0px'}}/>
                            </>
                          )
                        }
                        </>
                      )
                    })}
                  </div>
                )
              })
            }

          </div>
        </div>
      )
      }
      {
        (invalidResult == 1) && <div>
          No result available
        </div>
      }
      <div className='terms-of-use'>
        <h6>
          Terms of Use
        </h6>
      </div>
      <div className='copyright'>
        <h6>
          TestFactory.online@2023
        </h6>
      </div>
    </div >
  )
}
export default ResultPage