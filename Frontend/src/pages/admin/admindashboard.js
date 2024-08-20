import "../dashboard/sidebar.css";
import Header from "../homepage/header";
import { useNavigate } from "react-router-dom";
import MultiStepForm from "../questionaire/multistepForm/newQuestionaire";
import QuestionaireHistory from "../questionaire/questionaireHistory";
import MainQuestionaire from "../questionaire/main";
import AddUserInList from "../listings/addUserInListing";
import Paper from "../questionaire/questionpaper";
import MyQuestionaire from "../questionaire/myquestionaire";
import Users from "./users";
import Tests from "./tests";
import { useEffect, useState } from "react";
import AdminSideBar from './sidebar';
import AdminEditTest from "./editTest";
import { apiCall } from "../../apiCalls/apiCalls";
import Results from "./results";
import { getResults } from "../../apiCalls/apiRoutes";
import Packages from "./packages";


function AdminDashboard(params) {

  const navigate = useNavigate()
  const location = window.location.pathname
  const [newlocation, setNewLocation] = useState('');
  console.log(/^\/\d+/.test(newlocation) );
  useEffect(() => {
    if (location) {
      let tmp = location.slice(location.lastIndexOf("/"), location.length);
      setNewLocation(tmp)
    }

  }, [location])

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token == null || token == "") {
      navigate('/')
    }
  })
useEffect(() => {
  //call loadResults and cache results in local storage
  loadResults();
}, []);



  const loadResults = () => {
    apiCall("post", getResults)
        .then((res) => {
            if (res.status === 200) {
                localStorage.setItem('results', JSON.stringify(res.data.data));
            }
        })
        .catch((err) => {
            console.error(err);
        });
};

  return (
    <div className="wrapper">
      <AdminSideBar />
      <div id="content">
        {(newlocation == '/users') && <Users />}
        {(newlocation == '/tests') && <Tests />}
        {(newlocation == '/results') && <Results />}
        {(newlocation == '/packages') && <Packages />}
        {/^\/\d+/.test(newlocation) && <AdminEditTest />}

      </div>
    </div>
  )
}
export default AdminDashboard;
