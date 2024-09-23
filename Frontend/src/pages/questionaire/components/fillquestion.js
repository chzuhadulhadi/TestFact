import { saveUserTest, serverImageUrl } from '../../../apiCalls/apiRoutes'
import { apiCall } from "../../../apiCalls/apiCalls";
import React, { useEffect } from 'react';
import { useState } from "react";
import { toast } from "react-toastify";

var categoryData;
var questionCount = 1;


function FillQuestion(questionData) {
    const divStyle = {
        textColor: { color: questionData.questionData.layout.textColor, background: questionData.questionData.layout.backgroundColor, textAlign: questionData?.language == 'english' ? 'left' : 'right',padding:'20px' },
        answerColor: { color: questionData.questionData.layout.answerColor, textAlign: questionData?.language == 'english' ? 'left' : 'right' },
        logoBackgroundColor: { backgroundColor: questionData.questionData.layout.backgroundColor },
        question: { color: questionData.questionData.layout.questionTextColor, background: questionData.questionData.layout.questionBackgroundColor, width: '100%' },
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

    const testObj = questionData.questionData;
    const [temp, setTemp] = useState(testObj.testObj)
    categoryData = testObj.testObj;

    var [showDiv, setShowDiv] = useState(1);
    var [totalQuestion, setTotalQUestion] = useState(1);

    function handleChange(key, questionKey, answer, e) {
        setTemp(prevState => {
            let name = Object.assign({}, prevState);
            try {
                name[key][questionKey]["selectAnswer"] = answer;
            }
            catch {
                name[key][questionKey] = answer;
            }
            apiCall('post', saveUserTest, { id: testObj.id, testObj: name })
                .then((res) => {
                    if (res.status == 200) {
                        // showToastMessage("User test saved Successfully ", "green", 1);
                    }
                    else {

                    }
                }).catch((err) => {
                    showToastMessage(err?.response?.data?.message, "red", 2);

                });
            return name;                                 // return new object jasper object
        })
        // categoryData[key][questionKey] = answer;    
        // categoryData[key][questionKey] = { ...categoryData[key][questionKey], 'selectedAnswer':answer };


    }

    function next() {
        // console.log("next clicked")
        ++questionCount;
        setShowDiv(++showDiv)
    }
    function prev() {
        // console.log("prev clicked")

        --questionCount;
        setShowDiv(--showDiv)
    }
    var count = 0;

    const [isLoaded, setIsLoaded] = useState(false);
    const [isPageLoaded, setIsPageLoaded] = useState(false); //this helps

    // useEffect(() => {
    //     setIsLoaded(true);
    // }, []);
    useEffect(() => {
        let questionCount = 0;
        Object.keys(categoryData).map(function (key) {
            {
                if (!categoryData[key]["freeText"] && !categoryData[key]["freeText"] == 1) {
                    Object.keys(categoryData[key]).map(function (questionKey) {
                        {
                            ++questionCount;
                        }
                    })
                }
            }
        }
        )
        setTotalQUestion(questionCount)
    }, [questionData.questionData.testObj]);
    // useEffect(() => {
    //     if (isLoaded) {
    //         setIsPageLoaded(true);
    //     }
    // }, [isLoaded]);
    // const [pressedKey, setPressedKey] = useState(0)
    const [renderControl, setRenderControl] = useState(false)

    useEffect(() => {
        window.addEventListener('keydown', (e) => {
            // console.log("pressed")

            // setPressedKey(e.key)
            selectPressed(e.key)
        })
    }, [])

    function selectPressed(pressedKey) {
        if (pressedKey != 0) {
            const input = document.querySelectorAll(".radio-" + pressedKey + "question" + (questionCount - 1))
            for (let singleRadio of input) {
                const name = singleRadio.getAttribute("name");
                if (name == "question" + (questionCount - 1)) {
                    singleRadio.click();
                    document.getElementById('nextButton')?.click();

                }

            }

        }
    }
    
    return (
        <div style={divStyle.textColor} className='fill-question'  >
            {/* <h1>{testObj.name}</h1> */}
            {
                questionData.questionData.layout.imageUrl &&
                <img 
                    className="test-logo" 
                    src={serverImageUrl + questionData.questionData.layout.imageUrl}
                    style={{ padding: '20px'}}
                />
            }
            {Object.keys(categoryData).map(function (key) {
                {
                    const regexPattern = /answer[0-9]/;
                    if (!categoryData[key]["freeText"] || categoryData[key]["freeText"] == 0) {
                        return (
                            <div>
                                {Object.keys(categoryData[key]).map(function (questionKey) {

                                    {
                                        ++count;
                                    }
                                    return (
                                        <>
                                            {/* One By one case */}
                                            {testObj.orientation == 1 && <div key={count} hidden={(showDiv == count) ? false : true}>
                                                {key !== "No Category" && <h2>{key}</h2>}
                                                {categoryData[key][questionKey]["image"] && categoryData[key][questionKey]["image"] != '' &&
                                                    <img
                                                        height={'200px'}
                                                        width={'200px'}
                                                        src={serverImageUrl + categoryData[key][questionKey]["image"]}
                                                    />
                                                }
                                                <div style={divStyle.question} className='question'>
                                                    <h4>
                                                        {questionData?.language == 'english' ? `Question ${count}:` : ''}

                                                        {
                                                            categoryData[key][questionKey]["question"]
                                                        }
                                                        {questionData?.language != 'english' ? `:שאלה ${count}` : ''}

                                                    </h4>
                                                </div>
                                                <br />
                                                {
                                                    (!categoryData[key][questionKey]["freeText"] || categoryData[key][questionKey]["freeText"] == 0 || Object.keys(categoryData[key][questionKey]).includes('answer0')) ? (

                                                        Object.keys(categoryData[key][questionKey]).map(function (answers, index) {
                                                            if (answers.includes("answer")) {
                                                                return (<div style={divStyle.answerColor} className='radio-answer' >
                                                                    <p>
                                                                        <input className={"radio-" + (index + 1) + questionKey} id={answers} type="radio" checked={temp[key][questionKey]["selectAnswer"] === answers} value={questionKey} name={questionKey} onChange={(e) => handleChange(key, questionKey, answers, e)} />
                                                                        {/* <input type="radio" value={questionKey} name={questionKey} onChange={()=>categoryData[key][questionKey]["selectAnswer"]=answers} /> */}
                                                                        {" "}
                                                                        {categoryData[key][questionKey][answers]["image"] && categoryData[key][questionKey][answers]["image"] != '' && <img
                                                                            height={'200px'}
                                                                            width={'200px'}
                                                                            src={serverImageUrl + categoryData[key][questionKey][answers]["image"]}
                                                                        />
                                                                        }
                                                                        {categoryData[key][questionKey][answers]["answer"]}
                                                                    </p>

                                                                </div>)
                                                            }

                                                        })
                                                    ) : <textarea className='text-answer' onChange={(e) => handleChange(key, questionKey, e.target.value, e)}></textarea>
                                                }
                                                <div className="prev-next">
                                                    {(1 - showDiv) != 0 && <button onClick={prev}>Prev</button>}
                                                    {showDiv < totalQuestion && <button id="nextButton" onClick={next}>Next</button>}
                                                </div>
                                            </div>}

                                            {/* single case */}
                                            {testObj.orientation == 0 && <div key={count} >
                                                <div style={divStyle.question} className='question'>

                                                    <h4>
                                                        {questionData?.language != 'english' ? `  שאלה :` : ''}
                                                        {
                                                            categoryData[key][questionKey]["image"]
                                                            && categoryData[key][questionKey]["image"] != '' &&
                                                            <img
                                                                height={'200px'}
                                                                width={'200px'}
                                                                src={serverImageUrl + categoryData[key][questionKey]["image"]}
                                                            />
                                                        }
                                                        {questionData?.language == 'english' ? `Question ${count}:` : ''}
                                                        {
                                                            categoryData[key][questionKey]["question"]
                                                        }
                                                    </h4>
                                                </div>
                                                {/* <div className='question'></div> */}
                                                <br />
                                                <div className='radio-answer-all-single'>
                                                    {
                                                        (!categoryData[key][questionKey]["freeText"] || categoryData[key][questionKey]["freeText"] == 0) ? (

                                                            Object.keys(categoryData[key][questionKey]).map(function (answers) {
                                                                if (answers.includes("answer")) {
                                                                    return (<div style={divStyle.answerColor} className='radio-answer '>
                                                                        <p>
                                                                            {questionData?.language == 'hebrew' ? categoryData[key][questionKey][answers]["answer"] : " "}
                                                                            {' '}
                                                                            {categoryData[key][questionKey][answers]["image"] && categoryData[key][questionKey][answers]["image"] != '' && <img
                                                                                height={'200px'}
                                                                                width={'200px'}
                                                                                src={serverImageUrl + categoryData[key][questionKey][answers]["image"]}
                                                                            />
                                                                            }
                                                                            <input id={answers} type="radio" checked={temp[key][questionKey]["selectAnswer"] === answers} value={questionKey} name={questionKey} onChange={(e) => handleChange(key, questionKey, answers, e)} />
                                                                            {/* <input type="radio" value={questionKey} name={questionKey} onChange={()=>categoryData[key][questionKey]["selectAnswer"]=answers} /> */}
                                                                            {' '}                                                                         {/* {" "}{categoryData[key][questionKey][answers]["answer"]}{' '} */}
                                                                            {questionData?.language == 'english' ? categoryData[key][questionKey][answers]["answer"] : " "}
                                                                        </p>

                                                                    </div>)
                                                                }

                                                            })
                                                        ) : <textarea className='text-answer' onChange={(e) => handleChange(key, questionKey, e.target.value, e)}></textarea>
                                                    }
                                                </div>
                                            </div >}
                                        </>
                                    )
                                })}
                            </div>)
                    }
                    else if (Object.keys(categoryData[key]).some(key => /answer[0-9]/.test(key))) {
                        return (
                            <>
                                <div style={divStyle.question} className='question'>
                                    <h4>
                                        {questionData?.language == 'english' ? `Question ${count}:` : ''}
                                        {
                                            categoryData[key]["image"] && categoryData[key]["image"] != '' &&
                                            <img
                                                height={'200px'}
                                                width={'200px'}
                                                src={serverImageUrl + categoryData[key]["image"]}
                                            />

                                        }
                                        {
                                            categoryData[key]["question"]
                                        }
                                        {questionData?.language != 'english' ? `:שאלה ${count}` : ''}

                                    </h4>
                                </div>
                                {/* //if Object.key includes answer[0-9] then show radio */}
                                <div className='radio-answer-all'>
                                    {
                                        Object.keys(categoryData[key]).map(function (answers, index) {
                                            if (answers.includes("answer")) {
                                                return (<div style={divStyle.answerColor} className='radio-answer'>
                                                    <p>
                                                        <input className={"radio-" + (index + 1) + key} id={answers} type="radio" checked={temp[key]["selectAnswer"] === answers} value={key} name={key} onChange={(e) => handleChange(key, "selectAnswer", answers, e)} />
                                                        {/* <input type="radio" value={questionKey} name={questionKey} onChange={()=>categoryData[key][questionKey]["selectAnswer"]=answers} /> */}
                                                        {" "}
                                                        {categoryData[key][answers]["image"] && categoryData[key][answers]["image"] != '' && <img
                                                            height={'200px'}
                                                            width={'200px'}
                                                            src={serverImageUrl + categoryData[key][answers]["image"]}
                                                        />
                                                        }
                                                        {categoryData[key][answers]["answer"]}
                                                    </p>
                                                </div>)
                                            }

                                        })
                                    }
                                </div>
                            </>
                        )


                    }
                    else {
                        return <div className='free-text-div'>
                            <div style={divStyle.question} className='question'>
                                <h4>
                                    Question:
                                    {
                                        categoryData[key]["question"]
                                    }
                                    {
                                        categoryData[key]["image"] && categoryData[key]["image"] != '' &&
                                        <img
                                            height={'200px'}
                                            width={'200px'}
                                            src={serverImageUrl + categoryData[key]["image"]}
                                        />
                                    }
                                </h4>
                            </div>

                            <textarea className='text-answer' onChange={(e) => handleChange(key, "selectAnswer", e.target.value, e)}></textarea>
                        </div>
                    }
                }
            })
            }

        </div >
    )
}
export default FillQuestion;
