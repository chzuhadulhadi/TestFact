import Tooltip from 'react-bootstrap/Tooltip';
import Button from 'react-bootstrap/Button';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
function Categories() {
    return(
        <>
         <h1>
            Categories
        </h1>
        <OverlayTrigger
        delay={{ hide: 450, show: 300 }}
        overlay={(props) => (
          <Tooltip {...props}>
            Sometimes one questionnaire checks several aspects. For example, a customer satisfaction 
            questionnaire may include 2 categories: A. Speed of service, B. Quality of service. 
          </Tooltip>
        )}
        placement="top"
      ><Button variant="warning">Category ?? </Button>
      </OverlayTrigger>
        </>
    
    )
}
export default Categories