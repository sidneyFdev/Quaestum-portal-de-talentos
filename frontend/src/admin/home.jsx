import React, { useEffect, useState } from "react";
import axios from "axios";

const RecruiterHome = () => {
  const [candidates, setCandidates] = useState([]);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}candidates/list`)
      .then((response) => setCandidates(response.data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <div className="default-page-container">
      <h1>Candidatos</h1>
      <div>
        <table className="table-auto">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 border">ID</th>
              <th className="p-2 border">Nome</th>
              <th className="p-2 border">Email</th>

              <th className="p-2 border">Telefone</th>
              <th className="p-2 border">Habilidades</th>
            </tr>
          </thead>
          <tbody>
            {candidates.length > 0 &&
              candidates.map((candidate, index) => {
                return (
                  <tr key={index}>
                    <td>{candidate.id}</td>
                    <td>
                      {candidate.name} {candidate.last_name}
                    </td>
                    <td>{candidate.email}</td>
                    <td>{candidate.telephone}</td>
                    <td></td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecruiterHome;
