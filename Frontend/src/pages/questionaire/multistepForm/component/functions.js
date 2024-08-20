import { useState } from "react";
export function QuestionCreator (num) {
var count = 0 ;
var object= {
}
var fullobject= {
}
const answerArray = (e) =>{
  object[e.target.id] = e.target.value
  console.log(object)
}
const submitHandler = (e) =>{
    e.preventDefault()
    console.log(e.target.id)
    const namequestion = "question" + e.target.id
    fullobject={
        [namequestion] :  object
    }
    console.log(fullobject)

}
const newFieldAdder = () =>{
    count= count +1
    const divAdder = document.querySelector('.questionsDiv')
    console.log(divAdder)
    const newField = document.createElement("input");
    newField.type = "text";
    newField.name = "newfield"
   newField.id = "answer" + count
    newField.onchange = answerArray;
    newField.placeholder = "Answer";
    const numberField = document.createElement('input')
    numberField.type='number'
    numberField.name = "newfield"
    numberField.id  = "point" +  count
    numberField.placeholder = "Points"
    numberField.onchange = answerArray
    divAdder.appendChild(newField)
    divAdder.appendChild(numberField)
}
    var questionDiv = document.querySelector('.questions')
    const formField = document.createElement('input')
  formField.placeholder = "Question..."
  formField.type="text"
  formField.id= "question"
formField.onchange = answerArray
  formField.required = 'true'
 
  const check= document.createElement('input')
  check.placeholder = "Choose free text..."
  check.type= "number"
  check.id= "freeText"
  check.onchange = answerArray
  check.required = 'true'
 
  const newField = document.createElement("input");
  newField.type = "text";
  newField.name = "newfield"
 newField.id = "answer" + count
  newField.onchange = answerArray;
  newField.placeholder = "Answer";
  const numberField = document.createElement('input')
  numberField.type='number'
  numberField.name = "newfield"
  numberField.id  = "point" +count
  numberField.placeholder = "Points"
  numberField.onchange = answerArray

  const div = document.createElement('div')
  div.className = "questionsDiv"
  div.id = "questionDiv"
  
const button = document.createElement('button')
button.type= 'submit'
button.textContent = "Submit"

  const form = document.createElement('form')
form.onsubmit = submitHandler
form.id =count

const addNewAnswer = document.createElement('p')
addNewAnswer.onclick = newFieldAdder
addNewAnswer.textContent  = "Add new answer"

form.appendChild(formField)
form.appendChild(check)
form.appendChild(newField)
form.appendChild(numberField)
form.appendChild(div)
form.appendChild(addNewAnswer)
form.appendChild(button)

questionDiv.appendChild(form)

}