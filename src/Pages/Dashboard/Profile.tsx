import React, { useState, useEffect } from 'react';
import { TextField, Button } from "@mui/material";
import { RootState } from "../../redux/store";
import { useSelector } from "react-redux";
import apis from "../../utils/apis";

const Profile: React.FC = () => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    phoneNumber: '',
    cnic: '',
    postalAddress: '',
    permanentAddress: '',
    country: '',
    province: '',
    city: '',
    zipCode: ''
  });
  const { user_id } = useSelector((state: RootState) => state.user);

  const fetchSpecificUser = async () => {
    try {
      const response = await fetch(`${apis().specificUser}/${user_id}`, {
        method: "GET",
        headers: { 'Content-Type': 'application/json' }
      });

      const result = await response.json();

      if (!response.ok) {
        console.log(result.message);
        return;
      }

      if (result.status) {
        setUser(result.user);
      }

    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      } else {
        console.log(String(error));
      }
    }
  };

  useEffect(() => {
    fetchSpecificUser();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(`${apis().updateSpecificUser}/${user_id}`, {
        method: "PUT",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
      });

      const result = await response.json();

      if (!response.ok) {
        console.log(result.message);
        return;
      }

      if (result.status) {
        console.log(result.message);
        setIsEditing(false);
      }

    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      } else {
        console.log(String(error));
      }
    }
  };

  return (
    <div className='p-12'>
      <div className="border-2 border-dashed rounded-xl p-4">
        <h2 className="font-semibold text-2xl mb-8">Profile</h2>
        <form className="grid grid-cols-2 gap-4 lg:grid-cols-3 mb-8 lg:gap-8" onSubmit={handleSubmit}>
          <TextField variant="outlined" label="Name" name="name" value={user.name} onChange={handleInputChange} disabled={!isEditing} />
          <TextField variant='outlined' label="Email" name="email" value={user.email} onChange={handleInputChange} disabled={!isEditing} />
          <TextField variant='outlined' label="Password" name="password" type="password" value={user.password} onChange={handleInputChange} disabled={!isEditing} />
          <TextField variant='outlined' label="Confirm Password" type="password" disabled={!isEditing} />
          <TextField variant='outlined' label="Phone Number" name="phoneNumber" value={user.phoneNumber} onChange={handleInputChange} disabled={!isEditing} />
          <TextField variant='outlined' label="CNIC" name="cnic" value={user.cnic} onChange={handleInputChange} disabled={!isEditing} />
          <TextField variant='outlined' label="Postal Address" name="postalAddress" value={user.postalAddress} onChange={handleInputChange} disabled={!isEditing} />
          <TextField variant='outlined' label="Permanent Address" name="permanentAddress" value={user.permanentAddress} onChange={handleInputChange} disabled={!isEditing} />
          <TextField variant='outlined' label="Country" name="country" value={user.country} onChange={handleInputChange} disabled={!isEditing} />
          <TextField variant='outlined' label="Province" name="province" value={user.province} onChange={handleInputChange} disabled={!isEditing} />
          <TextField variant='outlined' label="City" name="city" value={user.city} onChange={handleInputChange} disabled={!isEditing} />
          <TextField variant='outlined' label="Zip Code" name="zipCode" value={user.zipCode} onChange={handleInputChange} disabled={!isEditing} />
        </form>
        <div className="flex justify-end gap-4">
          <Button variant='contained' color='error' onClick={() => setIsEditing(!isEditing)}>
            {isEditing ? 'Cancel' : 'Edit'}
          </Button>
          {isEditing && <Button variant='contained' type='submit' onClick={handleSubmit}>Submit</Button>}
        </div>
      </div>
    </div>
  );
};

export default Profile;