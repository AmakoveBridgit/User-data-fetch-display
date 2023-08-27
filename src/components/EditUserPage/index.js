
import React, { useState, useEffect } from 'react';
import { useParams} from 'react-router-dom';
import "./style.css"

function EditUserPage({ user, onUpdate, onClose }){
  console.log(user);
  const { userId } = useParams();

  const [userDetails, setUserDetails] = useState({
    name: '',
    username: '',
    email: '',
    phone: '',
    company: { name:''},
    address: { street:''},
  });

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
      .then((response) => response.json())
      .then((data) => setUserDetails(data))
      .catch((error) => console.error(error));
  }, [userId]);


  useEffect(() => {
    if(user){
    setUserDetails(user); 
  }
  }, [user]);






  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserDetails((prevData) => ({
      ...prevData,
      [name]: value,


      address: {
        ...prevData.address,
        street: value,
      },

     
    }));
  };

  const handleSave = async () => {
   
    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userDetails),
      });

      if (response.ok) {
          onUpdate(user.id, userDetails);
          onClose();
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (

    <div className='Edit'>

      <label>
       
        <h5>Name: </h5>
        <input className='input' type="text" name="name" value={userDetails.name} onChange={handleInputChange} />
      </label>
     

      <label>
      
        <h5>Username: </h5>
         <input className='input'  type="text" name="username" value={userDetails.username} onChange={handleInputChange} />
      </label>
     

       <label>
       <h5>Email: </h5>
        
         <input className='input' type="text" name="email" value={userDetails.email} onChange={handleInputChange} />
       </label>

    
      <label>
      <h5>Phone: </h5>
       
        <input className='input' type="text" name="phone" value={userDetails.phone} onChange={handleInputChange} />
      </label>

    
      <label>
      <h5>Company: </h5>
         
        <input className='input' type="text" name="company" value={userDetails.company.name} onChange={handleInputChange} />
       </label>

  
      
       <label>
        <h5>Street: </h5>
       
         <input className='input' type="text" name="street" value={userDetails.address.street} onChange={handleInputChange} />
      </label>

    <br/>
      <button type='submit' className='save' onClick={handleSave}>Save</button>

      </div>
  );
}

export default EditUserPage;















