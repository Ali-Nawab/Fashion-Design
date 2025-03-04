import React, { useState, useEffect } from "react";
import { Outlet, Navigate, useLocation } from "react-router-dom";
import apis from "../utils/apis";

const Super: React.FC = () => {
  const [isAuth, setIsAuth] = useState(false);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  const passToken = localStorage.getItem("pass-token");

  useEffect(() => {
    const checkAuth = async () => {
      try {
        setLoading(true);
        console.log("Checking authentication...");

        const response = await fetch(apis().getAccess, {
          method: "POST",
          body: JSON.stringify({ token: passToken }),
          headers: { "Content-Type": "application/json" },
        });

        const result = await response.json();
        console.log("Auth Response:", result);

        if (!response.ok) {
          throw new Error(result.message || "Authorization failed");
        }

        setIsAuth(result.status);
      } catch (error) {
        console.error("Error checking authentication:", error);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  // Restrict access to Verify OTP & Update Password if there's no pass-token
  if (["/verifyOTP", "/password/update"].includes(location.pathname)) {
    if (!passToken) {
      return <Navigate to="/login" />;
    } else {
      return <Outlet />;
    }
  }

  if (loading) {
    return <h2>Loading...</h2>;
  }

  return isAuth ? <Outlet /> : <Navigate to="/login" />;
};

export default Super;
