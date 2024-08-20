import React, { Component, useState } from 'react';
import MSFHeader from './header';
import Properties from './properties';
import Structure from './structure';
import Categories from './categories';
import './style.css'
function MultiStepForm() {
  const [step, setStep] = useState(1)
  function selector(e) {
    const selected = e.target.id
    setStep(selected)
    document.querySelectorAll('.heading4').forEach((ele)=>{
      ele.style.backgroundColor = "#C9944F"
    })
    document.querySelector(`.heading4[id='${e.target.id}']`).style.backgroundColor = "#F88E04"
  }
  return(
    <div className='mainQues'>
    <h1>
      Create a new test
    </h1>
    <div className="MultiStepHeader">
             <h4 className="heading4" style={{backgroundColor:'#0488b9'}} id="1" onClick={selector}>
              <span id="1">1</span>Properties </h4>
             <h4 className="heading4" style={{backgroundColor:'#e7880a'}} id="2" onClick={selector}>
              <span id="2">2</span>Questions </h4>
             <h4 className="heading4" style={{backgroundColor:'#852c24'}} id="3" onClick={selector}>
              <span id="3">3</span>Structure </h4>
        </div>
        {/* <p style={{fontSize: '15px', fontWeight:'700'}}> Step {step}</p> */}

  {
   ( step==1) && <Properties /> 
  }
   {
   ( step==2) && <Structure /> 
  }
   {
   ( step==3) && <Categories /> 
  }
 <button type='submit' placeholder="Submit" onClick={()=>{setStep(step+1)
}}>Submit </button>
    </div>
  )
}

export default MultiStepForm;