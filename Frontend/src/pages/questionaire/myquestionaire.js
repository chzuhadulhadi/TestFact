import Modal from "react-bootstrap/Modal";
import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import "./style.css";
import { apiCall } from "../../apiCalls/apiCalls";
import {
  getMailingList,
  getMailingListUser,
  getMyTest,
  createMyTest,
  deletemyTest,
  duplicateTest as duplicateTestApi,
} from "../../apiCalls/apiRoutes";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import ReactPaginate from "react-paginate";
import SendTestFunctionality from "./sendTestFunctionality";
import { elements } from "chart.js";
import { create } from "@mui/material/styles/createTransitions";
function MyQuestionaire() {
  const [show, setShow] = useState(false);
  const [arrayLenght, setArrayLenght] = useState(0);
  const [showTable, setShowTable] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  var [postsPerPage, setPostPerPage] = useState(10);
  const [totalDataLenght, setTotalDataLenght] = useState();
  const [sendTest, setSendTest] = useState(false);
  const [selectedId, setSelectedId] = useState(0);
  const [userDataToDisplay, setUserDataToDisplay] = useState({
    id: null,
    nameOfTest: "",
    NoOfQuestions: null,
    timeLimit: 0,
  });
  const [sendButtonDisable, setSendButtonDisable] = useState(true);
  var testArray = [];
  const [userDataArray, setUserDataArray] = useState([]);

  const [data, setData] = useState([]);

  const duplicateTest = (index) => {
    // Get the current row data
    const duplicatedTest = { ...data[index] };

    // Duplicate the data array and insert the duplicatedTest at the next index
    // const newData = [...data.slice(0, index + 1), duplicatedTest, ...data.slice(index + 1)];

    // Update the state with the new data
    // setData(newData);
    // console.log("duplicatedTest", duplicatedTest);
    apiCall("post", duplicateTestApi, { id: duplicatedTest.id }).then(
      (response) => {
        if (response.status == 200) {
          showToastMessage("Test duplicated Successfully", "green", 1);
          getTestData();
        } else {
          showToastMessage("Something went wrong", "red", 2);
        }
      }
    );
  };

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

  const paginate = ({ selected }) => {
    setCurrentPage(selected + 1);
  };

  const [dto, setDto] = useState({
    limit: postsPerPage,
    page: currentPage,
  });
  const getTestData = () => {
    apiCall("post", getMyTest, dto)
      .then((response) => {
        if (response.status == 200) {
          setData(response?.data?.data?.rows);
          setShowTable(true);
          setTotalDataLenght(response?.data?.data?.count);
        } else {
          setShowTable(false);
        }
      })
      .catch((err) => {
        setShowTable(false);
        console.log(err);
      });
  };

  useEffect(() => {
    getTestData();
  }, [currentPage]);

  const handleClose = () => setShow(false);

  const navigate = useNavigate();

  const sendTestButtonCapture = () => {
    sendButtonDisable
      ? alert("Please select at least one Test List")
      : setSendTest(true);
  };

  function searchParam(e) {
    console.log(e.target.value);
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    table = document.getElementById("myTable");
    tr = table.getElementsByTagName("tr");

    // Loop through all table rows, and hide those who don't match the search query
    for (i = 0; i < tr.length; i++) {
      td = tr[i].getElementsByTagName("td")[0];
      if (td) {
        txtValue = td.textContent || td.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
          tr[i].style.display = "";
        } else {
          tr[i].style.display = "none";
        }
      }
    }
  }

  function questionCount(ele) {
    console.log("data received", ele);
    var total = 0;
    Object.keys(ele.testObj).map(function (key, i) {
      Object.keys(ele.testObj[key]).map(function (questions, i) {
        ++total;
      });
    });
    return total;
  }
  function sendTestAndCheckboxFunctionality(data, e) {
    const name = data?.name;
    var obj = {
      id: data?.id,
      nameOfTest: data?.name,
      timeLimit: data?.timeLimit,
    };
    // alert(e.target.checked)
    if (e.target.checked) {
      obj = { ...obj, NoOfQuestions: questionCount(data) };
      // console.log("userDataToDisplay",data)

      // console.log("userDataToDisplay",obj)
      const newobj = { ...obj };
      testArray.push(newobj);
      setUserDataArray((oldArray) => [...oldArray, testArray]);
      setSendTest(true);
    } else {
      const indexx = testArray.indexOf(userDataToDisplay);
      testArray.splice(indexx, 1);
    }
    setArrayLenght(testArray.length);
  }

  function checkboxFunctionality(data, e) {
    const name = data?.name;
    var obj = {
      id: data?.id,
      nameOfTest: data?.name,
      timeLimit: data?.timeLimit,
    };
    // alert(e.target.checked)
    if (e.target.checked) {
      obj = { ...obj, NoOfQuestions: questionCount(data) };
      // console.log("userDataToDisplay",data)

      // console.log("userDataToDisplay",obj)
      const newobj = { ...obj };
      testArray.push(newobj);
      setUserDataArray((oldArray) => [...oldArray, testArray]);
      // console.log("newobj",newobj)
    } else {
      const indexx = testArray.indexOf(userDataToDisplay);
      testArray.splice(indexx, 1);
    }
    setArrayLenght(testArray.length);
  }
  const DeleteTest = (id) => {
    apiCall("post", deletemyTest, { id: id })
      .then((response) => {
        if (response.status == 200) {
          showToastMessage("Test Deleted Successfully", "green", 1);
          getTestData();
        } else {
          showToastMessage("Something went wrong", "red", 2);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    arrayLenght !== 0
      ? setSendButtonDisable(false)
      : setSendButtonDisable(true);
  }, [arrayLenght]);

  return (
    <>
      <div className="w-[90%] mx-auto">
        {sendTest === false ? (
          <div className="myquestionairemain">
            <div className="sm:pl-2 md:pl-5">
              <h1 style={{ padding: 0 }}>Tests List</h1>
              <Button
                className="w-full sm:w-1/4"
                variant="primary"
                onClick={() => {
                  navigate("/dashboard/mytest/createtest");
                }}
                style={{ position: "relative", right: "20px" }}
              >
                Create a new Test
              </Button>
              <input
                type="search"
                onChange={searchParam}
                placeholder="Search ... "
                className="searchInput"
                id="myInput"
                border-style="solid"
                border-width="1px"
              />

              <div className="overflow-x-auto my-4 w-full">
                <table className="w-full" class="table" id="myTable">
                  <thead>
                    <tr>
                      <th>Select</th>
                      <th>Sr No.</th>
                      <th>Name</th>
                      <th>No Of Questions</th>
                      <th>Time In Mins</th>
                      <th>Change</th>
                      <th>Single Send</th>
                      <th>Preview Test</th>

                      {/* <th>orientation</th>
                  <th>Introductory Message</th>
                  <th>Ending Message</th>
                  <th> Scoring Type</th>
                  <th> Random Order</th>
                  <th>Time Limit</th>
                 */}
                    </tr>
                  </thead>
                  <tbody>
                    {data.length > 0 &&
                      data.map((ele, index) => {
                        return (
                          <tr key={index}>
                            <td style={{ width: "1%" }}>
                              <input
                                type="checkbox"
                                onChange={(e) => {
                                  checkboxFunctionality(ele, e);
                                }}
                              />
                            </td>
                            <td>{index + 1}</td>
                            <td>{ele.name}</td>
                            <td>{questionCount(ele)}</td>
                            <td>{ele.timeLimit}</td>
                            <td>
                              <a
                                href={`/dashboard/mytest/edittest/?id=${ele?.id}`}
                                style={{ color: "blue" }}
                              >
                                Edit Test
                              </a>
                              |{" "}
                              <a
                                style={{
                                  cursor: "pointer",
                                  color: "blue",
                                  textDecoration: "underline",
                                }}
                                onClick={() => {
                                  DeleteTest(ele.id);
                                }}
                              >
                                Delete Test
                              </a>
                              <a
                                href="#"
                                style={{ color: "blue" }}
                                onClick={() => {
                                  duplicateTest(index);
                                }}
                              >
                                | Duplicate Test
                              </a>
                            </td>
                            <td>
                              <a
                                style={{
                                  cursor: "pointer",
                                  color: "blue",
                                  textDecoration: "underline",
                                }}
                                onClick={() => {
                                  sendTestAndCheckboxFunctionality(ele, {
                                    target: { checked: true },
                                  });
                                }}
                              >
                                Send This Test
                              </a>
                            </td>
                            <td>
                              <a
                                style={{
                                  cursor: "pointer",
                                  color: "blue",
                                  textDecoration: "underline",
                                }}
                                onClick={() => {
                                  navigate(`/preview/${ele?.id}`);
                                }}
                              >
                                Preview Test
                              </a>
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                  <div className="fixed w-full bg-white bottom-0 pb-3 ">
                    <div className="">
                      <button
                        onClick={(e) => {
                          sendTestButtonCapture();
                        }}
                        className="buttontest w-full"
                        disabled={sendButtonDisable}
                      >
                        Send Test
                      </button>
                    </div>
                  </div>
                </table>
              </div>
            </div>
          </div>
        ) : (
          <SendTestFunctionality testId={userDataArray} />
        )}
      </div>
    </>
  );
}
export default MyQuestionaire;
