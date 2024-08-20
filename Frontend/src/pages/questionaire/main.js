import Questionaire from "./questionaire";
import Questionaire2 from "./questionaire2";
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button';
import { useState } from "react";
function MainQuestionaire() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
    const [optionSelected, setOptionSelected] = useState(false)
return(
<div class="Get_sec" style={{height: '100vh'}}>
 
    <h1>Questionaire</h1>
    <div class="Mid">
    <div class="form-check form-switch">
  <input class="form-check-input" type="checkbox" id="flexSwitchCheckChecked" onChange={()=>{setOptionSelected(!optionSelected)}}/>
  <label class="form-check-label" for="flexSwitchCheckChecked">Change question type</label>
</div>
<Button variant="primary" onClick={handleShow}>
        Create new Questionaire
      </Button>
      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Create New Questionaire</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <form>
  <div class="form-group">
    <label for="exampleInputEmail1">Name</label>
    <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Name ..." />
  </div>
  <div class="form-group">
    <label for="exampleInputPassword1">Description</label>
    <textarea type="text" class="form-control" id="exampleInputPassword1" placeholder="Description..." />
  </div>
  <div class="form-group">
    <label for="exampleInputPassword1">Category</label>
    <select class="form-control"> 
    <option value="1">Sales test</option>
              <option value="2">Intelligence test</option>
              <option value="3">Hebrew test</option>
              <option value="4">Test on computers</option>
              <option value="5">Reliability and responsibility test</option>
              <option value="6">
                Reliability test, warranty and stability
              </option>
    </select>
  </div>
    
  <button type="submit" class="btn btn-primary">Submit</button>
</form>
          </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
  
    {
        optionSelected ? <Questionaire />  : <Questionaire2 /> 
    }
    </div>
  </div>
)
}
export default MainQuestionaire;
