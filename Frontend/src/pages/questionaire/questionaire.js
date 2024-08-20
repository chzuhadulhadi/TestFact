import './style.css'
function Questionaire() {
  return (
          <div>
               <div class="Leftside">
                <div className='properties'>
          <form action="#">
            <fieldset>
                            <input
                type="textarea"
                value=""
                placeholder="Question..."
                className='form-control'
              />
              <input type="text" value="" placeholder="Answer1" className='form-control' />
              <input type="text" value="" placeholder="Answer2" className='form-control' />
              <input type="text" value="" placeholder="Answer3" className='form-control' />
              <input type="text" value="" placeholder="Answer4" className='form-control' />
              <div class="Leftside">
                <button type="submit" value="send" class="button" >Submit </button>
              </div>
              <div class="Rightside" style={{marginTop: '-12px'}} >
                <button type="button" value="Add new" class="button"> Add New</button>
              </div>
            </fieldset>
          </form>
          </div>
        </div>

        <div class="Rightside">
          <div class="selectInput">
        
            <h3>MCQs!</h3>
            
            <div className='properties'>
       <label>Select Category</label>
            <select className='form-control'>
              <option value="1">Sales test</option>
              <option value="2">Intelligence test</option>
              <option value="3">Hebrew test</option>
              <option value="4">Test on computers</option>
              <option value="5">Reliability and responsibility test</option>
              <option value="6">
                Reliability test, warranty and stability
              </option>
            </select>

<div class="selectInput">
<label>Select Correct Answer</label>
            <select className='form-control'>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
            </select>
          </div>
          </div>
        </div>
        </div>
      </div>

  );
}

export default Questionaire;
