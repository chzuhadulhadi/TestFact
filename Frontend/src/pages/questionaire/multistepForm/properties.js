import './style.css'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

function Properties() {
    return(
        <div className='properties'>
       <form>
        <input type="text" placeholder="Name ... "  className='form-control'/>
        <select className='form-control'>
            <option>One List</option>
            <option>Step Wise</option>
        </select>
        <select className='form-control'>
            <option>True/False</option>
            <option>Shades</option>
        </select>
        </form>
        </div>
       
    )
}
export default Properties