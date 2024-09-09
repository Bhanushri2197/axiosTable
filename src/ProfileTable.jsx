import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Table from 'react-bootstrap/Table';
import axios from 'axios';

function ProfileTable() {
  const [user, setUser] = useState([]);
  const [newName, setNewName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newCompanyName, setNewCompanyName] = useState('');
  const [newWebsite, setNewWebsite] = useState('');
  const [uname, uSetName] = useState('');
  const [uemail, uSetEmail] = useState('');
  const [ucompany, uSetCompany] = useState('');
  const [uwebsite, uSetWebsite] = useState('');
  const [editId, setEditId] = useState(-1);

  // Step 1: Fetch data from MockAPI on component load
  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/users')
        .then((response) => setUser(response.data))
        .catch((error) => {
            console.error(error);
        });
}, []);

  // Add a new user to MockAPI
  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post('https://jsonplaceholder.typicode.com/users', {
        name: newName,
        email: newEmail,
        company: { name: newCompanyName },
        website: newWebsite,
      })
      .then((response) => {
        setUser([...user, response.data]);
        setNewName('');
        setNewEmail('');
        setNewCompanyName('');
        setNewWebsite('');
      })
      .catch((error) => {
        console.error(error);
      });
  };

  // Edit user data (populate fields with current user details)
  const handleEdit = (id) => {
    axios.get(`https://jsonplaceholder.typicode.com/users/${id}`)
      .then((response) => {
        const data = response.data;
        uSetName(data.name);
        uSetEmail(data.email);
        uSetCompany(data.company.name);
        uSetWebsite(data.website);
        setEditId(id);
      })
      .catch((err) => console.log(err));
  };

  // Update user data in MockAPI
  const handleUpdate = () => {
    axios.put(`https://jsonplaceholder.typicode.com/users/${editId}`, {
        name: uname,
        email: uemail,
        company: { name: ucompany },
        website: uwebsite,
      })
      .then(() => {
        setUser(
          user.map((u) =>
            u.id === editId ? { ...u, name: uname, email: uemail, company: { name: ucompany }, website: uwebsite }
              : u
          )
        );
        setEditId(-1);
        uSetName('');
        uSetEmail('');
        uSetCompany('');
        uSetWebsite('');
      })
      .catch((error) => {
        console.error(error);
      });
  };
  // https://66dcb06447d749b72acc3f54.mockapi.io/users
  // Delete a user from MockAPI
  const handleDelete = (id) => {
    axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`)
      .then(() => {
        setUser(user.filter((u) => u.id !== id));
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className='axiosTableBlock'>
      <div className="container">
        <div className="tableBlock pt-5">
          <h1 className="headingOne mb-5 text-center">CRUD operations using React and Axios</h1>
          <div className="addUser d-flex flex-column align-items-center justify-content-center">
            <h2>Add User Details</h2>
            <div className='mt-3 w-100'>
              <form className='addDataForm d-flex w-100 align-items-center' onSubmit={handleSubmit}>
                <input type="text" placeholder="Enter Name"
                  value={newName} onChange={(e) => setNewName(e.target.value)} />
                <input type="email" placeholder="Enter Email"
                  value={newEmail} onChange={(e) => setNewEmail(e.target.value)} />
                <input type="text" placeholder="Enter Company name" value={newCompanyName}
                  onChange={(e) => setNewCompanyName(e.target.value)}  />
                <input type="text" placeholder="Enter Website"  value={newWebsite} onChange={(e) => setNewWebsite(e.target.value)}
                />
                <button className="btn addBtn">Add</button>
              </form>
            </div>
          </div>
          <div className="tableResponsive">
            <Table striped bordered hover responsive>
              <thead>
                <tr className='tableHeader'>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Company</th>
                  <th>Website</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {user.map((users, index) =>
                  users.id === editId ? (
                    <tr key={index}>
                      <td>{users.id}</td>
                      <td>
                        <input type="text" value={uname} onChange={(e) => uSetName(e.target.value)} />
                      </td>
                      <td>
                        <input type="email" value={uemail} onChange={(e) => uSetEmail(e.target.value)}/>
                      </td>
                      <td>
                        <input type="text" value={ucompany} onChange={(e) => uSetCompany(e.target.value)} />
                      </td>
                      <td>
                        <input type="text" value={uwebsite}  onChange={(e) => uSetWebsite(e.target.value)} />
                      </td>
                      <td className='d-flex justify-content-center'>
                        <button className='btn updateBtn' onClick={handleUpdate}>Update</button>
                      </td>
                    </tr>
                  ) : (
                    <tr key={index}>
                      <td>{users.id}</td>
                      <td>{users.name}</td>
                      <td>{users.email}</td>
                      <td>{users.company.name}</td>
                      <td>{users.website}</td>
                      <td className='d-flex justify-content-center'>
                        <button className='btn editBtn' onClick={() => handleEdit(users.id)}>Edit</button>
                        <button className='btn delBtn' onClick={() => handleDelete(users.id)}>Delete</button>
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileTable;
