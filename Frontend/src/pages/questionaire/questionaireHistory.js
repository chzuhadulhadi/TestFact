import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import {
  getQuestionaireHistoryList,
  getResult,
} from "../../apiCalls/apiRoutes";
import { apiCall } from "../../apiCalls/apiCalls";
import { frontEndPath } from "../../apiCalls/apiRoutes";

import * as XLSX from "xlsx";

function QuestionaireHistory() {
  const [currentPage, setCurrentPage] = useState(1);
  var [postsPerPage, setPostPerPage] = useState(10);
  const [totalDataLenght, setTotalDataLenght] = useState();
  const [currentRecords, setCurrentRecord] = useState([]);
  const [dto, seDto] = useState({
    limit: 10,
    page: 1,
  });
  const date = new Date();
  const [selectedField, setSelectedField] = useState(1);

  const [resultsWithIds, setResultsWithIds] = useState({});

  function searchParam() {
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    table = document.getElementById("myTable");
    tr = table.getElementsByTagName("tr");

    // Loop through all table rows, and hide those who don't match the search query
    for (i = 0; i < tr.length; i++) {
      td = tr[i].getElementsByTagName("td")[selectedField];
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

  function getAllHistoryListing() {
    apiCall("post", getQuestionaireHistoryList, dto, true)
      .then((res) => {
        setTotalDataLenght(res?.data?.data?.count);
        setCurrentRecord(res?.data?.data?.rows);
        getResultScore(res?.data?.data?.rows);
      })
      .catch((er) => console.log);
  }
  useEffect(() => {
    getAllHistoryListing();
  }, []);

  const paginate = ({ selected }) => {
    setCurrentPage(selected + 1);
  };
  function getTestStatus(testObj) {
    var status = "";
    if (testObj.testStart == null) {
      status = "Test Not started";
    } else if (testObj.testStart != null && testObj.testEnd == null) {
      status = "Test Started";
    } else if (testObj.testStart != null && testObj.testEnd != null) {
      status = "Test Ended";
    }
    return status;
  }

  async function getResultScore(allRows) {
    for (let singleRow of allRows) {
      apiCall("post", getResult, { id: singleRow.id }).then((res) => {
        if (res.status == 200) {
          const data = res.data.data;

          if (data.id && data.resultStats) {
            // console.log("data.resultStats", data.resultStats)
            setResultsWithIds((prevState) => {
              let name = Object.assign({}, prevState); // creating copy of state variable jasper
              name[singleRow.id] = (
                data.resultStats?.totalPercentage /
                data.resultStats?.totalCategories
              ).toFixed(1);

              return name; // return new object jasper object
            });
            // console.log("res", resultsWithIds);
          }
        }
      });
    }
  }
  console.log(frontEndPath + "filltest/" + "232423");

  function downloadExcel() {
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.table_to_sheet(document.getElementById("myTable"));
    XLSX.utils.book_append_sheet(wb, ws, "TestHistory");
    XLSX.writeFile(wb, "TestHistory.xlsx");
  }

  return (
    <div className="questionaireHistory sm:pl-3 md:pl-8 w-[90%] mx-auto">
      <div className="my-3 flex sm:gap-x-24 lg:gap-x-72">
        <button
          className="w-1/2 md:w-1/4"
          style={{ position: "relative", right: "20px" }}
          onClick={downloadExcel}
        >
          Download Excel
        </button>
        <input
          type="text"
          style={{ height: "37px" }}
          placeholder="Search ..."
          id="myInput"
          onChange={searchParam}
        />
        <select
          style={{ height: "37px", marginLeft: "10px" }}
          onChange={(e) => {
            setSelectedField(e.target.value);
          }}
        >
          <option value="1">Name</option>
          <option value="2">Date created</option>
          <option value="3">Analytics</option>
        </select>
      </div>
      <div className="overflow-x-auto w-full">
        <table className="table" id="myTable">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Date</th>
              <th scope="col">Test Link</th>
              <th scope="col">Time Taken</th>
              <th scope="col">Status</th>
              <th scope="col">Score</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentRecords?.map((ele, index) => {
              var tempElement = document.createElement("div");
              tempElement.innerHTML = ele.landingPageData?.html;
              console.log(ele.landingPageData);
              var firstText = tempElement
                .querySelector("#mainNav1")
                ?.textContent?.trim();
              console.log("firstText", firstText);
              return (
                <tr key={index}>
                  <td style={{ fontSize: "14px" }}>
                    {ele?.number || index + 1}
                  </td>
                  <td style={{ fontSize: "14px" }}>
                    {ele.name}
                    {firstText ? (
                      <>
                        <br />
                        (Landing Page:{firstText})
                      </>
                    ) : (
                      ""
                    )}
                  </td>
                  <td style={{ fontSize: "14px" }}>{ele.userEmail}</td>
                  <td style={{ fontSize: "14px" }}>
                    {new Date(ele.createdAt)
                      .toLocaleDateString()
                      .padStart(10, "0")}
                  </td>
                  <td style={{ fontSize: "14px" }}>
                    <a
                      target="blank"
                      style={{ textDecoration: "underline" }}
                      href={frontEndPath + "filltest/" + ele.id}
                    >
                      Test Link
                    </a>
                  </td>
                  <td style={{ fontSize: "14px" }}>
                    {(
                      Math.abs(
                        new Date(ele.testEnd) - new Date(ele.testStart)
                      ) /
                      1000 /
                      60
                    ).toFixed(2)}{" "}
                    Min
                  </td>
                  {/* {console.log("getResultScore(ele.id) ", getResultScore(ele.id))}
                  {console.log("getTestStatus(ele)(ele.id) ", getTestStatus(ele))} */}

                  <td style={{ fontSize: "14px" }}>{getTestStatus(ele)}</td>
                  <td style={{ fontSize: "14px" }}>
                    {!isNaN(resultsWithIds[ele.id])
                      ? resultsWithIds[ele.id]
                      : "0.0"}{" "}
                    %
                  </td>

                  {/* <td style={{fontSize:'14px'}}>{ele.orientation}</td> */}
                  {/* <td style={{fontSize:'14px'}}>{ele.timeLimit}</td> */}
                  {/* <td style={{fontSize:'14px'}}>View | Edit | Delete</td>
                   */}
                  <td style={{ fontSize: "14px" }}>
                    <a
                      target="blank"
                      style={{ textDecoration: "underline" }}
                      href={"/resultpage/" + ele.id}
                    >
                      See Results
                    </a>
                  </td>
                </tr>
              );
            })}
          </tbody>
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
  );
}
export default QuestionaireHistory;
