import "./style.css";
import { apiCall } from "../../apiCalls/apiCalls";
import Modal from "react-bootstrap/Modal";
import {
  getLandingPage,
  updateLandingPage,
  deleteLandingPage,
  getMailingList,
  getMyTest,
  linkTest,
  viewAttachedTests,
  pathToViewTest,
  frontEndPath,
} from "../../apiCalls/apiRoutes";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useRoutes } from "react-router-dom";
import ReactPaginate from "react-paginate";
function Paper() {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [MailingListDTO, setMailingListDTO] = useState({
    limit: 10,
    page: 1,
  });
  const [getAllTestsAttached, setGetAllTestsAttached] = useState({
    limit: 10,
    page: 1,
    id: 1,
  });
  const [modalHandler, setModalHandler] = useState("");
  const [modalTitle, setModalTitle] = useState("");
  const [elementId, setElementId] = useState("");
  const [responseMailingList, setResponseMailingList] = useState([]);
  const [allLandingPages, setAllLandingPages] = useState([]);
  const [rendControl, setRendControl] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  var [postsPerPage, setPostPerPage] = useState(10);
  const [totalDataLenght, setTotalDataLenght] = useState(10);
  const [currentRecords, setCurrentRecord] = useState([]);
  const [isEdit, setIsEdit] = useState({});
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

  const getAllLandingPages = () => {
    apiCall(
      "post",
      getLandingPage,
      {
        limit: postsPerPage,
        page: currentPage,
      },
      true
    )
      .then((res) => {
        setAllLandingPages(res.data.data.rows);
        setTotalDataLenght(res.data.data.count);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getMailingListData = () => {
    apiCall("post", getMyTest, MailingListDTO, true)
      .then((res) => {
        setResponseMailingList(res?.data?.data?.rows);
        setTotalDataLenght(res?.data?.data?.count);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getAllLandingPages();
  }, [rendControl, currentPage]);

  useEffect(() => {
    getMailingListData();
  }, [rendControl]);

  const getAllAttachedTest = async () => {
    apiCall("post", viewAttachedTests, getAllTestsAttached, true)
      .then((res) => {
        console.log(res.data.data.rows, "dadii");
        setCurrentRecord(res?.data?.data?.rows);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteModal = () => {
    return (
      <Modal.Body>
        <h3>Are you sure ? </h3>
        <button
          onClick={() => {
            deleteLandingPageFunction();
          }}
        >
          Yes
        </button>{" "}
        <button
          onClick={() => {
            setShow(false);
          }}
        >
          No
        </button>
      </Modal.Body>
    );
  };
  var array = [];
  const checkboxFunctionality = (e) => {
    if (e.target.checked) {
      array.push(e.target.id);
    } else {
      const indexs = array.indexOf(e.target.id);
      array.splice(indexs, 1);
    }
  };

  const showAttachedTestModal = () => {
    return (
      <Modal.Body>
        <h3>List of attached tests </h3>
        <table style={{ width: "100%" }}>
          <thead>
            <tr style={{ textAlign: "center" }}>
              <th>No</th>
              <th>User</th>
              <th>Email Id</th>
              <th>Link</th>
            </tr>
          </thead>
          <tbody>
            {currentRecords.length !== 0 ? (
              currentRecords.map((ele, index) => {
                console.log(ele, "pop");
                const url = pathToViewTest + "/" + ele?.userTest?.id;
                return (
                  <tr key={index}>
                    <td>{index} </td>
                    <td>{ele?.userTest?.user?.fullName} </td>
                    <td>{ele?.userTest?.user?.email}</td>
                    <td
                      style={{ color: "blue", cursor: "pointer" }}
                      onClick={() => {
                        window.location.replace(url);
                      }}
                    >
                      {url}
                    </td>
                  </tr>
                );
              })
            ) : (
              <p>No attached Test</p>
            )}
          </tbody>
        </table>

        <button
          onClick={() => {
            setShow(false);
          }}
        >
          Cancel
        </button>
      </Modal.Body>
    );
  };

  const showModalForLink = () => {
    return (
      <Modal.Body>
        <h3>Select the test </h3>
        {responseMailingList.length ? (
          responseMailingList.map((res) => {
            console.log(res);
            return (
              <>
                <div className="w-[90%] mx-auto">
                  <label>
                    <input
                      type="checkbox"
                      onChange={checkboxFunctionality}
                      id={res.id}
                    />
                    {res?.name}{" "}
                  </label>
                </div>
                <br />
              </>
            );
          })
        ) : (
          <div></div>
        )}
        <button
          onClick={() => {
            if (array == []) {
              showToastMessage("Please select one Test", "red", 2);
            } else if (array.length > 1) {
              showToastMessage("Please select only one Test", "red", 2);
            } else {
              setShow(false);
              apiCall(
                "post",
                linkTest,
                { testId: array[0], id: elementId },
                true
              )
                .then((res) => {
                  showToastMessage("Linked Successfully", "green", 1);
                })
                .catch((err) => {
                  showToastMessage(err?.response?.data?.message, "red", 2);
                });
            }
          }}
        >
          Save
        </button>
        <button
          onClick={() => {
            setShow(false);
          }}
        >
          Cancel
        </button>
      </Modal.Body>
    );
  };

  const editLandingPage = () => {
    apiCall("post", updateLandingPage, { id: elementId }, true)
      .then((res) => {
        console.log(res);
        showToastMessage("Landing page updated Successfully ", "green", 1);

        setRendControl(!rendControl);
      })
      .catch((err) => {
        showToastMessage(err?.response?.data?.message, "red", 2);
      });
  };

  const deleteLandingPageFunction = () => {
    apiCall("post", deleteLandingPage, { id: elementId }, true)
      .then((res) => {
        console.log(res);
        showToastMessage("Landing page deleted Successfully ", "green", 1);
        setRendControl(!rendControl);
        setShow(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const selectChangeFunctionality = (e) => {
    console.log(e.target.id);
    console.log(e.target.value);
  };
  const showFunction = (param) => {
    document.getElementById("htmlDiv").innerHTML = param;
  };

  var element = document.getElementsByName("formfieldDynamic");
  if (element) {
    console.log(element);
  }

  const editModal = () => {
    return <Modal.Body></Modal.Body>;
  };

  return (
    <div className="sm:pl-3 md:pl-8 w-[90%] mx-auto">
      <h1>Landing Pages</h1>

      <button
        className="w-1/2 md:w-1/4"
        style={{ position: "relative", right: "20px" }}
        onClick={() => {
          navigate("/dashboard/landingpage");
        }}
      >
        Create Landing page
      </button>
      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>{modalTitle}</Modal.Title>
        </Modal.Header>
        {modalHandler == "deleteModal" && deleteModal()}
        {modalHandler == "editModal" && editModal()}
        {modalHandler == "linkModal" && showModalForLink()}
        {modalHandler == "showAttachedTestModal" && showAttachedTestModal()}
      </Modal>
      <div>
        <div className="overflow-x-auto w-full">
          <table
            className="table"
            style={{ borderSpacing: "0 15px", borderCollapse: "separate" }}
          >
            <thead>
              <tr>
                <th style={{ textAlign: "center" }} scope="col">
                  No
                </th>
                <th style={{ textAlign: "center" }} scope="col">
                  Name
                </th>
                <th style={{ textAlign: "center" }} scope="col">
                  Test Actions
                </th>
                <th style={{ textAlign: "center" }} scope="col">
                  Landing Page Actions
                </th>
                <th style={{ textAlign: "center" }} scope="col">
                  Landing Page Link
                </th>
                <th style={{ textAlign: "center" }} scope="col">
                  Landing Page Form
                </th>
              </tr>
            </thead>
            {allLandingPages.map((ele, index) => {
              var tempElement = document.createElement("div");
              tempElement.innerHTML = ele?.html;
              var firstText = tempElement
                .querySelector("#mainNav1")
                ?.textContent?.trim();
              return (
                <tr key={index}>
                  <td style={{ fontSize: "16px" }}>{index + 1}</td>
                  <td style={{ fontSize: "16px" }}>{firstText}</td>
                  <td style={{ fontSize: "16px" }}>
                    <span
                      style={{
                        background: "#FF9000",
                        margin: "5px",
                        cursor: "pointer",
                        color: "white",
                      }}
                      onClick={() => {
                        setModalHandler("linkModal");
                        setShow(true);
                        setElementId(ele.id);
                        setModalTitle("Link the landing page to a test");
                      }}
                    >
                      Link
                    </span>
                  </td>
                  <td style={{ fontSize: "16px" }}>
                    <span
                      style={{
                        background: "#FF9000",
                        margin: "5px",
                        cursor: "pointer",
                        color: "white",
                      }}
                      onClick={() => {
                        setModalHandler("deleteModal");
                        setShow(true);
                        setElementId(ele.id);
                        setModalTitle("Delete an entry ?");
                      }}
                    >
                      Delete
                    </span>
                    <span
                      style={{
                        background: "#FF9000",
                        margin: "5px",
                        cursor: "pointer",
                        color: "white",
                      }}
                      onClick={() => {
                        navigate(`/dashboard/editLandingPage/?id=${ele?.id}`);
                      }}
                    >
                      Edit
                    </span>
                    {/* <span style={{ background: '#FF9000', margin: '10px', cursor: 'pointer', color: 'white' }}
                    onClick={() => {
                      navigate(`/landingpage/?id=${ele?.id}`);
                    }}
                  >
                    View
                  </span> */}
                  </td>
                  <td>
                    {frontEndPath}landingpage/?id={ele?.id}
                    <span
                      style={{
                        background: "#FF9000",
                        margin: "10px",
                        cursor: "pointer",
                        color: "white",
                      }}
                      onClick={() => {
                        navigator.clipboard.writeText(
                          `${frontEndPath}landingpage/?id=${ele?.id}`
                        );
                        showToastMessage("Copied Successfully", "green", 1);
                      }}
                    >
                      Copy
                    </span>
                  </td>
                  <td>
                    {frontEndPath}landingpageform/?id={ele?.id}
                    <span
                      style={{
                        background: "#FF9000",
                        margin: "10px",
                        cursor: "pointer",
                        color: "white",
                      }}
                      onClick={() => {
                        navigator.clipboard.writeText(
                          `${frontEndPath}landingpageform/?id=${ele?.id}`
                        );
                        showToastMessage("Copied Successfully", "green", 1);
                      }}
                    >
                      Copy
                    </span>
                  </td>
                </tr>
              );
            })}
          </table>
        </div>
        {totalDataLenght > postsPerPage && (
          <ReactPaginate
            onPageChange={paginate}
            pageCount={Math.ceil(totalDataLenght / postsPerPage)}
            previousLabel={"<"}
            nextLabel={">"}
            containerClassName={"pagination"}
            pageLinkClassName={"page-number"}
            previousLinkClassName={"page-number"}
            nextLinkClassName={"page-number"}
            activeLinkClassName={"active"}
          />
        )}
      </div>

      <div id="htmlDiv"></div>
    </div>
  );
}
export default Paper;
