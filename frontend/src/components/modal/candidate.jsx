import React, { useContext, useEffect, useState } from "react";
import { getCandidateAllData } from "../../services/api/recruiter_requests";
import { AuthContext } from "../../provider/auth_provider";

const CandidateDetailModal = ({ candidate, skillsDictionary }) => {
  const [userData, setUserData] = useState([]);
  const { token } = useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getCandidateAllData(token, candidate.email);
        setUserData(data);
      } catch (err) {
        [console.err("Erro ao buscar.", err)];
      }
    };

    if (candidate) {
      fetchData();
    }
  }, [candidate]);

  if (!candidate) return null;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">
        {candidate.name} {candidate.lastName}
      </h2>

      <div className="space-y-2">
        <p>
          <strong>Email:</strong> {candidate.email}
        </p>
        <p>
          <strong>Telefone:</strong> {candidate.telephone}
        </p>
        <p>
          <strong>Data de nascimento:</strong> {candidate.birthdate}
        </p>
        <p>
          <strong>Linguagens:</strong>
        </p>
        <div className="flex flex-wrap gap-2">
          {candidate.skills?.map((skiId) => (
            <span
              key={skiId}
              className="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full"
            >
              <i
                className={`${
                  skillsDictionary.find((ski) => ski.id === skiId)?.icon ||
                  "fa-solid fa-question"
                }`}
              ></i>
              {`  ${
                skillsDictionary.find((ski) => skiId === ski.id)?.name ||
                "Linguagem"
              }`}
            </span>
          ))}
        </div>

        <div>
          <h3 className="text-2xl font-bold mb-4 mt-4">Formação</h3>
          {userData.educations && userData.educations.length ? (
            userData.educations.map((edu, index) => {
              return (
                <div className="pb-5" key={index}>
                  <p>
                    <strong>Curso:</strong> {edu.course}
                  </p>
                  <p>
                    <strong>Instituição:</strong> {edu.institution}
                  </p>
                  <p>
                    <strong>Data de inicio:</strong> {edu.startDate}
                  </p>
                  <p>
                    <strong>Data de conclusão:</strong> {edu.finishedDate}
                  </p>
                </div>
              );
            })
          ) : (
            <div>Não há formações</div>
          )}
        </div>
        <div>
          <h3 className="text-2xl font-bold mb-4 mt-4">Endereço</h3>
          {userData.address && (
            <div className="pb-5">
              <p>
                <strong>Cidade:</strong> {userData.address.city} -{" "}
                {userData.address.uf}
              </p>
              <p>
                <strong>Rua:</strong> {userData.address.address} -{" "}
                {userData.address.number}
              </p>
              <p>
                <strong>CEP:</strong> {userData.address.postcode}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CandidateDetailModal;
