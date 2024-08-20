import { useState } from 'react'
import './style.css'
function MSFHeader(props) {
    const [selected , setSelected] = useState(props.data)
    console.log(selected)
    return(
        <div className="MultiStepHeader">
             <h4 id="1">Properties </h4>
             <h4 id="2">Categories </h4>
             <h4 id="3">Structure </h4>
        </div>
    )
}
export default MSFHeader