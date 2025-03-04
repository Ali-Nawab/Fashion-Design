import React, { useState, useEffect } from "react";
import { Avatar } from "@mui/material";
import { RootState } from "../../redux/store";
import { useSelector } from "react-redux";
import apis from "../../utils/apis";
import AOS from 'aos';
import 'aos/dist/aos.css';

AOS.init( { duration: 800, once: true, offset: 300} );

const Header: React.FC = () => {

  const [user, setUser] = useState({
    name: '',
    imageUrl: ''
  })
  const { user_id } = useSelector((state: RootState) => state.user)

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
    fetchSpecificUser()
  }, [])
  return (
    <div className="flex items-center justify-between p-12">
        <h2 className="text-[2rem] font-bold" data-aos="fade-left">Welcome {user.name}</h2>
        <div className="flex items-center gap-4" >
            <span className="text-2xl" data-aos="fade-left" data-aos-delay="200"><i className="ri-notification-3-fill"></i></span>
            <Avatar alt="Remy Sharp" src={user.imageUrl} />
        </div>
    </div>
  );
};

export default Header;
