import './css/theme.css'
import { Tab } from "react-bootstrap"
import { Tabs } from "react-bootstrap"
import tabImage1 from './css/images/pngtree-concept-of-online-exam-on-internet-png-image_6060987.png'
function InfoTabs(params) {
    return(
        <div className='tab'>
   <Tabs
      defaultActiveKey="profile"
      id="fill-tab-example"
      className="mb-3"
      justify
    >
      <Tab eventKey="home" title="Register Easily">
     <div className="fullWidth">
        <div className="leftHalf">
<img src={tabImage1} />
        </div>
        <div className="rightHalf">
<h1>Register Easily</h1>
<p>
And purchase your appropriate test package and you will immediately get full access to all the test.



</p>
        </div>
     </div>
      </Tab>
      <Tab eventKey="profile" title="Choose the test to send">
      <div className="fullWidth">
        <div className="leftHalf">
<img src={tabImage1} />
        </div>
        <div className="rightHalf">
<h1>Choose from a multiple options the test to send</h1>
<p>
Intelligence test, salesman test, computer test, Hebrew test, and much more .
</p>
        </div>
     </div>
      </Tab>
      <Tab eventKey="contact" title="Contact">
      <div className="fullWidth">
        <div className="leftHalf">
<img src={tabImage1} />
        </div>
        <div className="rightHalf">
<h1>Choose the Recipients</h1>
<p>
Enter your candidates' emails and click "Send Test". The examinees will receive a link to the test and you will receive an email back with the score of each test performed


</p>
        </div>
     </div>
      </Tab>
    </Tabs>
</div>
    )
}
export default InfoTabs