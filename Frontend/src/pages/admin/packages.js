import React, { useEffect, useState } from "react";
import {
  Button,
  Table,
  TableBody,
  td,
  TableHead,
  Typography,
  TableRow,
  TableContainer,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  InputLabel,
  Select,
  FormControl,
  Grid,
  Modal,
} from "@mui/material";
import { apiCall } from "../../apiCalls/apiCalls";
import {
  getPackage,
  deletePackage,
  updatePackage,
  createPackage,
} from "../../apiCalls/apiRoutes";

function Packages() {
  const [packages, setPackages] = useState([]);
  const [editPackageDialogOpen, setEditPackageDialogOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [open, setOpen] = useState(false);
  console.log(packages);
  const [packageData, setPackageData] = useState({
    packageName: "",
    packagePrice: "",
    packageDuration: "",
    numberOfTests: "",
    support: "",
  });
  useEffect(() => {
    loadPackages();
  }, []);

  const loadPackages = () => {
    apiCall("post", getPackage)
      .then((res) => {
        if (res.status === 200) {
          setPackages(res.data.data);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleEditPackage = (user) => {
    setSelectedPackage({ ...user }); // Copy the user data
    setEditPackageDialogOpen(true);
  };

  const handleCloseEditPackageDialog = () => {
    setEditPackageDialogOpen(false);
  };

  const handleFieldChange = (e) => {
    const { name, value } = e.target;
    setSelectedPackage({
      ...selectedPackage,
      [name]: value,
    });
  };

  const handleSavePackage = () => {
    apiCall("post", updatePackage, selectedPackage)
      .then((res) => {
        if (res.status === 200) {
          loadPackages();
        }
      })
      .catch((err) => {
        console.error(err);
      });
    // Placeholder for saving edited user data
    console.log(`Save edited user with ID ${selectedPackage.id}`);
    // Close the edit dialog
    handleCloseEditPackageDialog();
  };

  const handleSearch = (e) => {
    setSearchText(e.target.value);
  };
  const handleDeletePackage = (id) => {
    apiCall("post", deletePackage, { id })
      .then((res) => {
        if (res.status === 200) {
          loadPackages();
        }
      })
      .catch((err) => {
        console.error(err);
      });

    console.log(`Delete user with ID ${id}`);
  };

  const filteredPackages = packages.filter((user) => {
    return user.packageName.toLowerCase().includes(searchText.toLowerCase());
  });
  console.log(filteredPackages);
  return (
    <div className="w-[90%] mx-auto">
      <br />
      <br />
      <Typography
        className="mb-3 text-xl md:text-3xl"
        variant="h2"
        justifyContent={"center"}
        display={"flex"}
      >
        Package List
      </Typography>
      <TextField
        label="Search"
        variant="outlined"
        fullWidth
        value={searchText}
        onChange={handleSearch}
      />
      <Button className="w-1/4 my-3" onClick={() => setOpen(true)}>
        Create Package
      </Button>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            padding: "10px",
            transform: "translate(-50%, -50%)",
            width: "400px",
            bgcolor: "white",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
            background: "white",
          }}
        >
          <Typography id="modal-modal-description" sx={{ mt: 1 }}>
            Package Name
          </Typography>
          <TextField
            variant="outlined"
            fullWidth
            onChange={(e) =>
              setPackageData({ ...packageData, packageName: e.target.value })
            }
            my={2}
          />
          <Typography id="modal-modal-description" sx={{ mt: 1 }}>
            Package Price in $
          </Typography>
          <TextField
            variant="outlined"
            fullWidth
            onChange={(e) =>
              setPackageData({ ...packageData, packagePrice: e.target.value })
            }
            my={2}
          />
          <Typography id="modal-modal-description" sx={{ mt: 1 }}>
            Package Duration in days
          </Typography>
          <TextField
            variant="outlined"
            fullWidth
            onChange={(e) =>
              setPackageData({
                ...packageData,
                packageDuration: e.target.value,
              })
            }
            my={2}
          />
          <Typography id="modal-modal-description" sx={{ mt: 1 }}>
            Number Of Tests
          </Typography>
          <TextField
            variant="outlined"
            fullWidth
            onChange={(e) =>
              setPackageData({
                ...packageData,
                numberOfTests: e.target.value,
              })
            }
            my={2}
          />
          <Typography id="modal-modal-description" sx={{ mt: 1 }}>
            Description Lines
          </Typography>
          <TextField
            variant="outlined"
            fullWidth
            onChange={(e) =>
              setPackageData({ ...packageData, support: e.target.value })
            }
            my={2}
          />
          <div className="flex gap-4 py-2 justify-end">
            <Button onClick={() => setOpen(false)}>Cancel</Button>
            <Button
              onClick={() => {
                apiCall("post", createPackage, packageData)
                  .then((res) => {
                    if (res.status === 200) {
                      loadPackages();
                    }
                  })
                  .catch((err) => {
                    console.error(err);
                  });
                setOpen(false);
              }}
            >
              Create
            </Button>
          </div>
        </div>
      </Modal>
      <div className="overflow-x-auto w-full">
        <Table my={2} sx={{ position: "relative", borderCollapse: "collapse" }}>
          <TableHead
            sx={{
              position: "sticky",
              top: 0,
            }}
          >
            <TableRow sx={{ position: "sticky" }}>
              <th style={{ textAlign: "center" }}>#</th>
              <th style={{ textAlign: "center" }}>Package Name</th>
              <th style={{ textAlign: "center" }}>Package Price</th>
              <th style={{ textAlign: "center" }}>Package Duration</th>
              <th style={{ textAlign: "center" }}>Number Of Tests</th>
              <th style={{ textAlign: "center" }}> Description Lines</th>
              <th style={{ textAlign: "center" }}> Actions</th>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredPackages.map((user) => (
              <TableRow key={user.id}>
                <td>{user.id}</td>
                <td>{user.packageName}</td>
                <td>
                  {"$"}
                  {user.packagePrice}
                </td>
                <td>
                  {user.packageDuration}
                  {" days"}
                </td>
                <td>{user.numberOfTests}</td>
                <td>{user.support}</td>
                <td>
                  <div className="w-[80%] mx-auto flex gap-2 pt-2">
                    <button
                      variant="text"
                      onClick={() => handleEditPackage(user)}
                    >
                      Edit
                    </button>

                    <button
                      variant="text"
                      onClick={() => handleDeletePackage(user.id)}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <Dialog
        open={editPackageDialogOpen}
        onClose={handleCloseEditPackageDialog}
      >
        <DialogTitle>Edit Package</DialogTitle>
        <DialogContent style={{ minWidth: "500px" }}>
          {selectedPackage && (
            <>
              <Typography id="modal-modal-description" sx={{ mt: 1 }}>
                Package Name
              </Typography>
              <TextField
                autoFocus
                margin="dense"
                name="packageName"
                type="text"
                fullWidth
                value={selectedPackage.packageName}
                onChange={handleFieldChange}
              />
              <Typography id="modal-modal-description" sx={{ mt: 1 }}>
                Package Price
              </Typography>
              <TextField
                autoFocus
                margin="dense"
                name="packagePrice"
                type="text"
                fullWidth
                value={selectedPackage.packagePrice}
                onChange={handleFieldChange}
              />
              <Typography id="modal-modal-description" sx={{ mt: 1 }}>
                Package Duration
              </Typography>
              <TextField
                autoFocus
                margin="dense"
                name="packageDuration"
                type="text"
                fullWidth
                value={selectedPackage.packageDuration}
                onChange={handleFieldChange}
              />
              <Typography id="modal-modal-description" sx={{ mt: 1 }}>
                Number Of Tests
              </Typography>
              <TextField
                autoFocus
                margin="dense"
                name="numberOfTests"
                type="text"
                fullWidth
                value={selectedPackage.numberOfTests}
                onChange={handleFieldChange}
              />
              <Typography id="modal-modal-description" sx={{ mt: 1 }}>
                Description Lines
              </Typography>
              <TextField
                autoFocus
                margin="dense"
                type="text"
                fullWidth
                value={selectedPackage.support}
                onChange={handleFieldChange}
              />
            </>
          )}
        </DialogContent>

        <DialogActions>
          <Button onClick={handleCloseEditPackageDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSavePackage} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default Packages;
