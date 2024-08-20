import React, { useEffect, useState } from 'react';
import { Button, Table, TableBody, td, TableHead,Typography, TableRow,TableContainer, Dialog, DialogTitle, DialogContent, DialogActions, TextField, MenuItem, InputLabel, Select, FormControl, Grid } from '@mui/material';
import { apiCall } from '../../apiCalls/apiCalls';
import { getUsers, deleteUser, updateUser } from '../../apiCalls/apiRoutes';

function Users() {
    const [users, setUsers] = useState([]);
    const [editUserDialogOpen, setEditUserDialogOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [searchText, setSearchText] = useState('');

    useEffect(() => {
        loadUsers();
    }, []);

    const loadUsers = () => {
        apiCall("post", getUsers)
            .then((res) => {
                if (res.status === 200) {
                    setUsers(res.data.data);
                }
            })
            .catch((err) => {
                console.error(err);
            });
    };

    const handleEditUser = (user) => {
        const userPackage = user?.package?.payment;
        if(userPackage){
            setSelectedUser({
                ...user,
                remainingTests: userPackage.RemainingNumberOfTests,
                expireDate: userPackage.expireDate,
            });
        }
        else{
        setSelectedUser({ ...user }); 
        }
        setEditUserDialogOpen(true);
    };

    const handleCloseEditUserDialog = () => {
        setEditUserDialogOpen(false);
    };

    const handleFieldChange = (e) => {
        const { name, value } = e.target;
        setSelectedUser({
            ...selectedUser,
            [name]: value,
        });
    };

    const handleSaveUser = () => {
        apiCall("post", updateUser, selectedUser)
            .then((res) => {
                if (res.status === 200) {
                    loadUsers();
                }
            }).catch((err) => {
                console.error(err);
            });
        // Placeholder for saving edited user data
        console.log(`Save edited user with ID ${selectedUser.id}`);
        // Close the edit dialog
        handleCloseEditUserDialog();
    };

    const handleSearch = (e) => {
        setSearchText(e.target.value);
    };
    const handleDeleteUser = (id) => {
        apiCall("post", deleteUser, { id })
            .then((res) => {
                if (res.status === 200) {
                    loadUsers();
                }
            }).catch((err) => {
                console.error(err);
            });

        console.log(`Delete user with ID ${id}`);
    };

    const filteredUsers = users.filter((user) => {
        return (
            user.fullName.toLowerCase().includes(searchText.toLowerCase()) ||
            user.email.toLowerCase().includes(searchText.toLowerCase())
        );
    });
    console.log(filteredUsers);
    return (
        <div className='w-[90%] mx-auto'>
         <Typography variant='h2' justifyContent={'center'} display={'flex'}>User List</Typography>
            <TextField className='mb-3'
                label="Search"
                variant="outlined"
                fullWidth
                value={searchText}
                onChange={handleSearch}
            />
           
                <Table my={2} sx={{position:'relative',borderCollapse:'collapse'}}>
                    <TableHead sx={{
                        position:'sticky',
                        top:0,
                    }}>
                        <TableRow sx={{position:'sticky'}}>
                            <th style={{textAlign:'center'}}>#</th>
                            <th style={{textAlign:'center'}}>Full Name</th>
                            <th style={{textAlign:'center'}}>Email</th>
                            <th style={{textAlign:'center'}}>Phone Number</th>
                            <th style={{textAlign:'center'}}>Role</th>
                            <th style={{textAlign:'center'}}>Agreed to receive commercials</th>
                            <th style={{textAlign:'center'}}>Email Verified</th> 
                            <th style={{textAlign:'center'}}>Actions</th>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredUsers.map((user) => (
                            <TableRow key={user.id}>
                                <td>{user.id}</td>
                                <td>{user.fullName}</td>
                                <td>{user.email}</td>
                                <td>{user.phoneNumberCode + '-' + user.phoneNumber}</td>
                                <td>{user.role == 1 ? 'Admin' : 'User'}</td>
                                <td>{user.termsAndService == 1 ? 'Agree' : 'Disagree'}</td>
                                <td>{user.emailVerified ? 'Yes' : 'No'}</td>
                                <td>
                                                                    
                                    <div className='flex w-[80%] mx-auto gap-2 pt-2'>
                                    <button
                                        variant="text"
                                        onClick={() => handleEditUser(user)}
                                    >
                                        Edit
                                    </button>
                                  
                                  
                                      <button
                                        variant="text"
                                        onClick={() => handleDeleteUser(user.id)}
                                    >
                                        Delete
                                    </button>
                                    </div>
                                  
                                  
                                </td>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            <Dialog open={editUserDialogOpen} onClose={handleCloseEditUserDialog}  >
                <DialogTitle>Edit User</DialogTitle>
                <DialogContent style={{ minWidth: '500px' }}>
                    {selectedUser && (
                        <>
                            <InputLabel htmlFor="fullName" style={{ fontSize: '16px', fontWeight: 'bold' }}>Full Name</InputLabel>
                            <TextField
                                variant="outlined"
                                fullWidth
                                name="fullName"
                                value={selectedUser.fullName}
                                onChange={handleFieldChange}
                                style={{ marginBottom: '16px' }} // Add spacing
                            />
                            <InputLabel htmlFor="email" style={{ fontSize: '16px', fontWeight: 'bold' }}>Email</InputLabel>
                            <TextField
                                variant="outlined"
                                fullWidth
                                name="email"
                                value={selectedUser.email}
                                onChange={handleFieldChange}
                                style={{ marginBottom: '16px' }} // Add spacing
                            />
                            <InputLabel htmlFor="role" style={{ fontSize: '16px', fontWeight: 'bold' }}>Role</InputLabel>
                            <FormControl fullWidth variant="outlined">
                                <Select
                                    name="role"
                                    value={selectedUser.role}
                                    onChange={handleFieldChange}
                                    style={{ marginBottom: '16px' }} // Add spacing
                                >
                                    <MenuItem value={1}>Admin</MenuItem>
                                    <MenuItem value={2}>User</MenuItem>
                                </Select>
                            </FormControl>
                            <InputLabel htmlFor="verification" style={{ fontSize: '16px', fontWeight: 'bold' }}>Email Verified</InputLabel>
                            <FormControl fullWidth variant="outlined">
                                <Select
                                    name="emailVerified"
                                    value={selectedUser.emailVerified}
                                    onChange={handleFieldChange}
                                    style={{ marginBottom: '16px' }} // Add spacing
                                >
                                    <MenuItem value={0}>No</MenuItem>
                                    <MenuItem value={1}>Yes</MenuItem>
                                </Select>
                            </FormControl>

                            <InputLabel htmlFor="remainingTests" style={{ fontSize: '16px', fontWeight: 'bold' }}>Remainig Tests</InputLabel>
                            <TextField
                                variant="outlined"
                                fullWidth
                                name="remainingTests"
                                value={selectedUser?.remainingTests}
                                onChange={handleFieldChange}
                                style={{ marginBottom: '16px' }} // Add spacing
                            />
                            <InputLabel htmlFor="expireDate" style={{ fontSize: '16px', fontWeight: 'bold' }}>Expire Date</InputLabel>
                            <TextField
                                variant="outlined"
                                fullWidth
                                name="expireDate"
                                type='date'
                                value={selectedUser?.expireDate?.split('T')[0]}
                                onChange={handleFieldChange}
                                style={{ marginBottom: '16px' }} // Add spacing
                            />
                        </>
                    )}
                </DialogContent>

                <DialogActions>
                    <Button  onClick={handleCloseEditUserDialog} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleSaveUser} color="primary">
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default Users;
