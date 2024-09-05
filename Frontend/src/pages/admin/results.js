import React, { useEffect, useState } from "react";
import {
  Button,
  Table,
  TableBody,
  td,
  TableHead,
  TableRow,
  Checkbox,
  TextField,
  Typography,
} from "@mui/material"; // Import only the necessary components
import { apiCall } from "../../apiCalls/apiCalls";
import { Link, useNavigate } from "react-router-dom";
import {
  deleteTest,
  updateTest,
  getResults,
  frontEndPath,
  local,
} from "../../apiCalls/apiRoutes";

function Results() {
  const [results, setResults] = useState([]);
  const [editTestDialogOpen, setEditTestDialogOpen] = useState(false);
  const [selectedTest, setSelectedTest] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [selectedResults, setSelectedResults] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    // check from local   Storage is results are already loaded
    const results = localStorage.getItem("results");
    if (results) {
      setResults(JSON.parse(results));
    } else {
      //call loadResults and cache results in local storage
      loadResults();
    }
  }, []);

  const loadResults = () => {
    apiCall("post", getResults)
      .then((res) => {
        if (res.status === 200) {
          setResults(res.data.data);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleEditTest = (test) => {
    // navigate(`/admin/dashboard/results/${test.id}`);
    setSelectedTest({ ...test });
    setEditTestDialogOpen(true);
  };
  const handleDeleteTest = (testId) => {
    apiCall("post", deleteTest, { id: testId })
      .then((res) => {
        if (res.status === 200) {
          loadResults();
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleCloseEditTestDialog = () => {
    setEditTestDialogOpen(false);
  };

  const handleToggleSelect = (testId) => {
    if (selectedResults.includes(testId)) {
      // If the test is already selected, remove it from the selection
      setSelectedResults(selectedResults.filter((id) => id !== testId));
    } else {
      // If the test is not selected, add it to the selection
      setSelectedResults([...selectedResults, testId]);
    }
  };

  const handleSaveTest = () => {
    apiCall("post", updateTest, selectedTest)
      .then((res) => {
        if (res.status === 200) {
          loadResults();
        }
      })
      .catch((err) => {
        console.error(err);
      });
    // Placeholder for saving edited Test data
    console.log(`Save edited Test with ID ${selectedTest.id}`);
    // Close the edit dialog
    handleCloseEditTestDialog();
  };

  const handleSearch = (e) => {
    setSearchText(e.target.value);
  };
  const sortedResults = results.sort(
    (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)
  );

  // const filteredResults = results?.filter((test) => {
  //     return (
  //         results.name.toLowerCase().includes(searchText.toLowerCase())
  //     );
  // });

  return (
    <div className="w-[90%] mx-auto">
      <br />
      <br />
      <Typography variant="h2" sx={{ textAlign: "center" }}>
        Result List
      </Typography>

      <TextField
        className="mb-3"
        label="Search"
        variant="outlined"
        fullWidth
        value={searchText}
        onChange={handleSearch}
      />

      <div className="overflow-x-auto w-full">
        <Table my={2} sx={{ position: "relative", borderCollapse: "collapse" }}>
          <TableHead
            sx={{
              position: "sticky",
              top: 0,
            }}
          >
            <TableRow>
              <th style={{ textAlign: "center" }}>Sr No.</th>
              <th style={{ textAlign: "center" }}>Name</th>
              <th style={{ textAlign: "center" }}>Test Owner</th>
              <th style={{ textAlign: "center" }}>total Question</th>
              <th style={{ textAlign: "center" }}>total Answer</th>
              <th style={{ textAlign: "center" }}>Examinee</th>
              <th style={{ textAlign: "center" }}>Date of Test</th>
              <th>status</th>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedResults?.map((test, index) => (
              <TableRow key={test.id}>
                <td>{test?.number || index + 1}</td>
                <td>{test.name}</td>
                <td>{test.owner}</td>
                <td>{test.resultStats.totalQuestion}</td>
                <td>{test.resultStats.totalAnswer}</td>
                <td>{test.userEmail}</td>
                <td>{new Date(test.updatedAt).toLocaleDateString()}</td>
                <td>
                  <a href={frontEndPath + "resultpage/" + test.id}>show</a>
                </td>
                {/* <td>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <td>Category</td>
                                            <td>Percentage</td>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {test.result.map((resultItem, resultIndex) => (
                                            <TableRow key={resultIndex}>
                                                <td>{resultItem.category}</td>
                                                <td>{resultItem.percentage}</td>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </td> */}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

export default Results;
