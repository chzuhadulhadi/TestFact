import React, { useEffect, useState } from 'react';
import { Button, Table, TableBody, td, TableHead, tr, Checkbox, TextField, Dialog, DialogTitle, DialogContent, DialogActions, Typography } from '@mui/material'; // Import only the necessary components
import { apiCall } from '../../apiCalls/apiCalls';
import { useNavigate } from 'react-router-dom';
import { deleteTest, updateTest, getTests, transferTests, copyTest } from '../../apiCalls/apiRoutes';

function Tests() {
    const [tests, setTests] = useState([]);
    const [editTestDialogOpen, setEditTestDialogOpen] = useState(false);
    const [selectedTest, setSelectedTest] = useState(null);
    const [searchText, setSearchText] = useState('');
    const [selectedTests, setSelectedTests] = useState([]);
    const [email, setEmail] = useState('');
    const [open, setOpen] = useState(false);
    const [openCopy, setOpenCopy] = useState(false);

    const navigate = useNavigate();
    useEffect(() => {
        loadTests();
    }, []);

    const loadTests = () => {
        apiCall("post", getTests)
            .then((res) => {
                if (res.status === 200) {
                    setTests(res.data.data.rows);
                }
            })
            .catch((err) => {
                console.error(err);
            });
    };

    const handleEditTest = (test) => {
        navigate(`/admin/dashboard/tests/${test.id}`);
        setSelectedTest({ ...test });
        setEditTestDialogOpen(true);
    };
    const handleDeleteTest = (testId) => {
        apiCall("post", deleteTest, { id: testId })
            .then((res) => {
                if (res.status === 200) {
                    loadTests();
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
        if (selectedTests.includes(testId)) {
            // If the test is already selected, remove it from the selection
            setSelectedTests(selectedTests.filter(id => id !== testId));
        } else {
            // If the test is not selected, add it to the selection
            setSelectedTests([...selectedTests, testId]);
        }
    };

    const handleSaveTest = () => {
        apiCall("post", updateTest, selectedTest)
            .then((res) => {
                if (res.status === 200) {
                    loadTests();
                }
            }).catch((err) => {
                console.error(err);
            });
        // Placeholder for saving edited Test data
        console.log(`Save edited Test with ID ${selectedTest.id}`);
        // Close the edit dialog
        handleCloseEditTestDialog();
    };
    const TransferTest = () => {
        console.log('here');
        apiCall("post", transferTests, { ids: selectedTests, email: email })
            .then((res) => {
                if (res.status === 200) {
                    loadTests();
                }
                setOpen(false)
            }).catch((err) => {
                console.error(err);
            });
    };
    const CopyTest = () => {
        apiCall("post", copyTest, { ids: selectedTests, email: email })
            .then((res) => {
                if (res.status === 200) {
                    loadTests();
                }
                setOpen(false)
            }).catch((err) => {
                console.error(err);
            });
    };
    const handleSearch = (e) => {
        setSearchText(e.target.value);
    };

    const filteredTests = tests.filter((test) => {
        return (
            test.name.toLowerCase().includes(searchText.toLowerCase())
        );
    });

    return (
        <div className='w-[90%] mx-auto'>
            <Dialog open={open} >
                <DialogTitle id="form-dialog-title">Transfer To:</DialogTitle>
                <DialogContent>
                    <TextField
                        onChange={(e) => setEmail(e.target.value)}
                        autoFocus
                        margin="dense"
                        id="email"
                        label="Email Address"
                        type="email"
                        fullWidth
                        
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => { setOpen(false) }}>Cancel</Button>
                    <Button onClick={TransferTest}>Save</Button>
                </DialogActions>
            </Dialog>

            <Dialog open={openCopy}>
                <DialogTitle id="form-dialog-title">Copy To:</DialogTitle>
                <DialogContent>
                    <TextField
                        onChange={(e) => setEmail(e.target.value)}
                        autoFocus
                        margin="dense"
                        id="email"
                        label="Email Address"
                        type="email"
                        fullWidth
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => { setOpenCopy(false) }}>Cancel</Button>
                    <Button onClick={CopyTest}>Save</Button>
                </DialogActions>
            </Dialog>

            <Typography variant='h2' justifyContent={'center'} display={'flex'}>Test List</Typography>
            <TextField
                label="Search"
                variant="outlined"
                fullWidth
                value={searchText}
                onChange={handleSearch}
            />
      <div className='flex gap-3 my-4'>
      <Button onClick={() => { selectedTests.length < 1 ? alert('select a test first') : setOpen(!open) }} className='w-1/4'  >Transfer selected test</Button>
            <Button onClick={() => { selectedTests.length < 1 ? alert('select a test first') : setOpenCopy(!openCopy) }} className='w-1/4' >Copy selected test</Button> 
      </div>
            <Table my={2} sx={{ position: 'relative', borderCollapse: 'collapse' }}>
                <TableHead sx={{
                    position: 'sticky',
                    top: 0,
                }}>
                    <th style={{ textAlign: 'center' }}>Select</th>
                    <th style={{ textAlign: 'center' }}>#</th>
                    <th style={{ textAlign: 'center' }}>Name</th>
                    <th style={{ textAlign: 'center' }}>Time</th>
                    <th style={{ textAlign: 'center' }}>Created At</th>
                    <th style={{ textAlign: 'center' }}>Owner</th>
                    <th style={{ textAlign: 'center' }}>Actions</th>
                </TableHead>
                <TableBody>
                    {filteredTests.map((test, index) => (
                        <tr key={test.id}>
                            <td>
                                <Checkbox
                                    checked={selectedTests.includes(test.id)}
                                    onChange={() => handleToggleSelect(test.id)}
                                />
                            </td>
                            <td>{index + 1}</td>
                            <td>{test.name}</td>
                            <td>{test.timeLimit}</td>
                            <td>{new Date(test.createdAt).toLocaleDateString()}</td>
                            <td>{test.createdByEmail}</td>
                            <td>
                               <div className='flex w-[80%] mx-auto gap-2 pt-2'>
                               <button 
                                    variant="text"
                                    onClick={() => handleEditTest(test)}
                                >
                                    Edit
                                </button>
                                <button
                                    variant="text"
                                    onClick={() => handleDeleteTest(test.id)}
                                >
                                    Delete
                                </button> 
                               </div>
                            </td>
                        </tr>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}

export default Tests;
