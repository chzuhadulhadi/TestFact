function Questionaire2() {
  return (
         <div>
              <div class="Leftside">
          <form action="#">
            <fieldset>
              <label>Enter the question</label>
              <input
                type="textarea"
                value=""
                placeholder="Question..."
                className="form-control"
              />
                 <div>
               
                <label> Mark the correct answer </label>
                <select className="form-control">
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                </select>
              
                <label >
                  Choose the category
                  </label>
                  <select className="form-control">
                    <option value="1">Sales test</option>
                    <option value="2">Intelligence test</option>
                    <option value="3">Hebrew test</option>
                    <option value="4">Test on computers</option>
                    <option value="5">
                      Reliability and responsibility test
                    </option>
                    <option value="6">
                      Reliability test, warranty and stability
                    </option>
                  </select>
             
              </div>
              <div class="Leftside">
                <input
                style={{marginTop : '9px'}}
                  type="submit"
                  value="send"
                  class="button"
                />
              </div>
              <div class="Rightside">
                <input
                style={{marginLeft : '-4.7rem'}}
                  type="button"
                  value="Add new"
                  class="button"
                />
              </div>
            </fieldset>
          </form>
        </div>

        <div class="Rightside">
          <div class="loginPage">
            <h3>Descriptive!</h3>
            <p> Your information will be secure with us</p>
          </div>
        </div>
      </div>

  );
}
export default Questionaire2;
