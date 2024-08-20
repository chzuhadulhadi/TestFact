import React, { useEffect, useState } from 'react';
import { apiCall } from '../../apiCalls/apiCalls';
import { getSingleLandingPage,sendMailingList,sendUserInfo } from '../../apiCalls/apiRoutes';
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';

const LandingPageForm = () => {
    const navigate=useNavigate();
    var queryParameters = new URLSearchParams(window.location.search);
    var id = queryParameters.get("id");
    const [landingPage, setLandingPage] = useState();
    const [testId, setTestId] = useState();
    // const [allLandingPages, setAllLandingPages] = useState([]);
    useEffect(() => {
        getPage();
    }, []);
    
    useEffect(() => {
        if (landingPage) {
            //extract only mainNav4
            console.log(landingPage);
            const mainNav4 = landingPage.split('<form id="submissionForm">')[1].split('</form>')[0];
            document.getElementById("l-page").innerHTML = '<form id="submissionForm">'+mainNav4+'</form>';
            const sections = document.querySelectorAll("#l-page section");
            sections.forEach((section) => {
                section.style.border = "none";
            });
        }
    }, [landingPage]);

    const showToastMessage = (text, color, notify) => {
        if (notify == 1) {
          toast.success(text, {
            position: toast.POSITION.TOP_RIGHT,
            style: { color: color },
          });
        } else {
          toast.warning(text, {
            position: toast.POSITION.TOP_RIGHT,
            style: { color: color },
          });
        }
      };
    const handleFormSubmit=async(e)=>
    {
        e.preventDefault();
        const formData = new FormData(e.target);
        const email=formData.get("email");
        const lastName=formData.get("lastName");
        const firstName=formData.get("firstName");
        const phoneNumber=formData.get('phoneNumber');
        const termAndCondition=!!formData.get('termAndCondition');
        const dto={emails:[{email:email,name:firstName}],id:[testId],mailingList:[],note:'Test',LandingPageId:id}
        apiCall('post',sendUserInfo,{email,lastName,firstName,phoneNumber,termAndCondition,testId});
        const resp = await apiCall("post", sendMailingList,dto, true);
        if (resp.status === 200) {
          showToastMessage("Test send successfully on your mail", "green", 1);
          if(resp.data.data[0].testUrl)
                window.location.href=resp.data.data[0].testUrl;
        else
            navigate("/");
        } 
        else {
          showToastMessage(
            "Server Error Please try again later",
            "red",
            2
          );
        }
    }
    useEffect(() => {
        const formElement = document.getElementById("submissionForm");
        if (formElement) {  
            formElement.addEventListener("submit", handleFormSubmit);

            // Clean up the event listener when the component unmounts
            return () => {
                formElement.removeEventListener("submit", handleFormSubmit);
            };
        }
    }, [landingPage]); 
   

    const getPage = () => {
        apiCall(
            "post",
            getSingleLandingPage,
            {
                id: id,
            },
            true
        )
            .then((res) => {
                console.log(res.data.data);
                setLandingPage(res.data.data.html);
                setTestId(res.data.data.testId);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <>
            <div id="l-page">
            </div>
        </>
    )
}

export default LandingPageForm