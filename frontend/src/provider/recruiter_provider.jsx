import React, { createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from "./auth_provider";
import { getAllCandidates } from "../services/api/recruiter_requests";

export const RecruiterContext = createContext();

export const RecruiterProvider = ({ children }) => {
  const { token, isAdmin } = useContext(AuthContext);
  const [candidates, setCandidates] = useState([]);

  useEffect(() => {
    if (token && isAdmin == true) {
      fetchCandidates();
    }
  }, [token, isAdmin]);

  const fetchCandidates = async () => {
    if (token && isAdmin) {
      try {
        const allData = await getAllCandidates(token);
        setCandidates(allData);
      } catch (err) {
        console.error("Erro ao buscar candidatos:", err);
      }
    }
  };

  return (
    <RecruiterContext.Provider
      value={{
        candidates,
      }}
    >
      {children}
    </RecruiterContext.Provider>
  );
};
