import axios from "axios";
import React, { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initializeAuth = async () => {
      const cachedToken = localStorage.getItem("token");
      const cachedIsAdmin = localStorage.getItem("isAdmin");
      if (cachedToken) setToken(cachedToken);
      if (cachedIsAdmin) setIsAdmin(cachedIsAdmin);
      if (cachedToken) {
        setToken(cachedToken);
      }
      if (cachedIsAdmin) setIsAdmin(cachedIsAdmin === "true");

      setLoading(false);
    };

    initializeAuth();
  }, []);

  useEffect(() => {
    if (token) {
      getUserData();
    }
  }, [token]);

  const LoginOnPlatform = async (email, password) => {
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}user/login`,
      {
        email: email,
        password: password,
      }
    );

    if (response.status === 200) {
      authLogin(response.data.value, response.data.isAdmin);
    }
    return response.status.code;
  };

  const LogoutFromPlatform = async (email) => {
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}user/logout`,
      {
        email: userData.email,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (response.status === 200) {
      authLogout();
    }
    return response.status.code;
  };

  const getUserData = async () => {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}user/detail`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (response.status === 200) {
      setUserData(response.data);
    }

    return response.status.code;
  };

  const authLogin = (updateToken, adminValue) => {
    localStorage.setItem("token", updateToken);
    localStorage.setItem("isAdmin", adminValue);
    setToken(updateToken);
    setIsAdmin(adminValue);
    return token;
  };

  const authLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("isAdmin");
    setToken(null);
    setIsAdmin(false);
  };

  return (
    <AuthContext.Provider
      value={{
        isAdmin,
        token,
        LoginOnPlatform,
        LogoutFromPlatform,
        userData,
        authLogin,
        authLogout,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
