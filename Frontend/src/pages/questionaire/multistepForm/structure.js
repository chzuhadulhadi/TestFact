import './style.css'
import Questionaire from "../questionaire"
function Structure() {
    return(
        <div className="properties">
        
      <input type="text" placeholder='Question... ' /> 
      <input type="text" placeholder='Answer.... ' /> 
      <input type="text" placeholder='Answer.... ' /> 
      <input type="text" placeholder='Answer.... ' /> 
      <input type="text" placeholder='Answer.... ' /> 
      <select>
        <option>Categories1</option>
        <option>Categories2</option>
        <option>Categories3</option>
        </select>
        <select>
        <option>type1</option>
        <option>type2</option>
        <option>Typre3</option>
        </select>
        </div>
    )
}
export default Structure