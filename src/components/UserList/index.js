
import React, { useState, useEffect } from 'react';
import './style.css';
import { Link} from 'react-router-dom';
import EditUserPage from '../EditUserPage';

function UserList() {
  const [users, setUsers] = useState([]);
  const [editedUser, setEditedUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  const [newUser, setNewUser] = useState({
    name: '',
    username: '',
    email: '',
    phone: '',
    company: { name: '' },
    address: { street: '' },
  });

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/users');
      const result = await response.json();
      setUsers(result);
      setLoading(false);
      setError(null)
      


    } catch (error) {
      console.log(error.message);
      setLoading(false);
    }
  };
  


  const handleInputChange = event => {
    const { name, value } = event.target;
    setNewUser(prevUser => ({
      ...prevUser,
      [name]: value,

      company: {
        ...prevUser.company,
        name: name ==="companyName" ? value : prevUser.company.name,
      },
      address: {
        ...prevUser.address,
        street: name ==="streetName" ? value : prevUser.address.street,
      },
    }));
  };

  const handleSubmit = async event => {
    event.preventDefault();
    setUsers((prevUsers)=>[newUser,...prevUsers]);
    setNewUser({
      name: '',
      username: '',
      email: '',
      phone: '',
      company: {
        name: '',
      },
      address: {
        street: '',
      },
    });

  

    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/users',{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUser),
      });

      if (response.ok) {
        const addedUser = await response.json();
        setUsers(prevUsers => [...prevUsers, addedUser]);
        setNewUser({
          name: '',
          username: '',
          email: '',
          phone: '',
          company: { name:''},
          address: { street:'' },
        });
      }

    } catch (error) {
      console.log(error.message);
    }
  };
//Delete a user
  const handleDelete = async userId => {
    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`, {
        method: 'DELETE',
      });
    
      if (response.ok) {
        setUsers(prevUsers => prevUsers.filter(user => user.id !== userId));
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  //Edit and update a user

  const handleEdit = user => {
    setEditedUser(user);



  };

  const handleUpdate = async (userId, updatedUserData) => {
    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedUserData),
      });

     

      if (response.ok) {
        setUsers(prevUsers =>
          prevUsers.map(user => (user.id === userId ? { ...user, ...updatedUserData } : user))
        );
        setEditedUser(null);
      }
    } catch (error) {
      console.log(error.message);
    }
  };



  return (
    

    <div className='main'>
<h2 className='user'>Add a new user</h2>
      <form onSubmit={handleSubmit} className='form'>
        <input className='input'
          type="text"
          name="name"
          placeholder="Name"
          value={newUser.name}
          onChange={handleInputChange} 
          required
        
        />  
        

        <input className='input'
          type="text"
          name="username"
          placeholder="UserName"
          value={newUser.username}
          onChange={handleInputChange}
          

        />
       

        <input className='input'
          type="email"
          name="email"
          placeholder="Enter Email"
          value={newUser.email}
          onChange={handleInputChange}
          

        />

        
        <input className='input'
          type="number"
          name="phone"
          placeholder="Enter Phone number"
          value={newUser.phone}
          onChange={handleInputChange}
        />
       
        <input className='input'
          type="text"
          name="companyName"
          placeholder="Company name"
          value={newUser.company.name}
          onChange={handleInputChange}
          
        />
        
        <input className='input'
          type="text"
          name="streetName"
          placeholder="Street"
          value={newUser.address.street}
          onChange={handleInputChange}
          
        />
             <button className='btn' type="submit">Add user</button>

        

      </form>
  

      <h2 className='user'>All users</h2>
 

      <ul>
      {loading ? (
          <h3>Loading...</h3>
        ) : error ? (
          <p>Error: {error}</p>
        ) : (
        users.map(user => (
          <div className='users'>
            <li >
              <img src='./image/avatar.png'/>
          <h4>Name:</h4>  
            <p> {user.name}</p>
            {/* <br/> */}
              
              <h4>UserName:</h4>
              <p> {user.username}</p>
              {/* <br/> */}
              
              <h4>Email:</h4>
              <p>{user.email}</p>

              

              <h4>PhoneNumber:</h4>
              <p> {user.phone}</p>

              
              <h4> Company name: </h4>
              <p>{user.company.name}</p>
              {/* <br/> */}
              <h4>Street:</h4>
            <p>{user.address.street}</p>
            
            <button className='delete' onClick={() => handleDelete(user.id)}>Delete</button>   <Link to={`/EditUserPage/${user.id}`}> <button onClick={() => handleEdit(user)}>Edit</button> </Link>
            </li>

            
          </div>
        ))
        )}
      </ul>
        
    

         {editedUser && (
          <EditUserPage
            user={editedUser}
            onUpdate={handleUpdate} 
            onClose={() => setEditedUser(null)}
          />

)}      

    </div>
  );
}

export default UserList;

